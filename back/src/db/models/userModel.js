import { User } from "../schemas/user.js";

export const userModel = {
  create: async ({ newUser }) => {
    const createdNewUser = await User.create(newUser);
    return createdNewUser;
  },

  isNicknameExist: async ({ nickname }) => {
    const isNicknameExist = await User.findOne({ nickname });
    if (isNicknameExist) {
      return false;
    }
    return true;
  },

  isEmailExist: async ({ email }) => {
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return false;
    }
    return true;
  },

  findByEmail: async ({ email }) => {
    const user = await User.findOne({ email });
    return user;
  },

  findById: async ({ userId }) => {
    const user = await User.findOne({ _id: userId });
    return user;
  },
  findByNickname: async ({ nickname }) => {
    const user = await User.findOne({ nickname });
    return user;
  },

  findAll: async () => {
    const users = await User.find({});
    return users;
  },

  update: async ({ userId, updateObject, newValue }) => {
    const filter = { _id: userId };
    const update = { $set: updateObject };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  },

  delete: async ({ userId }) => {
    const deleteUser = await User.deleteOne({ id: userId });
    const isDeleted = deleteUser.deletedCount === 1;
    return isDeleted; // True or False
  },
};
