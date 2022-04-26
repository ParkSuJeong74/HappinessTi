import { Box, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import question from '../../srcAssets/style/Question.module.css'

function Question(){
    const navigate = useNavigate()
    return (
        <Container sx={{py: 7, mt: 12}}>
            <h1>설문조사 페이지</h1>

            <Box className={question.guide}>
                <h1>결과를 확인해볼까요?</h1>
                <input  
                    type="checkbox"
                    onChange={(e) => e.target.checked ? navigate("result") : ''}
                />
            </Box>
        </Container>
    )
}
export default Question