import pkg from "mongoose";
const { Schema, model } = pkg;

const SurveylogSchema = new Schema(
  {
    happinessId: {
      type: String,
      required: true,
    },
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Surveylog = model("Surveylog", SurveylogSchema);
