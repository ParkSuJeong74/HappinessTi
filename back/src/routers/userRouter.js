const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const { userAuthService } = require("../services/userService")

const userAuthRouter = Router()

userAuthRouter.post("/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      )
    }

    const nickname = req.body.nickname
    const email = req.body.email
    const password = req.body.password

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

userAuthRouter.post("/login", async function (req, res, next) {
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await userAuthService.getUser({ email, password })

    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
})

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
 *  /users/{id}:
 *    get:
 *      tags:
 *      - user
 *      description: 유저 등록
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          description: 유저 고유 id
 *        examples:
 *          Sample:
 *            value: 1616
 *            summary: A Sample Id
 *      responses:
 *        200:
 *          description: 한 유저의 정보 조회
 *          schema:
 *            $ref: '#/components/schemas/User'
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
