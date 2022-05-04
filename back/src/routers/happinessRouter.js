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
    const { totalHappylist } = await happinessService.getHappyLists();
    res.status(200).send(totalHappylist.totalHappylist);
  } catch (error) {
    next(error);
  }
});
