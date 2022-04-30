import { resultModel } from "../db/index.js";

export const resultService = {
  saveLog: async ({ userId, data }) => {
    console.log(data);
    const survey = await resultModel.saveSurvey({ data });
    if (!survey) {
      throw "survey 저장 못함";
    }
  },
  saveRanking: async ({ userId, data }) => {
    const ranking = await resultModel.saveRanking({ data });
    if (!ranking) {
      throw "ranking 저장 못함";
    }
  },
};
