import Style from '../../srcAssets/style/Mainpage.module.css'
import { Box, Typography } from '@mui/material';
import ChartComposed from './chart/ChartComposed';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {CustomTooltip} from './CustomTooltip.js';


function Introduction({activeBtn}){

    return (
        <div className="section">
            <h1 class={Style.title}>
                <span class={Style.coloring}>H</span>ap<span class={Style.coloring}>p</span>iness
                <span class={Style.coloring}>Ti</span> Test
            </h1>

            <Box sx={{my: 10}}>
                <h2 class={Style.subtitle}>
                    <span class={Style.coloring}>행복 TI</span> 란?
                    <CustomTooltip 
                        placement="right"
                        title={
                            <Typography component="h1" sx={{ whiteSpace: 'pre-line'}}>
                                행복 Ti는 기대수명, GDP, 자유, 부패 인식, 관용, 총 5가지 지표를 이용한 <br/>설문조사를 기반으로 당신의 행복도를 조사하고,
                                <br/> 
                                세계행복보고서에서 수립된 지표로 만들어진 kaggle 데이터를 활용하여 <br/>총 100여 개의 나라와 당신의 행복도를 비교해줍니다.
                                <br/>
                            </Typography>
                        }
                    >
                        <HelpOutlineIcon sx={{ml: 1,fontSize: '0.6em',color:"gray"}}/>
                    </CustomTooltip>
                </h2>
                <div class={Style.chartComposed}>
                    <ChartComposed active={activeBtn === 1}></ChartComposed>
                    <div className={Style.resource}>(from. 세계 행복 보고서)</div>
                </div>
                <p className={Style.introContent1}>2022년 세계행복보고서에 따르면, 삶에 대한 평가는 시간이 흐를수록 단계적으로 변화합니다. </p>
                <p className={Style.introContent2}>기대 수명의 점진적인 증가는 서구인의 삶에 대한 평가와 동유럽의 격차를 줄였고, GDP의 변화는 전체적인 생활 평가에 변화를 주었습니다.</p>
                <p className={Style.introContent3}>행복이라는 것은 삶에 대한 평가로부터 기인하며, 여러 감정적인 요인에 따라 달라집니다.<br/> 모든 국가는 매년 행복도에 대한 설문조사를 실시하고 95%의 신뢰구간을 가지고 있습니다.</p>      
            </Box>
        </div>
    )
}

export default Introduction