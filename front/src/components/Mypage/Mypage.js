import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { ROUTES } from "../../Route";
=======

import * as Api from "../../api";
import {ROUTES} from '../../Route'
>>>>>>> c7e5a834c5911d57d0efb6ead6d486576688c50b
import ProfileInfo from "./ProfileInfo";
import Profile from "./Profile";

function Mypage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userLog, setUserlog] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const toggleEditForm = () => {
    setEditOpen((prev) => !prev)
  }

  const updateUser = (user) => {
    setUser(user);
  };

  const isLoggedin = sessionStorage.getItem("userToken");

<<<<<<< HEAD
  //loginUserId가 변경될 때마다 user api 호출 다시 하기
  useEffect(() => {
    // user정보 호출하기
    async function getUserData() {
      try {
        const res = await Api.get("users/current");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
=======
  // user정보 호출하기
  async function getUserData() {
    try {
      const res = await Api.get("users");
      console.log(res.data)
      setUser(res.data);
    } catch (err) {
      console.log(err);
>>>>>>> c7e5a834c5911d57d0efb6ead6d486576688c50b
    }
  }

  useEffect(() => {
    
    getUserData();

    //TODO: user의 행복-TI 로그정보 호출하기 (예정!)
    //userlog: {type, happinessScore, freedom, GDP,...}
    /* async function getUserLogs(){
        const res = await Api.get("...")
        setUserlogs(res.data)
    }
    getUserLogs() */

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

      <ProfileInfo updateUser={updateUser} />
    </Container>
  );
}
export default Mypage;
