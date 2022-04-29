import { rankingModel } from "../db/index.js";

export const rankingService = {
  getRanking: async ({}) => {
    const ranking = await rankingModel.findRanking({});
    return ranking;
  },
};
