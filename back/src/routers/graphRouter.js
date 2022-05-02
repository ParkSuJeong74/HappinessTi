/**
 *  @swagger
 *  tags:
 *    name: Graph
 *    description: API to manage Main Page Graph
 */
import { Router } from "express";
import axios from "axios";
export const graphRouter = Router();

/**
 * @swagger
 * /graph/composed:
 *   get:
 *     tags: [Graph]
 *     description: 메인페이지 composed-chart 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "메인페이지 composed-chart 시각화 완료"
 */
graphRouter.get("/composed", async function (req, res, next) {
  try {
    const response = await axios.get(`${process.env.FLASK_BASE_URL}/composed`);
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /graph/treemap:
 *   get:
 *     tags: [Graph]
 *     description: 메인페이지 treemap 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "메인페이지 treemap 시각화 완료"
 */
graphRouter.get("/treemap", async function (req, res, next) {
  try {
    const response = await axios.get(`${process.env.FLASK_BASE_URL}/tree`);
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /graph/mapplot:
 *   get:
 *     tags: [Graph]
 *     description: 메인페이지 map 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "메인페이지 map 시각화 완료"
 */
graphRouter.get("/mapplot", async function (req, res, next) {
  try {
    const response = await axios.get(`${process.env.FLASK_BASE_URL}/mapplot`);
    const map = response.data.map((d) => {
      const newValue = { value: d["RANK"], id: d["StNames"] };
      return newValue;
    });
    res.status(200).send(map);
  } catch (error) {
    next(error);
  }
});
