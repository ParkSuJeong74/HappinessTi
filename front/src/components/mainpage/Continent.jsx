import { Box } from "@mui/material";
import Style from '../../srcAssets/style/Mainpage.module.css'
import ChartTreemap from "./chart/ChartTreemap";


function Continent({activeBtn}) {
    return (
        <div className="section">
            <Box sx={{my: 10}}>
                <h2 class={Style.subtitle}>
                    Total Continents <span class={Style.coloring}>Happiness</span>
                </h2>
            
                <div className={Style.treemap}>
                    <div className={Style.resource}>(대륙별 행복도)</div>
                    <ChartTreemap active={activeBtn === 2}></ChartTreemap>
                </div>

                <p className={Style.introContent1}> 또한 행복에 대한 척도와 기준은 대륙마다 뚜렷한 지역적인 차이를 가지고 있습니다. 각 대륙의 특수한 문화 속에서 겪는 삶의 경험과 공유하는 감정에 따라 달라지니까요. 그 패턴은 유사성 또한 가지고 있습니다. </p>
                <br/>
                <p className={Style.introContent1}> 대표적인 것이 바로 스트레스입니다. 특히 삶에 대한 자유의식을 갖게 된다거나 사회의 부패를 인지하는 경향, 친사회적인 행위 등이 한 나라에서 공유되는 스트레스에 영향을 미칩니다. 그 외에도 복지의 불평등 등이 있을 수 있습니다.</p>
            </Box>
        </div>
    )
}

export default Continent