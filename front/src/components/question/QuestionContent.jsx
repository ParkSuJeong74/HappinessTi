import { Box, Button, Slider, Stack } from "@mui/material"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import question from '../../srcAssets/style/Question.module.css'
import {questState, currentNumState } from '../../atom.jsx';
import { useEffect, useState } from "react";
import InputText from "./inputType/InputText";
import InputSlider from "./inputType/InputSlider";
import InputCheck from "./inputType/InputCheck";

function QuestionContent(){
    const quest = useRecoilValue(questState);
    const [currentNum, setCurrentNum] = useRecoilState(currentNumState);

    const noticeFirst = () => {
        setCurrentNum((prev) => {
            if(prev === 0){
                alert("첫 번째 질문입니다!")
                return prev
            }
            return prev - 1
            
        })
    }

    const noticeLast = () => {
        setCurrentNum((prev) => {
            if(prev === 9){
                alert("마지막 질문입니다!")
                return prev
            }
            return prev + 1
        })
    }

    const toggleInputSpace = () => {
        if(quest[currentNum]?.id === 0 || quest[currentNum]?.id === 2){
            return <InputText></InputText>
        }
        else if(quest[currentNum]?.id === 1){
            return <InputSlider></InputSlider>
        }

        else {
            return <InputCheck currentQuest = {quest[currentNum]}></InputCheck>
        }
    }

    console.log(quest)

    return (
        <Box className={question.questBox}>

            <div>{quest[currentNum]?.quiz}</div>

            {/* 입력 공간 형식이 문제에 따라 바뀜 */}
            {toggleInputSpace()}
            
            <Stack sx={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={noticeFirst}>이전</Button>
                <Button onClick={noticeLast}>다음</Button>
            </Stack>
            
        </Box>
    )
}

export default QuestionContent