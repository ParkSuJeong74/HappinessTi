import { Happiness } from "../schemas/happiness.js";

export const happyModel = {
  counting: async ({ countryName }) => {
    const country = await Happiness.find({ country: countryName });
    console.log(country);
    return country;
  },
  findByName: async ({ countryName }) => {
    const country = await Happiness.find({ country: countryName });
    console.log(country);
    return country;
  },
};
