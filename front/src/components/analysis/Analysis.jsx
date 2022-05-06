import { Container } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {ROUTES} from '../../Route'

import Style from '../../srcAssets/style/Analysis.module.css'
import * as Api from '../../api'
import RadialChart from "../chart/RadialChart"
import pinImg from '../../srcAssets/img/pin1-removebg.png'
import errorHandler from "../../errorHandler"

// 로그인한 user만 분석 페이지 볼 수 있음!
function Analysis(){
    const { nation } = useParams()
    const navigate = useNavigate();
    const isLoggedin = sessionStorage.getItem("userToken");

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
    

    async function getRadialData() {
        try {
            const res = await Api.get(`result/${nation}`);
            console.log(res.data)
            setRadialData(res.data)
        } catch (err) {
            errorHandler("분석 페이지 오류", err.response.data)
            console.log(err);
        }
    }

    async function getInfoText() {
        try {
            const res = await Api.get(`result/${nation}/text`)
            console.log(res.data)
            setInfoText(res.data)
        } catch (err) {
            errorHandler("분석 페이지 오류", err.response.data)
            console.log(err);
        }
    }

    async function getSimilarData() {
        try {
            const res = await Api.get(`result/${nation}/similar`);
            console.log(res.data.similarCounrtries)
            setSimilarCountries(res.data.similarCounrtries)
        } catch (err) {
            errorHandler("분석 페이지 오류", err.response.data)
            console.log(err);
        }
    }
    
    useEffect(() => {
        getRadialData()
        getInfoText()
        getSimilarData()

        if (!isLoggedin) {
            navigate(ROUTES.LOGIN.link, { replace: true });
        }
    }, [])

    console.log(nation)

    return (
        <Container sx={analysisPage}>
            <div className={Style.divider}/>

            {/* 이 나라의 행복도 분석 결과 */}
            <h1 className={Style.title}>
                <span className={Style.coloring}>{nation}</span>형 분석 결과
            </h1>

            <div className={Style.analysisBox}>
                <RadialChart data={radialData}></RadialChart>
                <p className={Style.infoRank}>
                    {nation}의 행복도는 상위 <span className={Style.coloring}>{infoText['rank']}%</span>입니다.
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

            {/* 이 나라와 비슷한 행복도를 가진 나라들 */}
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

