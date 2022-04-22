const { Schema, model } = require("mongoose")

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    profileImgUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = model("User", UserSchema)

module.exports = { User }
