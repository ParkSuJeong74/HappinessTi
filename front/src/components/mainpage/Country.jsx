import { Box } from "@mui/material";
import Style from '../../srcAssets/style/Mainpage.module.css'
import ChartMap from "./chart/ChartMap";
import Ranking from "./ranking/Ranking";

function Country({activeBtn}){
    return (
        <div className="section">
            <Box sx={{my: 10}}>
                <h2 className={Style.subtitle}>
                    Total Countries <span class={Style.coloring}>Happiness</span>
                </h2>

                <div className={Style.country}>
                    <div className={`${activeBtn === 3 ? `${Style.chartMap} ${Style.active}` : Style.chartMap}`}>
                        <ChartMap></ChartMap>
                    </div>
                    <div className={Style.ranking}>
                        <Ranking></Ranking>
                    </div>
                </div>
                <p className={Style.introContent1}>행복 Ti는 기대수명, GDP, 자유, 부패 인식, 관용, 총 5가지 지표를 이용한 설문조사를 기반으로 당신의 행복도를 조사하고, </p>
                <br/>
                <p className={Style.introContent1}>세계행복보고서에서 수립된 지표로 만들어진 kaggle 데이터를 활용하여 총 100여 개의 나라와 당신의 행복도를 비교해줍니다. </p>
                <br/>
                <p className={Style.introContent1}>또한 전세계에서 당신의 행복도가 높은지 낮은지 확인하고 비슷한 행복도를 가진 나라의 리스트를 볼 수 있습니다. </p>
            </Box>
        </div>
    )
}

export default Country
