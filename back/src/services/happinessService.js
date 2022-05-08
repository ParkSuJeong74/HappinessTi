import { happyModel } from "../db/index.js";

export const happinessService = {
  getRanking: async () => {
    const countries = await happyModel.findRanking({});
    return countries;
  },

  getHappyLists: async () => {
    const totalHappylist = await happyModel.findAllHappiness();
    return { totalHappylist };
  },
};
