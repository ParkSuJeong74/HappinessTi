import pkg from "mongoose";
const { Schema, model } = pkg;

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
      required: false,
      default: "../../image/crashingdevlogo.png",
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", UserSchema);
