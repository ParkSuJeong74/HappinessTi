/**
 *  @swagger
 *  tags:
 *    name: TotalHappiness
 *    description: API to manage TotalHappiness
 */

import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { totalHappinessService } from "../services/totalHappinessService.js";
export const totalHappinessRouter = Router();

/**
 * @swagger
 * path:
 * /total-happiness/lists:
 *   get:
 *     tags: [TotalHappiness]
 *     description: 전체 행복도 리스트 조회
 *     produces:
 *     - "application/json"
 *     security:
 *      - Authorization: []
 *     responses:
 *       '200':
 *         description: "전체 행복도 리스트 조회 완료"
 *         schema:
//  *           $ref: '#/components/schemas/Happiness'
 */
totalHappinessRouter.get(
  "/lists",
  login_required,
  async function (req, res, next) {
    try {
      const totalHappylist = await totalHappinessService.getHappyLists();

      res.status(200).send(totalHappylist);
    } catch (error) {
      next(error);
    }
  }
);

// 검색 결과 출력
/**
 * @swagger
 * path:
 * /total-happiness/search:
 *   get:
 *     tags: [TotalHappiness]
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
//  *           $ref: '#/components/schemas/Happiness'
 */
totalHappinessRouter.get(
  "/search",
  login_required,
  async function (req, res, next) {
    try {
      const { country } = req.body;
      const searchCountry = await totalHappinessService.getSearchCountry({
        country,
      });

      res.status(200).send(searchCountry);
    } catch (error) {
      next(error);
    }
  }
);

// Todo: analysis 페이지 api
