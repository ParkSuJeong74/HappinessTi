import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swaggerDoc.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

export const app = express();

import { userAuthRouter } from "./routers/userRouter.js";
// const multer = require("multer")
// const MulterGoogleCloudStorage = require("multer-google-storage")

// const uploadHandler = multer({
//   storage: multerGoogleStorage.storageEngine(),
// })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// process.env.GOOGLE_APPLICATION_CREDENTIALS =
//   `${process.cwd()}/src/secure/` + process.env.GCS_KEYFILE;

// console.log(
//   "google authentication installed at",
//   process.env["GOOGLE_APPLICATION_CREDENTIALS"]
// );

// 기본
app.get("/", (req, res) => {
  res.send("기본");
});

// // router | userAuthRouter는 맨 위
app.use("/users", userAuthRouter);

app.use(errorMiddleware);

export default app;
