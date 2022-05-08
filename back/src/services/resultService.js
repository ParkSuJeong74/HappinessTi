import { happyModel, surveylogModel } from "../db/index.js";

export const resultService = {
  saveCounting: async ({ data }) => {
    const country = await happyModel.findByCountry({
      countryName: data.reCountry,
    });
    if (!country) {
      throw "찾을 수 없는 나라입니다.";
    }
    const counting = { count: country.count + 1 };
    const happinessId = country._id;
    await happyModel.update({ happinessId, counting });
  },
  saveLog: async ({ userId, data }) => {
    const log = {
      userId,
      happyType: data.happyType,
      myCountry: data.myCountry,
      reCountry: data.reCountry,
    };

    surveylogModel.addLog({ log });
  },
};
