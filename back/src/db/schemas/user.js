import pkg from "mongoose";
const { Schema, model } = pkg;

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
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
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
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
