import pkg from "mongoose";
const { Schema, model } = pkg;

const SurveylogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    happinessId: {
      type: Schema.Types.ObjectId,
      ref: "Happiness",
    },
  },
  {
    timestamps: true,
  }
);

export const Surveylog = model("Surveylog", SurveylogSchema);
