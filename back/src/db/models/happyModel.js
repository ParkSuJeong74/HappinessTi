import { Happiness } from "../schemas/happiness.js";

export const happyModel = {
  findByCountry: async ({ countryName }) => {
    const country = await Happiness.find({ country: countryName });
    console.log(country);
    return country;
  },
  findAll: async ({}) => {
    const list = await Happiness.find({});
    return list;
  },
};
