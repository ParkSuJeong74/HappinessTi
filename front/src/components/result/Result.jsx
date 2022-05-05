import { Container } from "@mui/material"
import Style from '../../srcAssets/style/Result.module.css'
import { useRecoilValue } from "recoil";
import { questState } from "../../atom";
import * as Api from '../../api'
import { useEffect, useState } from "react";
import RadialChart from "../chart/RadialChart";
import calcQuestion from "./calcQuestion";

function Result({ activeBtn }){

    const quest = useRecoilValue(questState);
    const [similarCountries, setSimilarCountries] = useState([])
    const [predict, setPredict] = useState([])
    
    console.log(quest)
    const calculated = calcQuestion(quest)
    console.log(calculated)

    async function getPredictData() {
        try{
            const res = await Api.post("result/predict", calculated);
            console.log(res.data)
            setPredict(res.data)
        }
        catch(err){
            console.log(err.response.data)
        }
    }

    async function getSimilarData() {
        try {
          const res = await Api.get(`result/${predict?.reCountry}/similar`);
          console.log(res.data.similarCounrtries)
        //   setSimilarCountries(res.data.similarCounrtries)
        } catch (err) {
          console.log(err);
        }
      }
    

    useEffect(() => {
        getSimilarData()
        getPredictData()
    }, [])

    return (
        <Container sx={{py: 7, mt: 12}}>
            {/* 결과 예측 */}
            <div className={Style.predictBox}>
                <div className={Style.predictIntro}>
                    <img src={predict?.myCountryFlag} alt="내 나라 국기" className={Style.myflag} />
                    <div>당신은 <span className={Style.coloring}>{predict?.myCountry}</span> 국민이지만 당신의 <span className={Style.coloring}>행복 Ti</span>는</div>
                </div>

                <div className={Style.predictContent}>
                    <img src={predict?.reCountryFlag} alt="추천 나라 국기" className={Style.recflag} />
                    <div><span className={Style.coloring}>{predict?.reCountry}형</span>입니다!</div>
                </div>
                
                <p className={Style.conclusion}>
                    당신은 <span className={Style.coloring}>{predict?.happyType}</span>한 {predict?.myCountry} 국민입니다.
                </p>
            </div>

            <div className={Style.divider}/> 

            {/* 추천한 나라의 분석 결과 */}
            <h1 className={Style.title}>
                <span className={Style.coloring}>노르웨이</span>형 분석 결과
            </h1>

            <div className={Style.analysisBox}>
                <RadialChart nation={'Norway'} active={activeBtn === 1}></RadialChart>

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
                    {/* {similarCountries.map((item) => (
                        <div className={Style.nations}>
                            <img className={Style.flag} src={`https://countryflagsapi.com/png/${item}`} alt="나라별 국기"/>
                            <h1 className={Style.nation}>{item}</h1>
                        </div>
                    ))} */}
                </div>
            </div>

        </Container>
    )
}
export default Result

