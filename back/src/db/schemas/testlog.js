import pkg from "mongoose";
const { Schema, model } = pkg;

const TestlogSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    happinessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Happiness",
    },
  },
  {
    timestamps: true,
  }
);

export const Testlog = model("Testlog", TestlogSchema);
