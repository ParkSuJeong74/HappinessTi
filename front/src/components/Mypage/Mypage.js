import { Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import Profile from "./Profile";

function Mypage() {
  const navigate = useNavigate();

  //리덕스나, 리코일, 리듀서로 구현한 현재 user정보에서 id를 가져옴 -> loginUserId
  const userState = useContext(UserStateContext);
  const loginUserId = userState.user?.id;
  const [user, setUser] = useState(null);
  const [userLog, setUserlogs] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  //loginUserId가 변경될 때마다 user api 호출 다시 하기
  useEffect(() => {
    //TODO: user정보 호출하기 (login_required)
    async function getUserData() {
      try {
        const res = await Api.get("users", loginUserId);
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUserData();

    //TODO: user의 행복-TI 로그정보 호출하기 (예정!)
    //userlog: {type, happinessScore, freedom, GDP,...}
    /* async function getUserLogs(){
        const res = await Api.get("...")
        setUserlogs(res.data)
    }
    getUserLogs() */

    if (!userState.user) {
      navigate("/login", { replace: true });
    }
    /* alert("반갑습니다! 로그인해주실래요?") */
  }, [navigate, loginUserId]);

  return (
    <Container sx={{ py: 7, mt: 12 }}>
      <Profile
        user={user}
        setUser={setUser}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />

      <Typography
        variant="h3"
        component="div"
        sx={{ fontSize: "30px", mt: 6, mb: 2 }}
      >
        <InfoIcon sx={{ mx: 1.2, my: -1, fontSize: "40px", color: "gray" }} />
        회원 정보
      </Typography>

      <ProfileInfo />
    </Container>
  );
}
export default Mypage;
