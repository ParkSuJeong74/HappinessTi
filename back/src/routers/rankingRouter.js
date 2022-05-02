/**
 *  @swagger
 *  tags:
 *    name: Rank
 *    description: API to manage Rank
 */
import { Router } from "express";
import { rankingService } from "../services/rankingService.js";

export const rankingRouter = Router();

/**
 * @swagger
 * /rank:
 *   get:
 *     tags: [Rank]
 *     description: 메인페이지 랭킹 조회
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "메인페이지 랭킹 조회 완료"
 */
rankingRouter.get("/", async function (req, res, next) {
  try {
    const countries = await rankingService.getRanking();
    res.status(200).send(countries);
  } catch (error) {
    next(error);
  }
});
