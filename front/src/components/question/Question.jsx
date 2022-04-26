import { Box, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import question from '../../srcAssets/style/Question.module.css'
import questHeaderImg from '../../srcAssets/img/questionHeaderImg.png'

function Question(){

    return (
        <Container sx={{py: 7, mt: 12}}>

            <Box className={question.header}>
                <img src={questHeaderImg} className={question.questionHeaderImg} alt="설문조사 헤더 이미지"/>
                <h1>이 검사는 kaggle 데이터를 기반으로 만든 독자적인 설문조사 입니다. 재미로만 이용해주세요.</h1>
            </Box>
            
        </Container>
    )
}
export default Question

{/* <Box className={question.guide}>
    <h1>결과를 확인해볼까요?</h1>
    <input  
        type="checkbox"
        onChange={(e) => e.target.checked ? navigate("result") : ''}
    />
</Box> */}