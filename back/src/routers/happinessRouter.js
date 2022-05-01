/**
 *  @swagger
 *  tags:
 *    name: Happiness
 *    description: API to manage Happiness(후순위)
 */

import { Router } from "express";
import { happinessService } from "../services/happinessService.js";
export const happinessRouter = Router();

/**
 * @swagger
 * path:
 * /happiness/lists:
 *   get:
 *     tags: [Happiness]
 *     description: 전체 행복도 리스트 조회
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "전체 행복도 리스트 조회 완료"
 *         schema:
 *           $ref: '#/components/schemas/Happiness'
 */
happinessRouter.get("/lists", async function (req, res, next) {
  try {
    const totalHappylist = await happinessService.getHappyLists();
    res.status(200).send(totalHappylist);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * path:
 * /happiness/search/{country}:
 *   get:
 *     tags: [Happiness]
 *     description: 나라 검색
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "country"
 *       in: "path"
 *       required: true
 *     responses:
 *       '200':
 *         description: "나라 검색 완료"
 *         schema:
 *           $ref: '#/components/schemas/Happiness'
 */
happinessRouter.get("/search/:country", async function (req, res, next) {
  try {
    const { country } = req.params;
    const searchCountry = await happinessService.getSearchCountry({
      country,
    });

    res.status(200).send(searchCountry);
  } catch (error) {
    next(error);
  }
});
