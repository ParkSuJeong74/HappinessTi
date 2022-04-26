/**
 *  @swagger
 *  tags:
 *    name: User
 *    description: API to manage users
 */
import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { userAuthService } from "../services/userService.js";
import { format } from "util";
import { multer } from "../middlewares/multer.js";
import { gcsBucket } from "../config/gcs.js";
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
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
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
    console.log(email, password);
    const user = await userAuthService.getUser({ email, password });

    res.status(200).send(user);
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
 *     security:
 *      - Authorization: []
 *     responses:
 *       '200':
 *         description: "현재 로그인한 유저의 정보 조회 완료"
 *         schema:
 *           $ref: '#/components/schemas/User'
 */
userAuthRouter.get("/current", login_required, async function (req, res, next) {
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
 * /users/{id}/profile-img:
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
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       required: true
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
  "/:id/profile-img",
  login_required,
  multer.single("profileImgUrl"),

  async function (req, res, next) {
    try {
      const file = req.file;
      const userId = req.params.id;

      if (!file) {
        throw new Error("업로드할 이미지가 없습니다.");
      }

      if (userId != req.currentUserId) {
        throw new Error("본인이 아니면 사용자 정보를 편집할 수 없습니다.");
      }

      const user = await userAuthService.getUserInfo({
        userId,
      });

      const filename = req.file.originalname.replace(" ", "-");
      const savefile = `${Date.now()}-${filename}`;
      const blob = gcsBucket.file(`ProfileImg/${savefile}`);
      if (user.profileImgUrl !== "crashingdevlogo.png") {
        gcsBucket.file(`ProfileImg/${user.profileImgUrl}`).delete();
      }
      // db에 변경
      const toUpdate = { profileImgUrl: savefile };
      const updatedUser = await userAuthService.setUser({ userId, toUpdate });

      const blobStream = blob.createWriteStream({
        resumable: false,
        public: true,
      });
      // 에러 핸들링
      blobStream.on("error", (err) => {
        throw new Error("업로드 중 오류가 발생했습니다.");
      });

      // 종료 처리
      blobStream.on("finish", () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${gcsBucket.name}/${blob.name}`
        );

        // 최종적으로 업로드 프로세스가 완료되는 시점
        res.status(200).json({
          profileImgUrl: publicUrl,
          updatedUser,
        });
      });
      // 업로드 스트림 실행
      blobStream.end(req.file.buffer);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * path:
 * /users/{id}/profile-img:
 *   get:
 *     tags: [User]
 *     description: 해당 id의 유저 프로필사진 조회
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       required: true
 *     security:
 *      - Authorization: []
 *     responses:
 *       '200':
 *         description: "한 유저의 프로필사진 조회 완료"
 *         schema:
 *           $ref: '#/components/schemas/User'
 */
userAuthRouter.get(
  "/:id/profile-img",
  login_required,
  multer.single("profileImgUrl"),
  async function (req, res, next) {
    try {
      const userId = req.params.id;
      const user = await userAuthService.getUserInfo({
        userId,
      });
      const url = `https://storage.googleapis.com/${gcsBucket.name}/ProfileImg/${user.profileImgUrl}`;
      res.status(200).send({ profileImgUrl: url });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * path:
 * /users/{id}:
 *   get:
 *     tags: [User]
 *     description: 해당 id의 유저 정보 조회
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       required: true
 *     security:
 *      - Authorization: []
 *     responses:
 *       '200':
 *         description: "한 유저의 정보 조회 완료"
 *         schema:
 *           $ref: '#/components/schemas/User'
 */
userAuthRouter.get("/:id", login_required, async function (req, res, next) {
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
 * /users/{id}:
 *   put:
 *     tags: [User]
 *     description: 해당 id의 유저 정보 수정
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       required: true
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
userAuthRouter.put("/:id", login_required, async function (req, res, next) {
  try {
    const userId = req.params.id;
    if (userId != req.currentUserId) {
      throw new Error("본인이 아니면 사용자 정보를 편집할 수 없습니다.");
    }
    const { nickname, description } = req.body;
    const toUpdate = { nickname, description };

    const updatedUser = await userAuthService.setUser({ userId, toUpdate });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * path:
 * /users/{id}:
 *   delete:
 *     tags: [User]
 *     description: 해당 id의 유저 삭제
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       required: true
 *     security:
 *      - Authorization: []
 *     responses:
 *       '200':
 *         description: "한 유저의 정보 조회 완료"
 *         schema:
 *           $ref: '#/components/schemas/User'
 */
userAuthRouter.delete("/:id", login_required, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const currnetId = req.currentUserId;
    if (userId !== currnetId) {
      throw new Error("당신은 이 유저의 정보를 삭제할 수 없습니다.");
    }
    const deletedUser = await userAuthService.deleteUser({ userId });

    res.status(200).send(deletedUser);
  } catch (error) {
    next(error);
  }
});
