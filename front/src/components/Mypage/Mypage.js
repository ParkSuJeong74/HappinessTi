import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

import * as Api from "../../api";
import {ROUTES} from '../../Route'
import ProfileInfo from "./ProfileInfo";
import Profile from "./Profile";

function Mypage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [surveyLog, setSurveyLog] = useState([]);
  const [editOpen, setEditOpen] = useState(false);

  const toggleEditForm = () => {
    setEditOpen((prev) => !prev)
  }

  const updateUser = (user) => {
    setUser(user);
  };

  const isLoggedin = sessionStorage.getItem("userToken");

  // user정보 호출하기
  async function getUserData() {
    try {
      const res = await Api.get("users/current");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  //user의 로그 정보 호출
  async function getUserLogs() {
    try {
      const res = await Api.get("users/survey/logs");
      const listData = res.data;

      for(let i=0; i< listData.length; i++){
        listData[i]['id'] = i+1;
        let time = listData[i]['updatedAt'].split("T")[0]
        listData[i]['updatedAt'] = time
      }

      setSurveyLog(listData)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    
    getUserData();
    getUserLogs()

    if (!isLoggedin) {
      alert("반가워요! 먼저 로그인을 해주세요!");
      navigate(ROUTES.LOGIN.link, { replace: true });
    }
  }, []);

  return (
    <Container sx={{ py: 7, mt: 12 }}>
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

      <ProfileInfo updateUser={updateUser} surveyLog={surveyLog}/>
    </Container>
  );
}
export default Mypage;
