import { Container } from "@mui/material"
import styled from "styled-components";
import result from '../../srcAssets/style/Result.module.css'
import norway from '../../srcAssets/img/norway.png'
import RadialChart from "../mainpage/chart/RadialChart";
import * as Api from "../../api";

import { useRecoilValue } from "recoil";
import { questState } from "../../atom";
import { useEffect, useState } from "react";

function Result({ user, activeBtn }){
    const quest = useRecoilValue(questState);
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

    console.log(quest);
    return (
        <Container sx={{py: 7, mt: 12}}>
            <ResultBox className={result.resultBox}>
                <div>
                    <div className={result.resultBoxtop}>
                        <span>당신은 <span className={result.resultUserflag}>대한민국</span> 국민이지만 당신의 <span className={result.resultTi}>행복 Ti</span>는</span>
                    </div>
                    <div className={result.resultFlag}>
                        <NationFlag src={norway} /><span className={result.resultResultType}><span className={result.resultCountry}>노르웨이</span><span className={result.resultType}> 형</span>입니다!</span>
                    </div>
                    <div className={result.resultInfoBox}>
                        <p className={result.resultInfo1}>
                            당신은 행복한 <span className={result.resultUserflag}>대한민국</span> 국민입니다.
                        </p>
                    </div>
                </div>
            </ResultBox>

            <div className={result.resultTitle1}>
                <span className={result.resultTitle2}><span className={result.resultCountry}>노르웨이</span>형 분석 결과</span>
            </div>

            <ResultBox className={result.resultBox2}>
                <RadialChart nation={'Norway'}active={activeBtn === 1}></RadialChart>

                <div className={result.resultInfoBox2}>
                    <p className={result.resultInfo3}>
                        상위 <span className={result.resultPercent2}>20%</span>의 자유 점수를 갖고 있습니다.
                    </p>
                    <p className={result.resultInfo4}>
                        상위 <span className={result.resultPercent3}>20%</span>의 경제 점수를 갖고 있습니다.
                    </p>
                </div>
            </ResultBox>

            <div className={result.resultTitle3}>
                <span className={result.resultTitle4}>행복도가 비슷한 나라는?</span>
            </div>

            <ResultBox className={result.resultBox3}>
                <div className={result.resultInfoBox3}>
                    {similarCountries.map((item) => (
                        <div className={result.resultInfoBox4}>
                            <NationFlag2 src={`https://countryflagsapi.com/png/${item}`} />
                            <span className={result.resultSimilarNation}>{item}</span>
                        </div>
                    ))}
                </div>
            </ResultBox>
        </Container>
    )
}
export default Result


const ResultBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const NationFlag = styled.img`
    width: 200px;
    margin: 20px 160px 20px 20px;
`;

const NationFlag2 = styled.img`
    width: 100px;
    margin: 20px 20px 20px 0px;
`;