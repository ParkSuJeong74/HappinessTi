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
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /graph/continent/bar:
 *   get:
 *     tags: [Graph]
 *     description: continent bar plot 그래프 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "corruption bar plot 그래프 시각화 완료"
 */
graphRouter.get("/continent/bar", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:5000/continent/bar");
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
 *     description: corruption bar plot 그래프 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "corruption bar plot 그래프 시각화 완료"
 */
graphRouter.get("/mapplot", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:5000/mapplot");
    const list = response.data.map((d) => {
      let newValue = {};
      newValue["value"] = d["RANK"];
      newValue["id"] = d["StNames"];

      return newValue;
    });
    res.status(200).send(list);
  } catch (error) {
    next(error);
  }
});
/**
 * @swagger
 * /graph/high/bar:
 *   get:
 *     tags: [Graph]
 *     description: corruption bar plot 그래프 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "corruption bar plot 그래프 시각화 완료"
 */
graphRouter.get("/high/bar", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:5000/high/bar");
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /graph/low/bar:
 *   get:
 *     tags: [Graph]
 *     description: corruption bar plot 그래프 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "corruption bar plot 그래프 시각화 완료"
 */
graphRouter.get("/low/bar", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:5000/low/bar");
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});
