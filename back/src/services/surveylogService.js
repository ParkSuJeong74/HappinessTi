import { surveylogModel, happyModel } from "../db/index.js";

export const surveyLogService = {
  getLogs: async ({ userId }) => {
    const analysis = await surveylogModel.findById({
      userId,
    });
    let countryInfo = [];
    for (let log of analysis) {
      countryInfo.push(
        await happyModel.findByCountry({
          countryName: log.reCountry,
        })
      );
    }

    return countryInfo;
  },
};
