import { happyModel, surveylogModel } from "../db/index.js";

export const resultService = {
  saveLog: async ({ userId, data }) => {
    const log = {
      userId,
      happyType: data.happyType,
      myCountry: data.myCountry,
      reCountry: data.reCountry,
    };
    console.log("data", log);
    const newLog = surveylogModel.addLog({ log });
    console.log(newLog);
  },
  saveCounting: async ({ data }) => {
    const country = await happyModel.findByName({
      countryName: data.myCountry,
    });
    const counting = { count: country.count + 1 };
    const happinessId = country._id;
    await happyModel.update({ happinessId, counting });
  },
};
