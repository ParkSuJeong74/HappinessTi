import { Box, Container } from "@mui/material"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import {ROUTES} from '../../Route'
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
                    <div class={style.chart1}>
                        <ChartComposed active={activeBtn === 1}></ChartComposed>
                    </div>
                    <p className={style.introContent1}>2022년 세계행복보고서에 따르면, 삶에 대한 평가는 시간이 흐를수록 단계적으로 변화합니다. </p>
                    <p className={style.introContent2}>기대 수명의 점진적인 증가는 서구인의 삶에 대한 평가와 동유럽의 격차를 줄였고, GDP의 변화는 전체적인 생활 평가에 변화를 주었습니다.</p>
                    <p className={style.introContent3}>행복이라는 것은 삶에 대한 평가로부터 기인하며, 여러 감정적인 요인에 따라 달라집니다.<br/> 모든 국가는 매년 행복도에 대한 설문조사를 실시하고 95%의 신뢰구간을 가지고 있습니다.</p>      
                </Box>
            </section>

            {/* 대륙별 행복도 트리맵 차트 */}
            <section>
                <Box sx={{my: 10}}>
                    <h2 class={style.subtitle}>
                        Total Continents <span class={style.coloring}>Happiness</span>
                    </h2>
                
                    <div style={{width: '90%', height: '500px', marginBottom : '50px'}}>
                        <ChartTreemap active={activeBtn === 2}></ChartTreemap>
                    </div>
                    <p className={style.introContent1}> 또한 행복에 대한 척도와 기준은 대륙마다 뚜렷한 지역적인 차이를 가지고 있습니다. 각 대륙의 특수한 문화 속에서 겪는 삶의 경험과 공유하는 감정에 따라 달라지니까요. 그 패턴은 유사성 또한 가지고 있습니다. </p>
                    <br/>
                    <p className={style.introContent1}> 대표적인 것이 바로 스트레스입니다. 특히 삶에 대한 자유의식을 갖게 된다거나 사회의 부패를 인지하는 경향, 친사회적인 행위 등이 한 나라에서 공유되는 스트레스에 영향을 미칩니다. 그 외에도 복지의 불평등 등이 있을 수 있습니다.</p>
                </Box>
            </section>

            {/* 나라별 행복도 지도맵 차트 & 랭킹 */}
            <section>
                <Box sx={{my: 10}}>
                    <h2 className={style.subtitle}>
                        Total Countries <span class={style.coloring}>Happiness</span>
                    </h2>

                    <div className={style.country}>
                        <div className={`${activeBtn === 3 ? `${style.chart2} ${style.active}` : style.chart2}`}>
                            <ChartMap></ChartMap>
                        </div>
                        <div className={style.ranking}>
                            <Ranking></Ranking>
                        </div>
                    </div>
                    <p className={style.introContent1}>행복 Ti는 기대수명, GDP, 자유, 부패 인식, 관용, 총 5가지 지표를 이용한 설문조사를 기반으로 당신의 행복도를 조사하고, 세계행복보고서에서 수립된 지표로 만들어진 kaggle 데이터를 활용하여 총 100여 개의 나라와 당신의 행복도를 비교해줍니다. <br/>또한 당신이 속해있는 나라의 현재와 비교해 당신이 미래에 행복해질 가능성을 보여줍니다.</p>
                </Box>
            </section>

            {/* 설문조사로 이동 버튼 */}
            <Box className={style.guide}>
                <h1>지금 당신과 같은 행복을 가지고 있는 사람들이 궁금하신가요?</h1>
                <Link to={ROUTES.QUESTION.link}>
                    <span>나의 행복도 찾기 Go!</span>
                </Link> 
            </Box>
        </Container>
        
    )
}
export default Intro