import { Box, Button, Slider, Stack } from "@mui/material"
import { useRecoilValue, useSetRecoilState } from "recoil";
import question from '../../srcAssets/style/Question.module.css'
import questState from '../../atom.jsx';
import { useState } from "react";

function QuestionContent(){
    const quest = useRecoilValue(questState)
    const setQuest = useSetRecoilState(questState)
    const [id, setId] = useState(0)

    console.log(quest)

    return (
        <Box className={question.questBox}>

            <div>{quest[id].quiz}</div>

            {(quest[id].num === 0 || quest[id].num === 1) 
            ? <input onChange={(e) => setQuest((prev) => [
                    ...prev,
                    {
                        id: quest[id].num, quiz: quest[id].quiz,
                        value: e.target.value
                    }
                ])} />
            : <Slider 
                    className={question.slider} 
                    defaultValue={quest[id].value} 
                    valueLabelDisplay="auto" />}          
            
            <Stack className={question.buttons}>
                <Button onClick={() => setId((prev) => {
                    return prev === 0 ? (prev) : prev-1
                })}>이전</Button>

                <Button onClick={() => setId((prev) => {
                    return prev === 4 ? (prev) : prev+1
                })}>다음</Button>
            </Stack>
            
        </Box>
    )
}
export default QuestionContent