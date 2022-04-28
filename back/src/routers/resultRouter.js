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
 *     security:
 *      - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               myCountry:
 *                 type: string
 *               kw:
 *                 type: number
 *               lifeExpectancy:
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

// 사진 그래프
// flask에서 호출한 api
// 버킷에 사진 저장(gcs)
// 서버에 사진 삭제(fs)
// 버킷 링크 전달(front)
