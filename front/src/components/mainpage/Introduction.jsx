import Style from '../../srcAssets/style/Mainpage.module.css'
import { Box } from '@mui/material';
import ChartComposed from './chart/ChartComposed';


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
                </h2>
                <div class={Style.chartComposed}>
                    <ChartComposed active={activeBtn === 1}></ChartComposed>
                </div>
                <p className={Style.introContent1}>2022년 세계행복보고서에 따르면, 삶에 대한 평가는 시간이 흐를수록 단계적으로 변화합니다. </p>
                <p className={Style.introContent2}>기대 수명의 점진적인 증가는 서구인의 삶에 대한 평가와 동유럽의 격차를 줄였고, GDP의 변화는 전체적인 생활 평가에 변화를 주었습니다.</p>
                <p className={Style.introContent3}>행복이라는 것은 삶에 대한 평가로부터 기인하며, 여러 감정적인 요인에 따라 달라집니다.<br/> 모든 국가는 매년 행복도에 대한 설문조사를 실시하고 95%의 신뢰구간을 가지고 있습니다.</p>      
            </Box>
        </div>
    )
}

export default Introduction