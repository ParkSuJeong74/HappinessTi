import { Box, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import question from '../../srcAssets/style/Question.module.css'
import QuestionContent from "./QuestionContent"
import QuestionHeader from "./QuestionHeader"

function Question(){

    const datas = [
        {
            id: 1,
            question: '당신의 나라를 입력해주세요! (ex. korea)',
        },
        {
            id: 2,
            question: '당신의 평균 연봉을 입력해주세요! (만 원 단위) '
        },
        {
            id: 3,
            question: '우리가 기대하는 평균 수명을 입력해주세요 '
        },
        {
            id: 4,
            question: '만약 문제가 생겼을 때  당신이 의지할 수 있는 가족이나 친구가 있습니까?'
        },
        {
            id: 5,
            question: '지난 몇달 동안 자선단체에 혹은 다양한 곳에 기부를 한 경험이 있나요?'
        },
    ]

    return (
        <Container sx={{py: 7, mt: 12}}>

            <QuestionHeader></QuestionHeader>

            {datas.map((data) => 
                <QuestionContent
                    key={data.id}
                    data={data}
                />
            )}

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