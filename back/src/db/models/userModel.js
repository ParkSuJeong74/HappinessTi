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
  findByNickname: async ({ nickname }) => {
    const user = await User.findOne({ nickname })
    return user
  },

  findAll: async () => {
    const users = await User.find({})
    return users
  },

  update: async ({ userId, fieldToUpdate, newValue }) => {
    const filter = { id: userId }
    const update = { [fieldToUpdate]: newValue }
    const option = { returnOriginal: false }

    const updatedUser = await User.findOneAndUpdate(filter, update, option)
    return updatedUser
  },
}

module.exports = { userModel }
