import { Surveylog } from "../schemas/surveylog.js";

export const surveylogModel = {
  findById: async ({ userId }) => {
    const user = await Surveylog.find({ userId }).sort({ createdAt: -1 });
    return user;
  },
  addLog: async ({ log }) => {
    const newLog = await Surveylog.create(log);
    return newLog;
  },
};
