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

/**
 * @swagger
 * /result/{country}/similar:
 *   get:
 *     tags: [Result]
 *     description: 군집 분석 결과 도출, 같은 군집의 나라 조회
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "country"
 *       in: "path"
 *       required: true
 *     responses:
 *       '200':
 *         description: "군집 분석 결과 도출, 같은 군집의 나라 조회 완료"
 */
resultRouter.get("/:country/similar", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:5000/similar");
    const country = req.params;
    const countryName = country["country"].toLowerCase();
    const keys = Object.keys(response.data);
    let similarCountries;
    for (let key of keys) {
      response.data[key].map((value) => {
        if (value.toLowerCase() === countryName) {
          const countries = response.data[key].filter(
            (country) => country.toLowerCase() !== countryName
          );
          similarCountries = countries;
        }
      });
    }
    let error = "군집을 찾을 수 없습니다.";
    if (!similarCountries) {
      throw error;
    }
    res.status(200).json({ counrtries: similarCountries });
  } catch (error) {
    next(error);
  }
});
