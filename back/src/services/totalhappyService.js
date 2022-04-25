import { happyModel } from "../db/index.js";

export const totalhappyService = {
  findAll: async () => {
    const totalHappylist = await happyModel.findByEmail({ email });
    if (!totalHappylist) {
      throw new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }

    return createdNewUser;
  },
};
