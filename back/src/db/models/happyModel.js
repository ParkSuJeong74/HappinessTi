import { Happiness } from "../schemas/happiness.js";

export const happyModel = {
  findRanking: async ({}) => {
    const countries = await Happiness.find().sort({ count: -1 }).limit(5);
    return countries;
  },
  findByCountry: async ({ countryName }) => {
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
  //
  findAll: async () => {
    const totalHappylist = await Happiness.find();
    return { totalHappylist };
  },

  counting: async ({ countryName }) => {
    const country = await Happiness.find({ country: countryName });

    return country;
  },
};
