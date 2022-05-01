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
import { multer } from "../middlewares/multer.js";

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
 * /users/{id}/profile/image:
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
  "/:id/profile/image",
  login_required,
  multer.single("profileImgUrl"),
  async function (req, res, next) {
    try {
      const file = req.file;
      const userId = req.params.id;

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
 *         description: "한 유저의 정보 삭제 완료"
 *         schema:
 *           $ref: '#/components/schemas/User'
 */
userAuthRouter.delete("/:id", login_required, async (req, res, next) => {
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
