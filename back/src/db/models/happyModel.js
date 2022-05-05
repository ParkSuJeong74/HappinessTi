import { Happiness } from "../schemas/happiness.js";

export const happyModel = {
<<<<<<< HEAD
  findRanking: async ({}) => {
    const countries = await Happiness.find().sort({ count: -1 }).limit(5);
    return countries;
=======
  findAll: async () => {
    const totalHappylist = await Happiness.find();
    return totalHappylist;
>>>>>>> c7e5a834c5911d57d0efb6ead6d486576688c50b
  },
  findByCountry: async ({ countryName }) => {
    const country = await Happiness.find({ country: countryName });
    return country;
  },
<<<<<<< HEAD
=======
  counting: async ({ countryName }) => {
    const country = await Happiness.find({ country: countryName });
    console.log(country);
    return country;
  },
  findByName: async ({ countryName }) => {
    const country = await Happiness.findOne({ country: countryName });
    return country;
  },
>>>>>>> c7e5a834c5911d57d0efb6ead6d486576688c50b
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
<<<<<<< HEAD
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
        },
      },
    ]);
    return { totalHappylist };
  },
  //
  counting: async ({ countryName }) => {
    const country = await Happiness.find({ country: countryName });
    return country;
=======
  findRanking: async ({}) => {
    const countries = await Happiness.find().sort({ count: -1 }).limit(5);
    return countries;
>>>>>>> c7e5a834c5911d57d0efb6ead6d486576688c50b
  },
};
