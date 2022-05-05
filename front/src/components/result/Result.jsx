import { Container } from "@mui/material"
import Style from '../../srcAssets/style/Result.module.css'
import { useRecoilValue } from "recoil";
import { questState } from "../../atom";
import * as Api from '../../api'
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom"
import {ROUTES} from '../../Route'

import RadialChart from "../chart/RadialChart";
import calcQuestion from "./calcQuestion";
import pinImg from '../../srcAssets/img/pin1-removebg.png'
import errorHandler from "../../errorHandler";

// 로그인한 user만 결과 페이지 볼 수 있음!
function Result({ activeBtn }){
    const navigate = useNavigate();
    const isLoggedin = sessionStorage.getItem("userToken");

    const quest = useRecoilValue(questState);
    
    const [predict, setPredict] = useState([])
    const [radialData, setRadialData] = useState([])
    const [infoText, setInfoText] = useState({
        'corruptionPer': [0, '높'],
        'dystopiaPer':  [0, '높'],
        'freedomPer': [0, '높'],
        'gdpPer': [0, '높'],
        'generosityPer': [0, '높'],
        'healthPer':  [0, '높'],
        'rank': 0,
        'socialPer': [0, '높'],
    })
    const [similarCountries, setSimilarCountries] = useState([])
    
    console.log(quest)
    const calculated = calcQuestion(quest)
    console.log(calculated)

    async function getResultData() {
        try {
            const res1 = await Api.post("result/predict", calculated);
            const predictData = res1.data
            console.log(res1.data)
            setPredict(res1.data)

            const res2 = await Api.get(`result/${predictData?.reCountry}`);
            setRadialData(res2.data)

            const res3 = await Api.get(`result/${predictData?.reCountry}/text`)
            console.log(res3.data)
            setInfoText(res3.data)

            const res4 = await Api.get(`result/${predictData?.reCountry}/similar`);
            console.log(res4.data.similarCounrtries)
            setSimilarCountries(res4.data.similarCounrtries)
        } catch (err) {
            errorHandler("결과 페이지 오류", err.response.data)
            console.log(err.response.data);
        }
    }
    

    useEffect(() => {
        getResultData()

        if (!isLoggedin) {
            navigate(ROUTES.LOGIN.link, { replace: true });
        }
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
                <span className={Style.coloring}>{predict?.reCountry}</span>형 분석 결과
            </h1>

            <div className={Style.analysisBox}>
                <RadialChart data={radialData}></RadialChart>
                <p className={Style.infoRank}>
                    {predict?.reCountry}의 행복도는 상위 <span className={Style.coloring}>{infoText['rank']}%</span>입니다.
                </p>

                <div className={Style.infoBox}>
                    <img src={pinImg} alt="핀 이미지" className={Style.pinset}/>
                    <p className={Style.info}>
                        평균보다 {infoText['freedomPer'][1]}은 상위 <span className={Style.coloring}>{infoText['freedomPer'][0]}%</span>의 자유 점수를 갖고 있습니다.
                    </p>
                    <p className={Style.info}>
                        평균보다 {infoText['gdpPer'][1]}은 상위 <span className={Style.coloring}>{infoText['gdpPer'][0]}%</span>의 경제 점수를 갖고 있습니다. 
                    </p>
                    <p className={Style.info}>
                        평균보다 {infoText['socialPer'][1]}은 상위 <span className={Style.coloring}>{infoText['socialPer'][0]}%</span>의 사회적 지지도를 갖고 있습니다. 
                    </p>
                    <p className={Style.info}>
                        평균보다 {infoText['healthPer'][1]}은 상위 <span className={Style.coloring}>{infoText['healthPer'][0]}%</span>의 건강 점수를 갖고 있습니다. 
                    </p>
                    <p className={Style.info}>
                        평균보다 {infoText['corruptionPer'][1]}은 상위 <span className={Style.coloring}>{infoText['corruptionPer'][0]}%</span>의 부패 인식도를 갖고 있습니다. 
                    </p>
                    <p className={Style.info}>
                        평균보다 {infoText['dystopiaPer'][1]}은 상위 <span className={Style.coloring}>{infoText['dystopiaPer'][0]}%</span>의 디스토피아 점수를 갖고 있습니다. 
                    </p>
                </div>
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
export default Result

