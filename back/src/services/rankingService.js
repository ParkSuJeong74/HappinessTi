import { rankingModel, happyModel } from "../db/index.js";

export const rankingService = {
  getRanking: async () => {
    const countries = await happyModel.findRanking({});
    return countries;
  },
  getHappinessRanking: async () => {
    const ranking = await rankingModel.findByRank();
    return ranking;
  },
};
