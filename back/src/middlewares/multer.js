import Multer from "multer";
import util from "util";

const maxSize = 2 * 1024 * 1024;

export const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: { fileSize: maxSize },
  },
});
