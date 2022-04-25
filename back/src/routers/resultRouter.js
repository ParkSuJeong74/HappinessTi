// 설문조사 실시 후 결과 보러가기 버튼 클릭시
// front -> flask에게 body로 input 값 전달 후 ml 요청 -> flask ml 실시
// flask -> front에게 ml 전달
// front -> node에게 body로 ml 데이터 값 전달 -> node result 값에 맞는 결과 전달

// analysis 페이지-----
// python에서 분석한 후 DB 접근 : data json 저장
// node가 DB 접근 -> 분석 결과 가져오기

import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
// import { userAuthService } from "../services/userService.js";
import { Buffer } from "buffer";
import { format } from "util";
import { multer } from "../middlewares/multer.js";
import { gcsBucket } from "../config/gcs.js";
export const resultRouter = Router();

// Todo: get 요청시 result 데이터 전달 및 DB에 로그 저장
resultRouter.get("/current", login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
      userId,
    });

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});
