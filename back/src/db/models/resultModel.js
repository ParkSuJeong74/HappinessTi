import { Surveylog } from "../schemas/surveylog.js";
// import { Ranking } from "../schemas/ranking.js";

export const resultModel = {
  saveSurvey: async ({ newData }) => {
    const user = await Surveylog.save({ newData });
    return user;
  },
  saveRanking: async ({ data }) => {
    // const user = await Ranking.findOne({ data });
    // return user;
  },
};
