import { Router } from "express";
import axios from "axios";
import { login_required } from "../middlewares/login_required.js";
export const resultRouter = Router();

resultRouter.get("/predict", login_required, async function (req, res, next) {
  try {
    const response = await axios.post(
      "http://localhost:5000/predict",
      req.body
    );
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});
