import pkg from "mongoose";
const { Schema, model } = pkg;

const RankingSchema = new Schema(
  {
    happinessId: {
      type: Schema.Types.ObjectId,
      ref: "Happiness",
    },
    count: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

RankingSchema.index({ count: -1 });

export const Ranking = model("Ranking", RankingSchema);
