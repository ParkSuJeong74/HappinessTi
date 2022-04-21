const { userModel } = require("../db")
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken")

const userAuthService = {
  addUser: async ({ nickname, email, password }) => {
    const user = await userModel.findByEmail({ email })
    if (user) {
      throw new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      )
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10)
    const id = uuidv4()
    const newUser = { id, nickname, email, password: hashedPassword }

    const createdNewUser = await userModel.create({ newUser })

    return createdNewUser
  },

  getUser: async ({ email, password }) => {
    const user = await userModel.findByEmail({ email })
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      )
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    )
    if (!isPasswordCorrect) {
      throw new Error("비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.")
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key"
    const token = jwt.sign({ userId: user.id }, secretKey)

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user.id
    const name = user.name
    const description = user.description

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      errorMessage: null,
    }

    return loginUser
  },

  getUsers: async () => {
    const users = await userModel.findAll()
    return users
  },

  setUser: async ({ userId, toUpdate }) => {
    let user = await userModel.findById({ userId })

    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.")
    }

    const findByNicknameUser = await userModel.findByNickname({
      nickname: toUpdate.nickname,
    })

    if (findByNicknameUser && findByNicknameUser.id != userId) {
      throw new Error(
        "이 닉네임은 현재 사용중입니다. 다른 닉네임을 입력해 주세요."
      )
    }

    const updateObject = SetUtil.compareValues(toUpdate, user)
    user = await User.update({ userId, updateObject })

    return user
  },

  getUserInfo: async ({ userId }) => {
    const user = await userModel.findById({ userId })

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      )
    }

    return user
  },
}

module.exports = { userAuthService }
