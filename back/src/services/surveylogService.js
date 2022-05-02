import { surveylogModel } from "../db/index.js";

export const surveyLogService = {
  getLogs: async ({ userId }) => {
    const user = await surveylogModel.findById({ userId });
    return user;
  },
};
