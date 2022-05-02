import { Happiness } from "../schemas/happiness.js";

export const happyModel = {
  findAll: async () => {
    const totalHappylist = await Happiness.find();
    return totalHappylist;
  },
  findByCountry: async ({ countryName }) => {
    const country = await Happiness.findOne({ country: countryName });
    return country;
  },
  counting: async ({ countryName }) => {
    const country = await Happiness.find({ country: countryName });
    console.log(country);
    return country;
  },
  findByName: async ({ countryName }) => {
    const country = await Happiness.findOne({ country: countryName });
    return country;
  },
  update: async ({ happinessId, counting }) => {
    const update = { $set: counting };
    const option = { returnOriginal: false };

    const country = await Happiness.findByIdAndUpdate(
      happinessId,
      update,
      option
    );
    return country;
  },
  findRanking: async ({}) => {
    const countries = await Happiness.find().sort({ count: -1 }).limit(5);
    return countries;
  },
};
