import Multer from "multer";

export const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: { fileSize: process.env.MAXSIZE },
  },
});
