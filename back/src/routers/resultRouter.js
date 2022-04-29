/**
 *  @swagger
 *  tags:
 *    name: Result
 *    description: API to manage Survey Result
 */
import { Router } from "express";
import axios from "axios";
import { login_required } from "../middlewares/login_required.js";
import { resultService } from "../services/resultService.js";

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
    const userId = req.currentUserId;
    const { data } = response;
    // mongodb 접근
    // log 기록
    // ranking counting
    await resultService.save({ userId, data });
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /result/{country}/similar:
 *   get:
 *     tags: [Result]
 *     description: 군집 분석 결과 도출, 같은 군집의 나라 조회
 *     produces:
 *     - "application/json"
 *     security:
 *      - Authorization: []
 *     parameters:
 *     - name: "country"
 *       in: "path"
 *       required: true
 *     responses:
 *       '200':
 *         description: "군집 분석 결과 도출, 같은 군집의 나라 조회 완료"
 */
resultRouter.get(
  "/:countryName/similar",
  login_required,
  async function (req, res, next) {
    try {
      const response = await axios.get("http://localhost:5000/similar");
      if (!response) {
        throw "";
      }
      const { countryName } = req.params;
      const { data } = response;
      const keys = Object.keys(data);
      let similarCounrtries;
      for (const key of keys) {
        const index = data[key].findIndex(
          (c) => c.toLowerCase() === countryName.toLowerCase()
        );
        if (index < 0) continue;
        const result = data[key];
        result.splice(index, 1);
        similarCounrtries = result;
        break;
      }
      if (!similarCounrtries) throw "군집 없음";
      res.status(200).json({ similarCounrtries });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /result/{country}:
 *   get:
 *     tags: [Result]
 *     description: 설문조사 결과 페이지 시각화
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
resultRouter.get("/:country", login_required, async function (req, res, next) {
  try {
    const response = await axios.post(
      "http://localhost:5000/result/",
      req.params
    );
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});
