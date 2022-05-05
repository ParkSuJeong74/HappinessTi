import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Style from '../../srcAssets/style/Analysis.module.css'
import * as Api from '../../api'
import RadialChart from "../chart/RadialChart"

// 로그인한 user만 분석 페이지 볼 수 있음!
function Analysis(){
    const {nation} = useParams()
    const [similarCountries, setSimilarCountries] = useState([])

    async function getSimilarData() {
        try {
          const res = await Api.get(`result/${nation}/similar`);
          console.log(res.data)
          console.log(res.data.similarCounrtries)
          setSimilarCountries(res.data.similarCounrtries)
        } catch (err) {
          console.log(err);
        }
      }
    

    useEffect(() => {
        getSimilarData()
    }, [])

    console.log(nation)

    return (
        <Container sx={analysisPage}>
            <div className={Style.divider}/>

            {/* 추천한 나라의 분석 결과 */}
            <h1 className={Style.title}>
                <span className={Style.coloring}>{nation}</span>형 분석 결과
            </h1>

            <div className={Style.analysisBox}>

                <RadialChart nation={nation} ></RadialChart>

                <p className={Style.analysisInfo}>
                    상위 <span className={Style.coloring}>20%</span>의 자유 점수를 갖고 있습니다.
                </p>
                <p className={Style.analysisInfo}>
                    상위 <span className={Style.coloring}>20%</span>의 경제 점수를 갖고 있습니다.
                </p>
            </div>

            <div className={Style.divider}/>

            {/* 추천한 나라와 비슷한 행복도를 가진 나라들 */}
            <div className={Style.title}>
                행복도가 비슷한 나라는?
            </div>

            <div className={Style.similarBox}>
                <div className={Style.nationBox}>
                    {similarCountries.map((item) => (
                        <div className={Style.nations}>
                            <img className={Style.flag} src={`https://countryflagsapi.com/png/${item}`} alt="나라별 국기"/>
                            <h1 className={Style.nation}>{item}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}
export default Analysis

const analysisPage = {
    py: 7, mt: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

