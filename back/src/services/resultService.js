import { happyModel, surveylogModel } from "../db/index.js";

export const resultService = {
  saveLog: async ({ userId, data }) => {
    const log = {
      userId,
      happyType: data.happyType,
      myCountry: data.myCountry,
      reCountry: data.reCountry,
    };

    surveylogModel.addLog({ log });
  },
  saveCounting: async ({ data }) => {
    console.log(data.reCountry);
    const country = await happyModel.findByName({
      countryName: data.reCountry,
    });
    if (!country) {
      throw "찾을 수 없는 나라입니다.";
    }
    const counting = { count: country.count + 1 };
    const happinessId = country._id;
    await happyModel.update({ happinessId, counting });
  },
};
