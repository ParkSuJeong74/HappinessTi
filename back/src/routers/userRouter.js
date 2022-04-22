/**
 *  @swagger
 *  tags:
 *    name: User
 *    description: API to manage users
 */

const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const { userAuthService } = require("../services/userService")

const userAuthRouter = Router()

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
      )
    }

    const { nickname, email, password } = req.body

    const newUser = await userAuthService.addUser({
      nickname,
      email,
      password,
    })

    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

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
    const { email, password } = req.body

    const user = await userAuthService.getUser({ email, password })

    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
})

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
    const userId = req.currentUserId
    const currentUserInfo = await userAuthService.getUserInfo({
      userId,
    })

    res.status(200).send(currentUserInfo)
  } catch (error) {
    next(error)
  }
})

// Todo : user profile 사진 업로드 기능

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
    const userId = req.params.id
    if (userId != req.currentUserId) {
      throw new Error("본인이 아니면 사용자 정보를 편집할 수 없습니다.")
    }
    const { nickname, description } = req.body
    const toUpdate = { nickname, description }

    const updatedUser = await userAuthService.setUser({ userId, toUpdate })

    res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
})

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
    const userId = req.params.id
    const currentUserInfo = await userAuthService.getUserInfo({ userId })

    res.status(200).send(currentUserInfo)
  } catch (error) {
    next(error)
  }
})

module.exports = { userAuthRouter }
