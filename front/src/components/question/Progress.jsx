import { Alert, Box } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import style from '../../srcAssets/style/Question.module.css'
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height:12,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#8353e6' : '#308fe8',
    },
}));

function Progress({currentNum}) {
  const [cheerupOpen, setCheerupOpen] = useState(false);
  const currentRate = (currentNum/25)*100

  useEffect(() => {
      if(currentNum === 19) {
          setCheerupOpen(true)
      }
      else if(currentNum > 19) {
          setCheerupOpen(false)
      }
      else {
          setCheerupOpen(false)
      }
  }, [currentNum])

  return (
  <>
    {cheerupOpen &&
      <Alert icon={<SentimentSatisfiedAltIcon fontSize="large" />} severity="info" color="info" sx={{fontSize: '1.3rem'}}>
          조금만 더 힘내주세요! 이제 6문항 남았습니다!
      </Alert>}

    <Box className={style.progressBar} >
      <Box sx={{ width: "40%", m: 1 }}>
        <BorderLinearProgress variant="determinate" value={currentRate} />
      </Box>
      <Box sx={{ minWidth: 50 }}>
        <h1 className={style.progressRate}>
            {`${Math.round(currentRate)}%`}
        </h1>
      </Box>
    </Box>
  </>
  );
}

export default Progress