import { Box } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import style from '../../srcAssets/style/Question.module.css'
import { styled } from '@mui/material/styles';


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
    const currentRate = (currentNum/9)*100
    return (
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
    );
}

export default Progress