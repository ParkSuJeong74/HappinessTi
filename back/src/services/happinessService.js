import { happyModel } from "../db/index.js";

export const happinessService = {
  getHappyLists: async () => {
    const totalHappylist = await happyModel.findAll({});
    return totalHappylist;
  },
  getSearchCountry: async ({ countryName }) => {
    const country = await happyModel.findByCountry({ countryName });
    return country;
  },
};
