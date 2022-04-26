/**
 *  @swagger
 *  tags:
 *    name: Result
 *    description: API to manage Result
 */
import { Router } from "express";
import axios from "axios";
import { login_required } from "../middlewares/login_required.js";
export const resultRouter = Router();

/**
 * @swagger
 * /result/predict:
 *   post:
 *     tags: [Result]
 *     description: 머신러닝 행복도 예측
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               kw:
 *                 type: number
 *               life_expectancy:
 *                 type: number
 *               social:
 *                 type: number
 *               generosity:
 *                 type: number
 *     responses:
 *       '200':
 *         description: "머신러닝 행복도 예측 완료"
 */
resultRouter.post("/predict", login_required, async function (req, res, next) {
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
