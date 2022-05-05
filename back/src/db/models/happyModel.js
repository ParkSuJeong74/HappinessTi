import { Happiness } from "../schemas/happiness.js";

export const happyModel = {
  findRanking: async ({}) => {
    const countries = await Happiness.find().sort({ count: -1 }).limit(5);
    return countries;
  },
  findByCountry: async ({ countryName }) => {
    const country = await Happiness.find({ country: countryName });
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
  findAllHappiness: async () => {
    const totalHappylist = await Happiness.aggregate([
      {
        $project: {
          id: "$rank",
          _id: 0,
          country: 1,
          happinessScore: 1,
          socialSupport: 1,
          freedom: 1,
          gdp: 1,
          generosity: 1,
          corruptionPerceptions: 1,
          dystopia: 1,
          continent: 1,
          health: 1,
          rank: 1,
        },
      },
    ]);
    return { totalHappylist };
  },
  //
  counting: async ({ countryName }) => {
    const country = await Happiness.find({ country: countryName });
    return country;
  },
};
