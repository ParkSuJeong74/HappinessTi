import {  Container } from "@mui/material"
import QuestionContent from "./QuestionContent"
import QuestionHeader from "./QuestionHeader"

function Question(){

    return (
        <Container sx={{py: 7, mt: 12}}>

            <QuestionHeader></QuestionHeader>
            <QuestionContent></QuestionContent>

        </Container>
    )
}
export default Question