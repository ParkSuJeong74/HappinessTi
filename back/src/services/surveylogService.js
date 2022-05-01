import { surveylogModel } from "../db/index.js";

export const surveyLogService = {
  getUser: async ({ userId }) => {
    const user = await surveylogModel.findById({ userId });
    return user;
  },
};
