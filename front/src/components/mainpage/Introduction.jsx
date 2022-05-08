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
                <p className={Style.introContent1}>2020년 코로나의 영향을 받아 health 지표가 점점 감소하기 시작하였습니다. </p>
                <p className={Style.introContent2}>또한 2021년 방역수칙이 강화됨으로써 socialSupport는 최하를 찍게 되었습니다. 2022년 이후 코로나가 종식되어가면서 모든 수치들이 다시 정상화됨을 알 수 있습니다.</p>
                <p className={Style.introContent3}>우리는 2020년과 2021년을 주목할 필요가 있습니다.2021년 socialSupport와 health가 최하를 기록하였는데 어째서 행복도는 2020년도와 큰 차이가 없을까요?<br/>이는 gdp가 행복에 가장 많은 영향을 끼침을 대변합니다.
</p>      
            </Box>
        </div>
    )
}

export default Introduction
