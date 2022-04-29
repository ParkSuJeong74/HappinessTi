import { Surveylog } from "../schemas/surveylog.js";

export const surveylogModel = {
  findById: async ({ userId }) => {
    const user = await Surveylog.findOne({ userId });
    return user;
  },
};
