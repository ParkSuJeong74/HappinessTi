import { Box, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Treemap } from "recharts";
import mainpage from '../../srcAssets/style/Mainpage.module.css'
import Chart from "./Chart";
import ChartMap from "./ChartMap";
import ChartTreemap from "./ChartTreemap";

function Intro() {
    const navigate = useNavigate();

    return (
        <Container sx={{py:10}}>
            <h1 class={mainpage.title}>
                <span class={mainpage.coloring}>H</span>ap<span class={mainpage.coloring}>p</span>iness
                <span class={mainpage.coloring}>Ti</span> Test
            </h1>

            <Box sx={{my: 10}}>
                <h2 class={mainpage.subtitle}>
                    <span class={mainpage.coloring}>행복 TI</span> 란?
                </h2>
                <p className={mainpage.introContent1}>MBTI 성격 검사를 통해 자신의 성격을 표준화합니다. 그렇다면 자신의 행복을 표준화하는 방법이 없을까요?</p>
                <p className={mainpage.introContent2}>행복 Ti에서는 kaggle 데이터셋을 활용한 설문조사로 당신의 행복도를 측정하고 같은 행복도를 가진 나라를 알려드리고 시각화된 자료로 보여줍니다.</p>
                <p className={mainpage.introContent3}>설문지내용을 통해 행복도까지 예측해보세요!</p>

                <div class={mainpage.chart1}>
                    <Chart></Chart>
                </div>
            </Box>

            <Box sx={{my: 10}}>
                <h2 class={mainpage.subtitle}>
                    Total Countries <span class={mainpage.coloring}>Happiness</span>
                </h2>
            
                <div style={{width: '730px', height: '250px'}}>
                    <ChartTreemap></ChartTreemap>
                </div>
            </Box>

            <Box sx={{my: 10}}>
                <h2 class={mainpage.subtitle}>
                    Total Countries <span class={mainpage.coloring}>Happiness</span>
                </h2>
            
                <div class={mainpage.chart2}>
                    <ChartMap></ChartMap>
                </div>
            </Box>

            <Box className={mainpage.guide}>
                <h1>지금 당신과 같은 행복을 가지고 있는 사람들이 궁금하신가요?</h1>
                <input  
                    type="checkbox"
                    onChange={(e) => e.target.checked ? navigate("/question") : ''}
                />
            </Box>
        </Container>
        
    )
}
export default Intro