import { Surveylog } from "../schemas/surveylog.js";
import { Happiness } from "../schemas/happiness.js";

export const surveylogModel = {
  findById: async ({ userId }) => {
    const logs = await Surveylog.find({ userId }).sort({ createdAt: -1 });
    return logs;
  },
  addLog: async ({ log }) => {
    const newLog = await Surveylog.create(log);
    return newLog;
  },
};
