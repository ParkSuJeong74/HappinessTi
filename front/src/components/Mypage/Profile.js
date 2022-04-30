import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";

import ProfileEdit from "./ProfileEdit.js";
import norway from "../../srcAssets/img/norway.png";

function Profile({ editOpen, setEditOpen, user, setUser }) {
  console.log(user);
  return (
    <CardBox>
      <UpperBox>
        <IconButton
          onClick={() => setEditOpen((prev) => !prev)}
          sx={{ transform: "translate(865px, 0)" }}
          size="large"
        >
          <EditIcon
            fontSize="inherit"
            sx={{ fontSize: "1.2em", color: "#eee" }}
          />
        </IconButton>

        {/* 프로필 편집폼이 열리면 이미지 안보이게 함 */}
        {!editOpen && (
          <ImageBox>
            <ProfileImage
              src={`https://storage.googleapis.com/crashingdevstorage/ProfileImg/${user?.profileImgUrl}`}
            />
          </ImageBox>
        )}
      </UpperBox>

      <LowerBox>
        <Grid container spacing={1}>
          {editOpen ? (
            <ProfileEdit
              setUser={setUser}
              user={user}
              setEditOpen={setEditOpen}
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
                {user?.description}
                {/* {user?.description!=="" ? user?.description :"설명이 아직 없습니다. 추가해 주세요."} */}
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
              >
                다시 하러 가기
              </Button>
            </Typography>

            <Stack direction="row" sx={{ mt: 9, justifyContent: "center" }}>
              <NationFlag src={norway} />

              <Typography
                variant="h2"
                sx={{ color: "#FC8694" }}
                component="span"
              >
                노르웨이 형{/* {userlog.type?} */}
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
  transform: translate(85px, 0px);
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
