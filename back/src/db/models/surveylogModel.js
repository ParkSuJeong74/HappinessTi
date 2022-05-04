import { Surveylog } from "../schemas/surveylog.js";

export const surveylogModel = {
  addLog: async ({ log }) => {
    const newLog = await Surveylog.create(log);
    return newLog;
  },
  //
  findById: async ({ userId }) => {
    const logs = await Surveylog.find({ userId }).sort({ createdAt: -1 });
    return logs;
  },
};
