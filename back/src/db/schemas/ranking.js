import pkg from "mongoose";
const { Schema, model } = pkg;

const RankingSchema = new Schema(
  {
    happinessId: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

RankingSchema.index({ count: -1 });

export const Ranking = model("Ranking", RankingSchema);
