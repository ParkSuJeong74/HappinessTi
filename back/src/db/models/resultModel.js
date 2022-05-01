import { Surveylog } from "../schemas/surveylog.js";

export const resultModel = {
  saveSurvey: async ({ newData }) => {
    const user = await Surveylog.save({ newData });
    return user;
  },
};
