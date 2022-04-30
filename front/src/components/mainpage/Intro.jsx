import { Box, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import style from '../../srcAssets/style/Mainpage.module.css'
import ChartComposed from "./chart/ChartComposed";
import ChartMap from "./chart/ChartMap";
import ChartTreemap from "./chart/ChartTreemap";
import Ranking from "./ranking/Ranking";

function Intro({ activeBtn }) {
    const navigate = useNavigate();

    return (
        <Container sx={{py:10}}>
            {/* happy-ti 간단소개 */}
            <section>
                <h1 class={style.title}>
                    <span class={style.coloring}>H</span>ap<span class={style.coloring}>p</span>iness
                    <span class={style.coloring}>Ti</span> Test
                </h1>

                <Box sx={{my: 10}}>
                    <h2 class={style.subtitle}>
                        <span class={style.coloring}>행복 TI</span> 란?
                    </h2>
                    <p className={style.introContent1}>MBTI 성격 검사를 통해 자신의 성격을 표준화합니다. 그렇다면 자신의 행복을 표준화하는 방법이 없을까요?</p>
                    <p className={style.introContent2}>행복 Ti에서는 kaggle 데이터셋을 활용한 설문조사로 당신의 행복도를 측정하고 같은 행복도를 가진 나라를 알려드리고 시각화된 자료로 보여줍니다.</p>
                    <p className={style.introContent3}>설문지내용을 통해 행복도까지 예측해보세요!</p>

                    <div class={style.chart1}>
                        <ChartComposed active={activeBtn === 1}></ChartComposed>
                    </div>
                </Box>
            </section>

            {/* 대륙별 행복도 트리맵 차트 */}
            <section>
                <Box sx={{my: 10}}>
                    <h2 class={style.subtitle}>
                        Total Continents <span class={style.coloring}>Happiness</span>
                    </h2>
                
                    <div style={{width: '100%', height: '500px'}}>
                        <ChartTreemap active={activeBtn === 2}></ChartTreemap>
                    </div>
                </Box>
            </section>

            {/* 나라별 행복도 지도맵 차트 */}
            <section>
                <Box sx={{my: 10}}>
                    <h2 className={style.subtitle}>
                        Total Countries <span class={style.coloring}>Happiness</span>
                    </h2>

                    <div className={style.country}>
                        <div className={`${activeBtn === 3 ? `${style.chart2}, ${style.active}` : style.chart2}`}>
                            <ChartMap></ChartMap>
                        </div>
                        <div>
                            <Ranking></Ranking>
                        </div>
                    </div>
                </Box>
            </section>

            {/* 설문조사로 이동 버튼 */}
            <Box className={style.guide}>
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