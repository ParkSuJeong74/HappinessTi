import bgGradientImg from "../../srcAssets/img/team/bg_gradient.png";
import teamSJ from "../../srcAssets/img/team/teamSJ.png";
import teamJS from "../../srcAssets/img/team/teamJS.png";
import teamJM from "../../srcAssets/img/team/teamJM.png";
import teamDH from "../../srcAssets/img/team/teamDH.png";
import teamKJ from "../../srcAssets/img/team/teamKJ.png";
import teamJA from "../../srcAssets/img/team/teamJA.png";
import Styled from "styled-components";
import GitHubIcon from '@mui/icons-material/GitHub';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import { Grid, Container, Box, Typography } from "@mui/material";
import VanillaTilt from "vanilla-tilt";
import React, { useEffect, useRef } from "react";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 300,
    border: '1px solid #dadde9',
  },
}));

function Tilt({ options, ...rest }) {
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
}

function Team() {
  const options = {
    scale: 1.1,
    speed: 1000,
    max: 10,
  };

  return (
    <BgImage>
      <Container sx={TeamContainer}>
        <Box sx={TeamPageGuide}>
          <Title>
            Crashing Devs
          </Title>
          <SubTitle>
            행복Ti를 개발한 저희 개발뽀개기 팀을 소개합니다!
          </SubTitle>
        </Box>

        <Box sx={TeamIntroduction}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item md={4} xs={6} sx={{ marginBottom: 8 }}>
              <Tilt options={options}>
                <HtmlTooltip
                  placement="top"
                  title={
                    <>
                      <Typography component="h1" sx={introduceMyself}>안녕하세요, 박지수입니다!</Typography>
                      <Typography component="div" sx={contactMe}>
                        <GitHubIcon onClick={() => 
                          window.open("https://github.com/knowbaesu")}/>
                      </Typography>
                    </>
                  }
                >
                  <Card>
                    <MemberImg src={teamJS} alt="지수님" />
                    <MemberDes1>
                      박지수
                    </MemberDes1>
                    <MemberDes2>역할: 백엔드</MemberDes2>
                  </Card>
                </HtmlTooltip>
              </Tilt>
            </Grid>

            <Grid item md={4} xs={6}>
              <Tilt options={options}>
                <HtmlTooltip
                  placement="top"
                  title={
                    <>
                      <Typography component="h1" sx={introduceMyself}>안녕하세요, 박수정입니다!</Typography>
                      <Typography component="div" sx={contactMe}>
                        <GitHubIcon onClick={() => 
                          window.open("https://github.com/ParkSuJeong74")}/>
                      </Typography>
                    </>
                  }
                >
                  <Card>
                    <MemberImg src={teamSJ} alt="수정님" />
                    <MemberDes1>박수정</MemberDes1>
                    <MemberDes2>역할: 팀장, 백엔드</MemberDes2>
                  </Card>
                </HtmlTooltip>
              </Tilt>
            </Grid>

            <Grid item md={4} xs={6}>
              <Tilt options={options}>
                <HtmlTooltip
                  placement="top"
                  title={
                    <>
                      <Typography component="h1" sx={introduceMyself}>안녕하세요, 김광재입니다!</Typography>
                      <Typography component="div" sx={contactMe}>
                        <GitHubIcon onClick={() => 
                          window.open("https://github.com/LoadWithWater")}/>
                      </Typography>
                    </>
                  }
                >
                  <Card>
                    <MemberImg src={teamKJ} alt="광재님" />
                    <MemberDes1>김광재</MemberDes1>
                    <MemberDes2>역할: 프론트엔드</MemberDes2>
                  </Card>
                </HtmlTooltip>
              </Tilt>
            </Grid>
            <Grid item md={4} xs={6}>
              <Tilt options={options}>
                <HtmlTooltip
                  placement="top"
                  title={
                    <>
                      <Typography component="h1" sx={introduceMyself}>안녕하세요, 김다현입니다!</Typography>
                      <Typography component="div" sx={contactMe}>
                        <GitHubIcon onClick={() => 
                          window.open("https://github.com/kimdahyeon977/kimdahyeon")}/>
                      </Typography>
                    </>
                  }
                >
                  <Card>
                    <MemberImg src={teamDH} alt="다현님" />
                    <MemberDes1>김다현</MemberDes1>
                    <MemberDes2>역할: 백엔드, 데이터분석</MemberDes2>
                  </Card>
                </HtmlTooltip>
              </Tilt>
            </Grid>
            <Grid item md={4} xs={6}>
              <Tilt options={options}>
                <HtmlTooltip
                  placement="top"
                  title={
                    <>
                      <Typography component="h1" sx={introduceMyself}>안녕하세요, 박정미입니다!</Typography>
                      <Typography component="div" sx={contactMe}>
                        <GitHubIcon onClick={() => 
                          window.open("https://github.com/Jeong-mi")}/>
                      </Typography>
                    </>
                  }
                >
                  <Card>
                    <MemberImg src={teamJM} alt="정미님" />
                    <MemberDes1>박정미</MemberDes1>
                    <MemberDes2>역할: 프론트엔드</MemberDes2>
                  </Card>
                </HtmlTooltip>
              </Tilt>
            </Grid>
            <Grid item md={4} xs={6}>
              <Tilt options={options}>
                <HtmlTooltip
                  placement="top"
                  title={
                    <>
                      <Typography component="h1" sx={introduceMyself}>안녕하세요, 이주안입니다!</Typography>
                      <Typography component="div" sx={contactMe}>
                        <GitHubIcon onClick={() => 
                          window.open("")}/>
                      </Typography>
                    </>
                  }
                >
                  <Card>
                    <MemberImg src={teamJA} alt="주안님" />
                    <MemberDes1>이주안</MemberDes1>
                    <MemberDes2>역할: 백엔드, 데이터분석</MemberDes2>
                  </Card>
                </HtmlTooltip>
              </Tilt>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </BgImage>
  );
}
export default Team;

const BgImage = Styled.div`
  background-image: url(${bgGradientImg});
  background-repeat: "repeat-x";
`;
const TeamContainer = {
  padding: "6rem 0",
};
const TeamPageGuide = {
  padding: "2em",
  textAlign: "center",
  marginBottom: "3em",
};

const Title = Styled.h1`
  margin: 1em 0 0.5em 0;
  font-size: 3rem;
  font-weight: bolder;
`;

const SubTitle = Styled.h3`
  font-size: 1.5rem;
  font-weight: 300;
`

const TeamIntroduction = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const introduceMyself = {
  fontSize: '1rem',
  fontWeight: 'bolder'
}

const contactMe = {
  fontSize: '1.5rem',
  textAlign: 'center',
  cursor: 'pointer'
}

const Card = Styled.div`
  width: 80%;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const MemberImg = Styled.img`
  width: 100%;
  height: 300px;
  border-radius: 15px;
  &:hover: {
    background-color: white;
  }
`;

const MemberDes1 = Styled.h2`
  font-size: 40px;
  font-weight: 600;
  margin-top: 20px;
`;
const MemberDes2 = Styled.p`
  font-size: 18px;
  margin: 10px auto;
`;
