import { Container, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import InfoIcon from '@mui/icons-material/Info';
import * as Api from '../../api';
import { UserStateContext } from "../../App"
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import Profile from "./Profile";

function Mypage(){
  const navigate = useNavigate()

  //현재 user상태에서 id를 가져옴 -> loginUserId
  const userState = useContext(UserStateContext)
  const loginUserId = userState.user?._id ?? userState.user?.id
  const [user, setUser] = useState(null)
  const [userLog, setUserlogs] = useState(null)
  const [editOpen, setEditOpen] = useState(false)

  const updateUser = (user) => {
    setUser(user);
  };

  const isLoggedin = sessionStorage.getItem("userToken")
  // const isLoggedin = userState.user?.id

  //loginUserId가 변경될 때마다 user api 호출 다시 하기
  useEffect(() => {
    
    // user정보 호출하기 
    async function getUserData(){
      try{
        const res = await Api.get("users", loginUserId)
        setUser(res.data)
      } catch(err){
        console.log(err)
      }
    }
    getUserData()
    
    //TODO: user의 행복-TI 로그정보 호출하기 (예정!)
    //userlog: {type, happinessScore, freedom, GDP,...}
    /* async function getUserLogs(){
        const res = await Api.get("...")
        setUserlogs(res.data)
    }
    getUserLogs() */

    if(!isLoggedin){
      alert("반가워요! 먼저 로그인을 해주세요!")
      navigate("/login", { replace: true })
    }
  }, [loginUserId])

  return (

    <Container sx={{py: 7, mt: 12}}>
      {/* 회원 프로필 내용 */}
      <Profile user={user} updateUser={updateUser} editOpen={editOpen} setEditOpen={setEditOpen}/>

      {/* 회원 설정. 정보 */}
      <Typography variant="h3" component="div" sx={{fontSize: '30px',mt: 6, mb:2}}>
          <InfoIcon sx={{mx: 1.2, my: -1, fontSize: '40px', color: 'gray'}}/>
          회원 정보
      </Typography>

      <ProfileInfo />
    </Container>

  )

}
export default Mypage