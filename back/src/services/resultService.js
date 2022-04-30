import { resultModel, happyModel, userModel } from "../db/index.js";

export const resultService = {
  saveLog: async ({ userId, data }) => {
    const country = await happyModel.findByCountry({
      countryName: data.country,
    });
    console.log(country);
    const newData = {
      happinessId: country._id,
      user: userId,
    };
    console.log(newData);
    const survey = await userModel.saveSurvey({ newData });
    if (!survey) {
      throw "survey 저장 못함";
    }
  },
  saveRanking: async ({ userId, data }) => {
    const country = await happyModel.findByCountry({
      countryName: data.myCountry,
    });

    const ranking = await resultModel.saveRanking({ data });
    if (!ranking) {
      throw "ranking 저장 못함";
    }
  },
};
