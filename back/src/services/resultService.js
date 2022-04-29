import { resultModel } from "../db/index.js";

export const resultService = {
  save: async ({ userId, data }) => {
    const survey = await resultModel.saveSurvey({ data });
    if (!survey) {
      throw "survey 저장 못함";
    }
    const ranking = await resultModel.saveRanking({ data });
    if (!ranking) {
      throw "ranking 저장 못함";
    }
  },
};
