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
 * /graph/happiness:
 *   get:
 *     tags: [Graph]
 *     description: 메인페이지 composed-chart plot 그래프 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "메인페이지 composed-chart plot 그래프 시각화 완료"
 */
graphRouter.get("/happiness/years", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:5000");
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});

// /**
//  * @swagger
//  * /graph/social/bar:
//  *   get:
//  *     tags: [Graph]
//  *     description: 메인페이지 social bar plot 그래프 시각화
//  *     produces:
//  *     - "application/json"
//  *     responses:
//  *       '200':
//  *         description: "메인페이지 social bar plot 그래프 시각화 완료"
//  */
// graphRouter.get("/social/bar", async function (req, res, next) {
//   try {
//     const response = await axios.get("http://localhost:5000/social/bar");
//     res.status(200).send(response.data);
//   } catch (error) {
//     next(error);
//   }
// });

// /**
//  * @swagger
//  * /graph/health/bar:
//  *   get:
//  *     tags: [Graph]
//  *     description: 메인페이지 health bar plot 그래프 시각화
//  *     produces:
//  *     - "application/json"
//  *     responses:
//  *       '200':
//  *         description: "메인페이지 health bar plot 그래프 시각화 완료"
//  */
// graphRouter.get("/health/bar", async function (req, res, next) {
//   try {
//     const response = await axios.get("http://localhost:5000/health/bar");
//     res.status(200).send(response.data);
//   } catch (error) {
//     next(error);
//   }
// });

// /**
//  * @swagger
//  * /graph/freedom/bar:
//  *   get:
//  *     tags: [Graph]
//  *     description: 메인페이지 freedom bar plot 그래프 시각화
//  *     produces:
//  *     - "application/json"
//  *     responses:
//  *       '200':
//  *         description: "메인페이지 freedom bar plot 그래프 시각화 완료"
//  */
// graphRouter.get("/freedom/bar", async function (req, res, next) {
//   try {
//     const response = await axios.get("http://localhost:5000/freedom/bar");
//     res.status(200).send(response.data);
//   } catch (error) {
//     next(error);
//   }
// });

// /**
//  * @swagger
//  * /graph/generosity/bar:
//  *   get:
//  *     tags: [Graph]
//  *     description: 메인페이지 generosity bar plot 그래프 시각화
//  *     produces:
//  *     - "application/json"
//  *     responses:
//  *       '200':
//  *         description: "메인페이지 generosity bar plot 그래프 시각화 완료"
//  */
// graphRouter.get("/generosity/bar", async function (req, res, next) {
//   try {
//     const response = await axios.get("http://localhost:5000/generosity/bar");
//     res.status(200).send(response.data);
//   } catch (error) {
//     next(error);
//   }
// });

// /**
//  * @swagger
//  * /graph/corruption/bar:
//  *   get:
//  *     tags: [Graph]
//  *     description: 메인페이지 corruption bar plot 그래프 시각화
//  *     produces:
//  *     - "application/json"
//  *     responses:
//  *       '200':
//  *         description: "메인페이지 corruption bar plot 그래프 시각화 완료"
//  */
// graphRouter.get("/corruption/bar", async function (req, res, next) {
//   try {
//     const response = await axios.get("http://localhost:5000/corruption/bar");
//     res.status(200).send(response.data);
//   } catch (error) {
//     next(error);
//   }
// });

// /**
//  * @swagger
//  * /graph/continent/bar:
//  *   get:
//  *     tags: [Graph]
//  *     description: 메인페이지 continent bar plot 그래프 시각화
//  *     produces:
//  *     - "application/json"
//  *     responses:
//  *       '200':
//  *         description: "메인페이지 corruption bar plot 그래프 시각화 완료"
//  */
// graphRouter.get("/continent/bar", async function (req, res, next) {
//   try {
//     const response = await axios.get("http://localhost:5000/continent/bar");
//     res.status(200).send(response.data);
//   } catch (error) {
//     next(error);
//   }
// });

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
 * /graph/{continent}/bar:
 *   get:
 *     tags: [Graph]
 *     description: 대륙별 Top 10 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "대륙별 Top 10 시각화 완료"
 */
graphRouter.get("/:continent/bar", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:5000/:continent/bar");
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});

// /**
//  * @swagger
//  * /graph/high/bar:
//  *   get:
//  *     tags: [Graph]
//  *     description: high 그래프 시각화(임시)
//  *     produces:
//  *     - "application/json"
//  *     responses:
//  *       '200':
//  *         description: "high 그래프 시각화 완료"
//  */
// graphRouter.get("/high/bar", async function (req, res, next) {
//   try {
//     const response = await axios.get("http://localhost:5000/high/bar");
//     res.status(200).send(response.data);
//   } catch (error) {
//     next(error);
//   }
// });

// /**
//  * @swagger
//  * /graph/low/bar:
//  *   get:
//  *     tags: [Graph]
//  *     description: low 그래프 시각화(임시)
//  *     produces:
//  *     - "application/json"
//  *     responses:
//  *       '200':
//  *         description: "low 그래프 시각화 완료"
//  */
// graphRouter.get("/low/bar", async function (req, res, next) {
//   try {
//     const response = await axios.get("http://localhost:5000/low/bar");
//     res.status(200).send(response.data);
//   } catch (error) {
//     next(error);
//   }
// });

//treemap
/**
 * @swagger
 * /graph/treemap:
 *   get:
 *     tags: [Graph]
 *     description: treemap 시각화
 *     produces:
 *     - "application/json"
 *     responses:
 *       '200':
 *         description: "treemap 시각화 완료"
 */
graphRouter.get("/treemap", async function (req, res, next) {
  try {
    const response = await axios.get("http://localhost:5000/tree");
    res.status(200).send(response.data);
  } catch (error) {
    next(error);
  }
});
