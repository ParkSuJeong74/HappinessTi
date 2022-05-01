/**
 *  @swagger
 *  tags:
 *    name: SurveyLog
 *    description: API to manage SurveyLog
 */
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { surveyLogService } from "../services/surveylogService.js";

export const surveyLogRouter = Router();

/**
 * @swagger
 * /survey/{userId}/log:
 *   get:
 *     tags: [SurveyLog]
 *     description: 한 유저의 설문조사 결과 조회(마이페이지)
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "userId"
 *       in: "path"
 *       required: true
 *     responses:
 *       '200':
 *         description: "한 유저의 설문조사 결과 조회 완료"
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Surveylog'
 */
surveyLogRouter.get("/:userId/log", async function (req, res, next) {
  try {
    const { userId } = req.params;
    const logs = await surveyLogService.getUser({ userId });

    res.status(201).json(logs);
  } catch (error) {
    next(error);
  }
});
