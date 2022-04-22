const { User } = require("../schemas/user")

const userModel = {
  create: async ({ newUser }) => {
    const createdNewUser = await User.create(newUser)
    return createdNewUser
  },

  findByEmail: async ({ email }) => {
    const user = await User.findOne({ email })
    return user
  },

  findById: async ({ userId }) => {
    const user = await User.findOne({ id: userId })
    return user
  },

  findAll: async () => {
    const users = await User.find({})
    return users
  },

  update: async ({ userId, newValue }) => {
    const filter = { id: userId }
    const update = { $set: newValue }
    const option = { returnOriginal: false }

    const updatedUser = await User.findOneAndUpdate(filter, update, option)
    return updatedUser
  },

  delete: async ({ userId }) => {
    const deleteone = await User.deleteOne({ id: userId })
    const allremove = deleteone.deletedCount === 1
    return allremove
  },
}

module.exports = { userModel }
