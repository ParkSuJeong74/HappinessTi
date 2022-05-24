import { Grid, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import ProfileEdit from "./ProfileEdit.js";
import Style from "../../srcAssets/style/Mypage.module.css";
import ProfileLog from "./ProfileLog.js";
import ProfileCard from "./ProfileCard.js";

function Profile({ editOpen, toggleEditForm, user, updateUser, surveyLog }) {
  return (
    <CardBox>
      <UpperBox />

      <Grid container>
        <Grid
          item
          xs={5}
          sx={{
            marginTop: "-110px",
            textAlign: "center",
          }}
        >
          {editOpen ? (
            <ProfileEdit
              user={user}
              toggleEditForm={toggleEditForm}
              updateUser={updateUser}
            />
          ) : (
            <ProfileCard user={user} toggleEditForm={toggleEditForm} />
          )}
        </Grid>

        <Grid item xs={7} sx={{ marginTop: "4.5em" }}>
          <ProfileLog user={user} surveyLog={surveyLog} />
        </Grid>
      </Grid>
    </CardBox>
  );
}

export default Profile;

const CardBox = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 500px;
  border: 1px solid #e4e4e4;
  border-radius: 40px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  font-family: "Elice Digital Baeum", sans-serif;
`;

const UpperBox = styled.div`
  height: 150px;
  background: #6587ff;
`;
