import { Container } from "@mui/material"
import styled from "styled-components";
import result from '../../srcAssets/style/Result.module.css'
import norway from '../../srcAssets/img/norway.png'

function Result({ user }){
    return (
        <Container sx={{py: 7, mt: 12}}>
            <div className={result.resultTitle}>
                <h1 class={result.h1}>설문조사 결과 페이지!</h1>
            </div>
            
            <ResultBox className={result.resultBox}>
                <div>
                    <div className={result.resultBoxtop}>
                        <span>당신은 <span className={result.resultUsername}>대한민국 국민</span>이지만 당신의<span className={result.resultTi}> 행복 Ti</span>는</span>
                    </div>
                    <div className={result.resultFlag}>
                        <NationFlag src={norway} /><span className={result.resultResultType}><span className={result.resultCountry}>노르웨이</span><span className={result.resultType}> 형</span>입니다!</span>
                    </div>
                    <div className={result.resultInfo}>
                        <p className={result.resultInfo1}>
                            당신은 행복한 대한민국 국민입니다.
                        </p>
                        <p className={result.resultInfo2}>
                            현재보다 당신이 더 행복해질 가능성은 50%입니다.
                        </p>
                    </div>
                </div>
            </ResultBox>

            <div>
                <span>
                    
                </span>
                <span>

                </span>
            </div>
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