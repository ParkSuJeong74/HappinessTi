import { User } from "../schemas/user.js";

export const userModel = {
  create: async ({ newUser }) => {
    const createdNewUser = await User.create(newUser);
    return createdNewUser;
  },

  isNicknameExist: async ({ nickname }) => {
    const isNicknameExist = await User.exists({ nickname });
    if (isNicknameExist) {
      return false;
    }
    return true;
  },

  isEmailExist: async ({ email }) => {
    const isEmailExist = await User.exists({ email });
    if (isEmailExist) {
      return false;
    }
    return true;
  },

  findByEmail: async ({ email }) => {
    const user = await User.findOne({ email });
    return user;
  },

  findById: async ({ userId }) => {
    const user = await User.findOne({ _id: userId });
    return user;
  },

  update: async ({ userId, data }) => {
    const update = { $set: data };
    const option = { returnOriginal: false };
    const updatedUser = await User.findByIdAndUpdate(userId, update, option);
    return updatedUser;
  },
  
  findByNickname: async ({ nickname }) => {
    const user = await User.findOne({ nickname });
    return user;
  },

  delete: async ({ userId }) => {
    const deleteUser = await User.deleteOne({ _id: userId });
    const isDeleted = deleteUser.deletedCount === 1;
    return isDeleted; // True or False
  },
  updatePassword: async ({ email, fieldToUpdate, hashedNewPassword }) => {
    const filter = { email };
    const update = { [fieldToUpdate]: hashedNewPassword };
    const option = { returnOriginal: false };
    const updatedPasswordUser = await User.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedPasswordUser;
  },

  /*
   * findPasswordById()
   * 해당 user_id에 맞는 객체를 찾고 암호화 처리된 패스워드를 넘겨준다.
   */
  findPasswordById: async ({ user_id }) => {
    const user = await User.findOne({ _id: user_id });
    return user.password;
  },

  /*
   * createRandomPassword()
   * 임의 비밀번호 생성 함수
   */
  createRandomPassword: async () => {
    const randStr = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
    ];
    let randomPassword = "";
    for (var j = 0; j < 5; j++) {
      randomPassword += randStr[Math.floor(Math.random() * randStr.length)];
    }
    return randomPassword;
  },
};
