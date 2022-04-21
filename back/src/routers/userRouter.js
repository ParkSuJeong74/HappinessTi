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
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const user_id = req.currentUserId
    const currentUserInfo = await userAuthService.getUserInfo({
      user_id,
    })

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage)
    }

    res.status(200).send(currentUserInfo)
  } catch (error) {
    next(error)
  }
})

userAuthRouter.put("/:id", login_required, async function (req, res, next) {
  try {
    // URI로부터 사용자 id를 추출함.
    const userId = req.params.id
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const name = req.body.name ?? null
    const email = req.body.email ?? null
    const password = req.body.password ?? null
    const description = req.body.description ?? null

    const toUpdate = { name, email, password, description }

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedUser = await userAuthService.setUser({ userId, toUpdate })

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage)
    }

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
