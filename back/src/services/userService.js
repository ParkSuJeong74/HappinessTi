import { userModel } from "../db/index.js";
import jwt from "jsonwebtoken";
import { SetUtil } from "../common/setUtil.js";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const userAuthService = {
  addUser: async ({ nickname, email, password }) => {
    let error = new Error("이메일 형식이 올바르지 않습니다.");
    error.status = 400;
    if (!validator.isEmail(email)) {
      throw error;
    }

    const isEmailExist = await userModel.isEmailExist({ email });
    error = new Error(
      "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
    );
    if (isEmailExist) {
      throw error;
    }
    const hashedPassword = bcrypt.hash(password, 10);
    const id = uuidv4();
    // 비밀번호 해쉬화
    const newUser = {
      id,
      nickname,
      email,
      password: hashedPassword,
    };

    const createdNewUser = await userModel.create({ newUser });
    return createdNewUser;
  },

  getUser: async ({ email, password }) => {
    const user = await userModel.isEmailExist({ email });

    const error = new Error(
      "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
    );
    error.status = 400;
    if (!user) {
      throw error;
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      throw new Error(
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ userId: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user.id;
    const name = user.name;
    const description = user.description;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
    };

    return loginUser;
  },

  getUsers: async () => {
    const users = await userModel.findAll();
    return users;
  },

  setUser: async ({ userId, toUpdate }) => {
    let user = await userModel.findById({ userId });

    if (!user) {
      throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    const isNicknameExist = await userModel.isNicknameExist({
      nickname: toUpdate.nickname,
    });

    //Object.assign(user, toUpdate)
    if (isNicknameExist) {
      throw new Error(
        "이 닉네임은 현재 사용중입니다. 다른 닉네임을 입력해 주세요."
      );
    }

    const updateObject = SetUtil.compareValues(toUpdate, user);
    user = await userModel.update({ userId, updateObject });
    return user;
  },

  deleteById: async ({ userId }) => {
    const isDeleted = await userModel.delete({ userId });

    if (!isDeleted) {
      throw new Error("삭제가 되지 않았습니다.");
    }
    return { status: "Ok" };
  },

  getUserInfo: async ({ userId }) => {
    const user = await userModel.findById({ userId });

    if (!user) {
      throw new Error(
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    return user;
  },
};

/*이걸 loginUser DTO로 access token까지 보내는거 보다는
const response = { user: user, accessToken: accessToken, expiryTS: ... }; 이런식으로 한번더 wrapping해서 보내는게 어떨까요?*/
