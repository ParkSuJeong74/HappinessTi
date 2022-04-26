import { Happiness } from "../schemas/happiness.js";

export const happyModel = {
  create: async ({ newUser }) => {
    const createdNewUser = await Happiness.create(newUser);
    return createdNewUser;
  },
};
