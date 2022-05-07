import { Button, Grid, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import ProfileEdit from "./ProfileEdit.js";
import Style from '../../srcAssets/style/Mypage.module.css'
import { useNavigate } from 'react-router-dom';
import {ROUTES} from '../../Route'

function Profile({ editOpen, toggleEditForm, user, updateUser, surveyLog }) {
  const navigate = useNavigate()
  const latestCountry = surveyLog[0]
  
  return (
    <CardBox>
      <UpperBox>
        
        {/* 프로필 편집폼이 열리면 이미지 안보이게 함 */}
        {!editOpen && (
          <div className={Style.imageBox} onClick={() => toggleEditForm()}>
            <img src={`https://storage.googleapis.com/crashingdevstorage14/ProfileImg/${user?.profileImgUrl}`} className={Style.profileImg} alt="프로필 이미지"/>
            <span className={Style.editButton}>편집하기</span>
          </div>
        )}
      </UpperBox>

      <LowerBox>
        <Grid container spacing={1}>
          {editOpen ? (
            <ProfileEdit
              updateUser={updateUser}
              user={user}
              toggleEditForm={toggleEditForm}
            />
          ) : (
            <Grid item xs={5} sx={{ textAlign: "center", marginTop: "9em" }}>
              <Typography variant="h3" component="div">
                {user?.nickname}
              </Typography>

              <Typography
                variant="h6"
                sx={{ marginTop: "20px" }}
                component="div"
              >
                {user?.description === "None"
                  ? "설명이 아직 없습니다. 추가해 주세요."
                  : user?.description}
              </Typography>
            </Grid>
          )}

          <Grid item xs={7} sx={{ marginTop: "3em" }}>
            <Typography
              variant="h5"
              sx={{ fontSize: "30px", textAlign: "center" }}
              component="div"
            >
              {user?.nickname}님의 행복지수는
              <Button
                variant="contained"
                sx={{
                  background: "#6587FF",
                  marginLeft: "15px",
                  verticalAlign: "top",
                }}
                onClick={() => navigate(ROUTES.QUESTION.link)}
              >
                다시 하러 가기
              </Button>
            </Typography>

            <Stack direction="row" sx={{ mt: 9, justifyContent: "center" }}>
              <NationFlag src={`https://countryflagsapi.com/png/${latestCountry?.country}`} />

              <Typography
                variant="h2"
                sx={{ color: "#FC8694" }}
                component="span"
              >
                {latestCountry?.country} 형
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </LowerBox>
    </CardBox>
  );
}
export default Profile;

const CardBox = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 470px;
  border: 1px solid #e4e4e4;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  font-family: "Elice Digital Baeum", sans-serif;
`;

const UpperBox = styled.div`
  height: 150px;
  background: #6587ff;
  possition: relative;
`;

const LowerBox = styled.div`
  height: 300px;
`;

const NationFlag = styled.img`
  width: 100px;
  margin-right: 20px;
  
`;
