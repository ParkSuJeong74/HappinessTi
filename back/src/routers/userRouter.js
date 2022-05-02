/**
 *  @swagger
 *  tags:
 *    name: User
 *    description: API to manage User
 */
import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { userAuthService } from "../services/userService.js";
import { surveyLogService } from "../services/surveylogService.js";
import { multer } from "../middlewares/multer.js";
import { smtpTransport } from "../config/smtpTransport.js";

export const userAuthRouter = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags: [User]
 *     description: 유저 등록
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               nickname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: "회원가입 완료"
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
userAuthRouter.post("/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      let error = new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
      throw error;
    }

    const { nickname, email, password } = req.body;

    const newUser = await userAuthService.addUser({
      nickname,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [User]
 *     description: 유저 로그인
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: "로그인 완료"
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
userAuthRouter.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const loginResponse = await userAuthService.authenticate({
      email,
      password,
    });
    res.status(200).send(loginResponse.user);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * path:
 * /users/current:
 *   get:
 *     tags: [User]
 *     description: 현재 로그인한 유저 정보 조회
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "현재 로그인한 유저의 정보 조회 완료"
 *         schema:
 *           $ref: '#/components/schemas/User'
 */
userAuthRouter.get("/current", async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
      userId,
    });

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users/password/reset:
 *   put:
 *     tags: [User]
 *     description: password 변경
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         "application/json":
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: "프로필 사진 업로드 완료"
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
userAuthRouter.put("/password/reset", async function (req, res, next) {
  try {
    //form에서 받아온 이메일 저장
    const { email } = req.body;

    //1)받아온 이메일이 db에 존재하는지 확인하고 2)새 비밀번호를 업데이트할 함수
    const { newPassword, updatedUser } = await userAuthService.setNewPassword({
      email,
    });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    //메일옵션 => 아래 내용이 수신됨ss
    const mailOption = {
      from: "eliceTest@gmail.com",
      to: email,
      subject: `[개발뽀개기]  임시 비밀번호가 생성되었습니다.`,
      html: `
      <h1>임시비밀번호</h1>
      임시 비밀번호 : ${newPassword}
      `,
    };

    smtpTransport.sendMail(mailOption, (err, res) => {
      if (err) {
        console.log("err", err);
      } else {
        console.log("Message send :" + res);
      }
      smtpTransport.close();
    });

    res.status(200).send({
      result: "ok",
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /users/profile/image:
 *   post:
 *     tags: [User]
 *     description: 유저 프로필 사진 업로드
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profileImgUrl:
 *                 type: string
 *                 format: binary
 *     security:
 *      - Authorization: []
 *     responses:
 *       '200':
 *         description: "프로필 사진 업로드 완료"
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
userAuthRouter.post(
  "/profile/image",
  login_required,
  multer.single("profileImgUrl"),
  async function (req, res, next) {
    try {
      const file = req.file;
      const userId = req.currentUserId;

      let error = new Error("본인이 아니면 사용자 정보를 편집할 수 없습니다.");
      error.status = 401;
      if (userId != req.currentUserId) {
        throw error;
      }

      const user = await userAuthService.getUserInfo({
        userId,
      });

      // GCS 업로드
      const { publicUrl, savefile } = await userAuthService.SetGcsBucket({
        user,
        file,
      });

      // db에서 profileImgUrl 변경
      const toUpdate = { profileImgUrl: savefile };
      const updatedUser = await userAuthService.setUser({ userId, toUpdate });

      res.status(200).json({
        publicUrl,
        updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * path:
 * /users:
 *   get:
 *     tags: [User]
 *     description: 해당 id의 유저 정보 조회
 *     produces:
 *     - "application/json"
 *     security:
 *      - Authorization: []
 *     responses:
 *       '200':
 *         description: "한 유저의 정보 조회 완료"
 *         schema:
 *           $ref: '#/components/schemas/User'
 */
userAuthRouter.get("/", login_required, async function (req, res, next) {
  try {
    const userId = req.params.id;
    const currentUserInfo = await userAuthService.getUserInfo({ userId });

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * path:
 * /users/:
 *   put:
 *     tags: [User]
 *     description: 해당 id의 유저 정보 수정
 *     produces:
 *     - "application/json"
 *     security:
 *      - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               nickname:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: "한 유저의 정보 수정 완료"
 *         schema:
 *           $ref: '#/components/schemas/User'
 */
userAuthRouter.put("/", login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const toUpdate = req.body;
    const updatedUser = await userAuthService.setUser({ userId, toUpdate });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users/survey/logs:
 *   get:
 *     tags: [User]
 *     description: 한 유저의 설문조사 결과 조회(마이페이지)
 *     produces:
 *     - "application/json"
 *     security:
 *      - Authorization: []
 *     responses:
 *       '200':
 *         description: "한 유저의 설문조사 결과 조회 완료"
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Surveylog'
 */
userAuthRouter.get(
  "/survey/logs",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const countryInfo = await surveyLogService.getLogs({ userId });
      res.status(201).json(countryInfo);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * path:
 * /users/password:
 *   put:
 *     tags: [User]
 *     description: 해당 id의 유저 비밀번호 수정
 *     produces:
 *     - "application/json"
 *     security:
 *      - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: "한 유저의 비밀번호 수정 완료"
 *         schema:
 *           $ref: '#/components/schemas/User'
 */
userAuthRouter.put(
  "/password",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const { password } = req.body;
      const toUpdate = { password };
      const updatedUser = await userAuthService.setUser({ userId, toUpdate });

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * path:
 * /users:
 *   delete:
 *     tags: [User]
 *     description: 해당 id의 유저 삭제
 *     produces:
 *     - "application/json"
 *     security:
 *      - Authorization: []
 *     responses:
 *       '200':
 *         description: "한 유저의 정보 삭제 완료"
 *         schema:
 *           $ref: '#/components/schemas/User'
 */
userAuthRouter.delete("/", login_required, async (req, res, next) => {
  try {
    const userId = req.params.id;
    let error = new Error("당신은 이 유저의 정보를 삭제할 수 없습니다.");
    error.status = 401;

    if (userId != req.currentUserId) {
      throw error;
    }

    const deletedUser = await userAuthService.deleteById({ userId });

    res.status(200).send(deletedUser);
  } catch (error) {
    next(error);
  }
});
