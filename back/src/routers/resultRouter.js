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
 *     description: 머신러닝 행복도 예측, 로그 저장, 랭킹 카운트
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
 *               freedom:
 *                 type: number
 *               perceptions:
 *                 type: number
 *               NorDystopia:
 *                 type: number
 *     responses:
 *       '200':
 *         description: "머신러닝 행복도 예측, 로그 저장, 랭킹 카운트 완료"
 */
resultRouter.post("/predict", login_required, async function (req, res, next) {
  try {
    const response = await axios.post(
      `${process.env.FLASK_BASE_URL}/predict`,
      req.body
    );
    if (!response) {
      throw "데이터를 받아오지 못했습니다.";
    }
    const userId = req.currentUserId;
    const { data } = response;
    await resultService.saveCounting({ data }); // Ranking count
    await resultService.saveLog({ userId, data }); // log 저장
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
      const response = await axios.get(`${process.env.FLASK_BASE_URL}/similar`);
      if (!response) {
        throw "데이터를 받아오지 못했습니다.";
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
 *     parameters:
 *     - name: "country"
 *       in: "path"
 *       required: true
 *     security:
 *      - Authorization: []
 *     responses:
 *       '200':
 *         description: "설문조사 결과 페이지 시각화 완료"
 */
resultRouter.get("/:country", login_required, async function (req, res, next) {
  try {
    const response = await axios.get(
      `${process.env.FLASK_BASE_URL}/result/${req.params.country}`
    );
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /result/{country}/text:
 *   get:
 *     tags: [Result]
 *     description: 설문조사 결과 페이지 상위 퍼센트 표시
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "country"
 *       in: "path"
 *       required: true
 *     security:
 *      - Authorization: []
 *     responses:
 *       '200':
 *         description: "설문조사 결과 페이지 상위 퍼센트 표시 완료"
 */
resultRouter.get(
  "/:country/text",
  login_required,
  async function (req, res, next) {
    try {
      const response = await axios.get(
        `${process.env.FLASK_BASE_URL}/text/${req.params.country}`
      );
      res.status(200).send(response.data);
    } catch (error) {
      next(error);
    }
  }
);
