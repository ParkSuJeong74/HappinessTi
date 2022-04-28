import { happyModel } from "../db/index.js";

export const totalHappinessService = {
  getHappyLists: async () => {
    const totalHappylist = await happyModel.findAll();
    return totalHappylist;
  },
  getSearchCountry: async ({ country }) => {
    const currentUserInfo = await happyModel.findByCountry({ country });
    return currentUserInfo;
  },
};
