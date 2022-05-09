import pkg from "mongoose";
const { Schema, model } = pkg;

const SurveylogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    happyType: {
      type: String,
      required: true,
    },
    myCountry: {
      type: String,
      required: true,
    },
    reCountry: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Surveylog = model("Surveylog", SurveylogSchema);
