import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

import * as Api from "../../api";
import { ROUTES } from "../../Route";
import ProfileInfo from "./ProfileInfo";
import Profile from "./Profile";
import errorHandler from "../../errorHandler";
import Style from "../../srcAssets/style/Mypage.module.css";
import loading from "../../srcAssets/img/loading.gif";
import { TimeUtil } from "../../common/timeUtil";

function Mypage() {
  const navigate = useNavigate();

  const isLoggedin = sessionStorage.getItem("userToken");
  const [user, setUser] = useState(null);
  const [surveyLog, setSurveyLog] = useState([]);
  const [editOpen, setEditOpen] = useState(false);

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const toggleEditForm = () => {
    setEditOpen((prev) => !prev);
  };

  const updateUser = (user) => {
    setUser(user);
  };

  // user정보 호출하기
  async function getUserData() {
    try {
      const res = await Api.get("users/current");
      setUser(res.data);
    } catch (err) {
      errorHandler("사용자 정보 불러오기 오류", err.response.data);
      console.log(err.response.data);
    }
  }

  //user의 로그 정보 호출
  async function getUserLogs() {
    try {
      const res = await Api.get("users/survey/logs");
      const listData = res.data;
      console.log(res.data);

      for (let i = 0; i < listData.length; i++) {
        listData[i]["id"] = i + 1;
        console.log(listData[i]["updatedAt"]);
        console.log(TimeUtil.getTime(listData[i]["updatedAt"]));
        /* let time = TimeUtil.getTime(listData[i]["updatedAt"]).toISOString().split("T")[0]
        listData[i]["updatedAt"] = time;  */
      }

      setSurveyLog(listData);
    } catch (err) {
      errorHandler("사용자 로그 불러오기 오류", err.response.data);
      console.log(err.response.data);
    }
    setIsFetchCompleted(true);
  }

  useEffect(() => {
    getUserData();
    getUserLogs();

    if (!isLoggedin) {
      navigate(ROUTES.LOGIN.link, { replace: true });
    }
  }, []);

  // 로딩될 동안에 기다리는 중 gif 띄워놓기?
  if (!isFetchCompleted) {
    return (
      <div className={Style.loading}>
        <img src={loading} alt="로딩중.." className={Style.loadingImg} />
        <h1 className={Style.loadingText}>데이터 불러오는 중입니다...</h1>
      </div>
    );
  }

  return (
    <Container sx={{ py: 7, mt: 12 }}>
      {console.log("updateUser하면 자동 새로고침?")}
      {/* 회원 프로필 내용 */}
      <Profile
        user={user}
        updateUser={updateUser}
        editOpen={editOpen}
        toggleEditForm={toggleEditForm}
        surveyLog={surveyLog}
      />

      {/* 회원 설정. 정보 */}
      <Typography
        variant="h3"
        component="div"
        sx={{ fontSize: "30px", mt: 6, mb: 2 }}
      >
        <InfoIcon sx={{ mx: 1.2, my: -1, fontSize: "40px", color: "gray" }} />
        회원 정보
      </Typography>

      <ProfileInfo updateUser={updateUser} surveyLog={surveyLog} />
    </Container>
  );
}
export default Mypage;
