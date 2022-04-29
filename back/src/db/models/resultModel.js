import { Surveylog } from "../schemas/surveylog.js";
import { Ranking } from "../schemas/ranking.js";

export const resultModel = {
  saveSurvey: async ({ data }) => {
    const user = await Surveylog.create({ userId });
    return user;
  },
  saveRanking: async ({ data }) => {
    const user = await Ranking.findOne({ userId });
    return user;
  },
};
