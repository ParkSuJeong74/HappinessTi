/**
 *  @swagger
 *  tags:
 *    name: Rank
 *    description: API to manage Rank
 */
import { Router } from "express";
import { rankingService } from "../services/rankingService.js";

export const rankingRouter = Router();

// rank logic
// 설문조사 완료 -> 결과 출력하는 api 호출(ml, 시각화) -> 그 api에서 db에 log 저장
// 웹소켓 : 실시간 update(testlog)
// get으로 mainpage

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
    const ranking = await rankingService.getRanking({});
    res.status(200).send(ranking);
  } catch (error) {
    next(error);
  }
});

// sorted set
// redis
// stream

// const cursor = ViewHistoryModel.find({})
//   .cursor()
//   .addCursorFlag("noCursorTimeout", true);

// // local cache의 sorted Set, 혹은 redis global cache의 sorted Set에 상태변경
// for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
//   // data[doc[user_id]] += 1
//   console.log(doc); // Prints documents one at a time
// }
