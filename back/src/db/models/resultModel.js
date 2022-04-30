import { Surveylog } from "../schemas/surveylog.js";
import { Ranking } from "../schemas/ranking.js";

export const resultModel = {
  saveSurvey: async ({ data }) => {
    const user = await Surveylog.create({ data });
    return user;
  },
  saveRanking: async ({ data }) => {
    const user = await Ranking.findOne({ data });
    return user;
  },
};
