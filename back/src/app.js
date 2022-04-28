import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swaggerDoc.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { userAuthRouter } from "./routers/userRouter.js";
import { happinessRouter } from "./routers/happinessRouter.js";
import { resultRouter } from "./routers/resultRouter.js";
import { graphRouter } from "./routers/graphRouter.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// 기본
app.get("/", (req, res) => {
  res.send("Hello World! 기본 서버 테스트용");
});

// router
app.use("/users", userAuthRouter);
app.use("/happiness", happinessRouter);
app.use("/result", resultRouter);
app.use("/graph", graphRouter);
app.use(errorMiddleware);

export default app;
