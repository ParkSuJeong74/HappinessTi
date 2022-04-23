import { Box, Button, Container, Grid, IconButton, Paper, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import * as Api from '../api';
import { UserStateContext } from "../App"
import smile from '../srcAssets/img/smile2.png'
import { useNavigate } from "react-router-dom";
import ProfileEdit from "../components/Mypage/ProfileEdit";
import norway from '../srcAssets/img/norway.png'
import ProfileInfo from "../components/Mypage/ProfileInfo";


function Mypage(){
    const navigate = useNavigate()

    //리덕스나, 리코일, 리듀서로 구현한 현재 user정보에서 id를 가져옴 -> loginUserId
    const userState = useContext(UserStateContext)
    const loginUserId = userState.user?.id

    const [user, setUser] = useState(null)
    const [userLog, setUserlogs] = useState(null)
    const [editOpen, setEditOpen] = useState(false)

    //loginUserId가 변경될 때마다 user api 호출 다시 하기
    useEffect(() => {
        //TODO: user정보 호출하기 
        //{id, name, description, userlog}
        //userlog: {type, happinessScore, freedom, GDP,...}
        async function getUserInfo(){
            const res = await Api.get("users", loginUserId)
            setUser(res.data)
        }
        async function getUserLogs(){
            const res = await Api.get("...")
            setUserlogs(res.data)
        }
        getUserInfo()
        getUserLogs()
        
    }, [])

    return (
        <>
        <Container sx={{py: 7}}>
            <CardBox>
                <UpperBox>
                    {/* 컴포넌트로 바꿔야함 */}
                    <IconButton onClick={() => setEditOpen((prev) => !prev)} sx={{transform: 'translate(865px, 0)'}} size="large">
                        <EditIcon fontSize="inherit" sx={{fontSize: '1.2em'}}/>
                    </IconButton>
                    
                    {/* 프로필 편집폼이 열리면 이미지 안보이게 함 */}
                    {!editOpen && (
                        <ImageBox>
                            <ProfileImage src={smile}/>
                        </ImageBox>
                    )}
                    
                </UpperBox>

                <LowerBox>
                    <Grid container spacing={1}>

                        {editOpen ? (
                            <ProfileEdit setEditOpen={setEditOpen}/>
                        ) : (
                            <Grid item xs={5} sx={{textAlign: 'center', marginTop: '9em'}}>
                                <Typography variant="h3" component="div">
                                    Brandon
                                    {/* {user.nickname} */}
                                </Typography>

                                <Typography variant="h6" sx={{marginTop: '10px' }} component="div">
                                    안녕하세요, 브랜든입니다.
                                </Typography>
                            </Grid>
                        )}
                        

                        <Grid item xs={7} sx={{marginTop: '3em'}}>
                            <Typography variant="h5" sx={{fontSize: '30px', textAlign: 'center'}} component="div">
                                Brandon님의 행복지수는
                                <Button variant="contained" sx={{background: '#6587FF',marginLeft: '15px', verticalAlign: 'top'}}>
                                    다시 하러 가기
                                </Button>
                                {/* {user.nickname} */}
                            </Typography>

                            <Stack direction="row" sx={{ mt:9, justifyContent: "center" }}>
                                <NationFlag src={norway}/>

                                <Typography variant="h2" sx={{color: '#FC8694'}} component="span">
                                    노르웨이 형
                                    {/* {userlog.type?} */}
                                </Typography>
                            </Stack>
                            
                        </Grid>
                        
                    </Grid>
                </LowerBox>                
            </CardBox>

            <Typography variant="h3" component="div" sx={{fontSize: '35px',mt: 4, mb:1}}>
                회원 정보
            </Typography>
            <ProfileInfo />
        </Container>
        </>
    )
}
export default Mypage

const CardBox = styled.div`
    margin: 0 auto;
    width: 80%;
    height: 470px;
    border: 1px solid #E4E4E4;
`;

const UpperBox = styled.div`
    height: 150px;
    background: #6587FF;
`;

const LowerBox = styled.div`
    height: 300px;
`;

const ImageBox = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    padding: 8px;
    background: white;
    transform: translate(100px, -10px);
`;

const ProfileImage = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
`; 

const NationFlag = styled.img`
    width: 100px;
    margin-right: 20px;
`;

