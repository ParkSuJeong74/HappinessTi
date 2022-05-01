import { surveylogModel } from "../db/index.js";

export const surveyLogService = {
  getLogs: async ({ userId }) => {
    console.log(userId);
    const user = await surveylogModel.findById({ userId });
    return user;
  },
};
