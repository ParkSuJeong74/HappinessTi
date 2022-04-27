import { Box, Button, Stack } from "@mui/material"
import question from '../../srcAssets/style/Question.module.css'

function QuestionContent({ data }){
    console.log(data)
    console.log(data.question)

    return (
        <Box className={question.questBox}>
            <div>{data.question}</div>
            <input></input>

            <Stack className={question.questButtons}>
                <Button>이전</Button>
                <Button>다음</Button>
            </Stack>
            
        </Box>
    )
}
export default QuestionContent