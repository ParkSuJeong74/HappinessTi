/**
 *  @swagger
 *  tags:
 *    name: Happiness
 *    description: API to manage Happiness
 */

import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
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

// 검색 결과 출력
/**
 * @swagger
 * path:
 * /happiness/search:
 *   get:
 *     tags: [Happiness]
 *     description: 전체 행복도 리스트 조회
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
 *               country:
 *                 type: string
 *     responses:
 *       '200':
 *         description: "전체 행복도 리스트 조회 완료"
 *         schema:
 *           $ref: '#/components/schemas/Happiness'
 */

happinessRouter.get("/search", login_required, async function (req, res, next) {
  try {
    const { country } = req.body;
    const searchCountry = await happinessService.getSearchCountry({
      country,
    });

    res.status(200).send(searchCountry);
  } catch (error) {
    next(error);
  }
});

// Todo: analysis 페이지 api
happinessRouter.get("/:id", login_required, async function (req, res, next) {
  try {
    const { country } = req.body;
    const searchCountry = await happinessService.getSearchCountry({
      country,
    });

    res.status(200).send(searchCountry);
  } catch (error) {
    next(error);
  }
});
