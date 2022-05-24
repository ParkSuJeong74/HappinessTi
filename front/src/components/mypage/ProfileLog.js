import { Button, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../../Route";

function ProfileLog({ user, surveyLog }) {
  const navigate = useNavigate();
  const latestCountry = surveyLog[0];

  return (
    <div>
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
        {latestCountry ? (
          <NationFlag
            src={`https://countryflagsapi.com/png/${latestCountry?.country}`}
          />
        ) : (
          ""
        )}

        <Typography variant="h2" sx={{ color: "#FC8694" }} component="span">
          {latestCountry
            ? `${latestCountry?.country} 형`
            : "설문조사를 해주세요"}
        </Typography>
      </Stack>
    </div>
  );
}
export default ProfileLog;

const NationFlag = styled.img`
  width: 100px;
  margin-right: 20px;
`;
