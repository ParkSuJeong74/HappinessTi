import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { totalhappyService } from "../services/totalhappyService.js";
export const totalhappyRouter = Router();

// Todo: 전체 리스트 출력
totalhappyRouter.get("/lists", login_required, async function (req, res, next) {
  try {
    const totalHappylist = await totalhappyService.getUserInfo({ userId });

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

// Todo: 검색 결과 출력
totalhappyRouter.get("/:id", login_required, async function (req, res, next) {
  try {
    const userId = req.params.id;
    const currentUserInfo = await totalhappyService.getUserInfo({ userId });

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});
