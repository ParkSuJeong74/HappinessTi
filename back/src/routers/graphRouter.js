/**
 *  @swagger
 *  tags:
 *    name: Graph
 *    description: API to manage Graph
 */
import { Router } from "express";
import axios from "axios";
import { login_required } from "../middlewares/login_required.js";
export const graphRouter = Router();

/**
 * @swagger
 * /graph/gdp/bar:
 *   get:
 *     tags: [Graph]
 *     description: GDP bar plot 그래프 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "GDP bar plot 그래프 시각화 완료"
 */
graphRouter.get("/gdp/bar", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:5000/gdp/bar");
    console.log(response);
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * /graph/social/bar:
 *   get:
 *     tags: [Graph]
 *     description: social bar plot 그래프 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "social bar plot 그래프 시각화 완료"
 */
graphRouter.get("/social/bar", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:5000/social/bar");
    console.log(response);
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * /graph/health/bar:
 *   get:
 *     tags: [Graph]
 *     description: health bar plot 그래프 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "health bar plot 그래프 시각화 완료"
 */
graphRouter.get("/health/bar", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:5000/health/bar");
    console.log(response);
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * /graph/freedom/bar:
 *   get:
 *     tags: [Graph]
 *     description: freedom bar plot 그래프 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "freedom bar plot 그래프 시각화 완료"
 */
graphRouter.get("/freedom/bar", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:5000/freedom/bar");
    console.log(response);
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * /graph/generosity/bar:
 *   get:
 *     tags: [Graph]
 *     description: generosity bar plot 그래프 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "generosity bar plot 그래프 시각화 완료"
 */
graphRouter.get("/generosity/bar", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:5000/generosity/bar");
    console.log(response);
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * /graph/corruption/bar:
 *   get:
 *     tags: [Graph]
 *     description: corruption bar plot 그래프 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "corruption bar plot 그래프 시각화 완료"
 */
graphRouter.get("/corruption/bar", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:5000/corruption/bar");
    console.log(response);
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});
