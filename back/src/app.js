import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swaggerDoc.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

export const app = express();

import { userAuthRouter } from "./routers/userRouter.js";
// import { totalHappinessRouter } from "./routers/totalHappinessRouter.js";
import { resultRouter } from "./routers/resultRouter.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// 기본
app.get("/", (req, res) => {
  res.send("기본");
});

// router | userAuthRouter는 맨 위
app.use("/users", userAuthRouter);
// app.use("/total-happiness", totalHappinessRouter);
app.use("/result", resultRouter);

app.use(errorMiddleware);

export default app;
