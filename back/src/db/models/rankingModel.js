import { Happiness } from "../schemas/happiness.js";

export const rankingModel = {
  findRanking: async () => {
    const ranking = await Ranking.find({ count }).sort({ count: -1 }).limit(5);
    return ranking;
  },
  findByRank: async () => {
    const ranking = await Happiness.find().limit(5);
    return ranking;
  },
};
