import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import style1 from '../../srcAssets/style/Analysis.module.css'
import * as Api from '../../api'
import RadialChart from "../chart/RadialChart"

function Analysis(){
    const {country} = useParams()
    const [similarCountries, setSimilarCountries] = useState([])

    async function getSimilarData() {
        try {
          const res = await Api.get("result/Norway/similar");
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

    console.log(country)

    return (
        <Container sx={analysisPage}>
            <h1>{country}</h1>
            <div className={style1.title}>
                <h1><span className={style1.coloring}>노르웨이</span>형 분석 결과</h1>
            </div>

            <div className={style1.resultBox}>
                <RadialChart></RadialChart>

                <div className={style1.resultInfoBox}>
                    <p className={style1.resultInfo}>
                        상위 <span className={style1.coloring}>20%</span>의 자유 점수를 갖고 있습니다.
                    </p>
                    <p className={style1.resultInfo}>
                        상위 <span className={style1.coloring}>20%</span>의 경제 점수를 갖고 있습니다.
                    </p>
                </div>
            </div>

            <div className={style1.title}>
                <h1>행복도가 비슷한 나라는?</h1>
            </div>

            <div className={style1.similarBox}>
                <div className={style1.countriesBox}>
                    {similarCountries.map((item) => (
                        <div className={style1.resultInfoBox4}>
                            <img className={style1.flag} src={`https://countryflagsapi.com/png/${item}`} alt="나라별 국기"/>
                            <h1 className={style1.nation}>{item}</h1>
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

