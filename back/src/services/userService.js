import { userModel } from "../db/index.js";
import jwt from "jsonwebtoken";
import { SetUtil } from "../common/setUtil.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { gcsBucket } from "../config/gcs.js";
import { format } from "util";

export const userAuthService = {
  addUser: async ({ nickname, email, password }) => {
    let error = new Error("이메일 형식이 올바르지 않습니다.");
    if (!validator.isEmail(email)) {
      throw error;
    }

    const isEmailExist = await userModel.isEmailExist({ email });
    error = new Error(
      "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
    );
    if (!isEmailExist) {
      throw error;
    }

    const isNicknameExist = await userModel.isNicknameExist({ nickname });
    error = new Error(
      "이 닉네임은 현재 사용중입니다. 다른 닉네임을 입력해 주세요."
    );
    if (!isNicknameExist) {
      throw error;
    }

    // console.log("password", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("hashedPassword", hashedPassword);
    const newUser = {
      nickname,
      email,
      hashedPassword,
    };

    // console.log("newUser", newUser);

    const createdNewUser = await userModel.create({ newUser });
    return createdNewUser;
  },

  authenticate: async ({ email, password }) => {
    const user = await userModel.findByEmail({ email });
    let error = new Error(
      "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
    );

    if (!user) {
      throw error;
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.hashedPassword;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    error = new Error(
      "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
    );

    if (!isPasswordCorrect) {
      throw error;
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1week",
    });

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user._id;
    const name = user.name;
    const description = user.description;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
    };
    const loginResponse = {
      user: { loginUser },
      accessToken: { token },
      expiryTS: 3343243,
    };
    return loginResponse;
  },

  getUsers: async () => {
    const users = await userModel.findAll();
    return users;
  },

  SetGcsBucket: async ({ user, file }) => {
    let error = new Error("업로드할 이미지가 없습니다.");
    if (!file) {
      throw error;
    }

    const filename = file.originalname.replace(" ", "-");
    const savefile = `${Date.now()}-${filename}`;
    const blob = gcsBucket.file(`ProfileImg/${savefile}`);

    // gcs 파일 업로드
    const blobStream = blob.createWriteStream({
      resumable: false,
      public: true,
    });
    // 에러 핸들링
    error = new Error("업로드 중 오류가 발생했습니다.");
    blobStream.on("error", (err) => {
      throw error;
    });

    if (user.profileImgUrl !== "crashingdevlogo.png") {
      gcsBucket.file(`ProfileImg/${user.profileImgUrl}`).delete();
    }
    const publicUrl = format(
      `https://storage.googleapis.com/${gcsBucket.name}/${blob.name}`
    );
    // 종료 처리
    blobStream.on("finish", () => {});

    // 업로드 스트림 실행
    blobStream.end(file.buffer);
    return { publicUrl, savefile };
  },

  setUser: async ({ userId, toUpdate }) => {
    let user = await userModel.findById({ userId });
    let error = new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");

    if (!user) {
      throw error();
    }

    const findByNicknameUser = await userModel.findByNickname({
      nickname: toUpdate.nickname,
    });

    error = new Error(
      "이 닉네임은 현재 사용중입니다. 다른 닉네임을 입력해 주세요."
    );

    // 현재 유저의 닉네임도 찾기 때문에
    if (findByNicknameUser && findByNicknameUser.id != userId) {
      throw error;
    }

    const updateObject = SetUtil.compareValues(toUpdate, user);
    user = await userModel.update({ userId, updateObject });
    return user;
  },

  deleteById: async ({ userId }) => {
    const isDeleted = await userModel.delete({ userId });
    let error = new Error("삭제가 되지 않았습니다.");

    if (!isDeleted) {
      throw error;
    }

    return { status: "Ok" };
  },

  getUserInfo: async ({ userId }) => {
    const user = await userModel.findById({ userId });
    let error = new Error(
      "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요."
    );

    if (!user) {
      throw error;
    }

    return user;
  },
};
