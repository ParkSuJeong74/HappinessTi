import { Box } from "@mui/material"
import questHeaderImg from '../../srcAssets/img/questionHeaderImg.png'
import question from '../../srcAssets/style/Question.module.css'

function QuestionHeader() {
    return (
        <Box className={question.header}>
            <img src={questHeaderImg} className={question.questionHeaderImg} alt="설문조사 헤더 이미지"/>
            <h1>이 검사는 kaggle 데이터를 기반으로 만든 독자적인 설문조사 입니다. 재미로만 이용해주세요.</h1>
        </Box>
    )
}
export default QuestionHeader