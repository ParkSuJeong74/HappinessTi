import { Ranking } from "../schemas/ranking.js";

export const rankingModel = {
  findRanking: async ({}) => {
    const ranking = await Ranking.find({}).limit(10);
    return ranking;
  },
};
