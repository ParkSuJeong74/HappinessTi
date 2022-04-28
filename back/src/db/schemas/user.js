import pkg from "mongoose";
const { Schema, model } = pkg;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    nickname: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "None",
    },
    profileImgUrl: {
      type: String,
      required: true,
      default: "crashingdevlogo.png",
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", UserSchema);
