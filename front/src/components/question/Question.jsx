import {  Container } from "@mui/material"
import { useState } from "react"
import AlertDialog from "./AlertDialog"
import QuestionContent from "./QuestionContent"
import QuestionHeader from "./QuestionHeader"

function Question(){
    const [modalOpen, setModalOpen] = useState(true);

    return (
    <>
        {modalOpen && 
        <AlertDialog modalOpen={modalOpen} setModalOpen={setModalOpen} />}

        <Container sx={{py: 7, mt: 12}}>

            {/* <QuestionHeader></QuestionHeader> */}
            <QuestionContent></QuestionContent>

        </Container>
    </>
    )
}
export default Question