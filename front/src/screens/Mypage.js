import { Box, Button, Container, Grid, IconButton, Paper, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import SettingsIcon from '@mui/icons-material/Settings';
import styled from 'styled-components'
import * as Api from '../api.js'
import { UserStateContext } from "../App"
import defaultImg from '../srcAssets/img/default_img.jpg'
import smile from '../srcAssets/img/smile2.png'

function Mypage(){
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [profileImage, setProfileImage] = useState('')

    const [user, setUser] = useState(null)
    const [userLog, setUserlogs] = useState(null)

    //리덕스나, 리코일, 리듀서로 구현한 현재 user정보에서 id를 가져옴 -> loginUserId
    const userState = useContext(UserStateContext)
    const loginUserId = userState.user?.id

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
            <Box sx={container}>
            <CardBox >
            
                <UpperBox>
                    <IconButton aria-label="setting" size="large">
                        <SettingsIcon fontSize="inherit" sx={settingIcon} />
                    </IconButton>
                    <ImageBox>
                        <Image src={smile}/>
                    </ImageBox>
                </UpperBox>

                <LowerBox>
                <Grid container spacing={2}>
                    <Grid item xs={5} sx={leftBox}>
                        <Typography variant="h3" component="div">
                            Brandon
                            {/* {user.nickname} */}
                            
                        </Typography>
                        <Typography variant="h6" sx={{marginTop: '10px' }} component="div">
                            안녕하세요, 브랜든입니다.
                        </Typography>
                    </Grid>
                    <Grid item xs={7} sx={rightBox}>
                        <Typography variant="h4" sx={{fontSize: '30px', marginTop: '15px'}} gutterBottom component="div">
                            Brandon님의 행복지수는
                            <Button variant="contained" sx={{background: '#6587FF',marginLeft: '15px', verticalAlign: 'top'}}>
                                다시 하러 가기
                            </Button>
                            {/* {user.nickname} */}
                        </Typography>
                        <Typography variant="h2" sx={{marginTop: '100px',textAlign:'center',color: '#FC8694'}} gutterBottom component="div">
                            노르웨이 형
                            {/* {user.userlog.type?} */}
                        </Typography>
                    </Grid>
                    
                </Grid>
                </LowerBox>
                
            </CardBox>
            </Box>
            
        
    )
}
export default Mypage
const container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '150px'
}
const CardBox = styled.div`
    width: 1000px;
    height: 600px;
    border: 1px solid #E4E4E4;
    box-shadow: 7px 7px 3px gray;
`;

const UpperBox = styled.div`
    height: 200px;
    background: #6587FF;
`;

const LowerBox = styled.div`
    height: 400px;
`;

const ImageBox = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    padding: 8px;
    background: white;
    transform: translate(100px, 50px);
`;

const Image = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
`;

const settingIcon = {
    transform: 'translate(930px, 0)',
    fontSize: '1.5em'
}

const leftBox = {
    marginTop: '12em',
    textAlign: 'center'
}

const rightBox = {
    marginTop: '3em'
}

