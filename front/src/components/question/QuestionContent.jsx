import { Box, Button, Slider, Stack } from "@mui/material"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import question from '../../srcAssets/style/Question.module.css'
import {questState, currentIdState } from '../../atom.jsx';
import { useEffect, useState } from "react";

const InputText = () => {
    const [quest, setQuest] = useRecoilState(questState);
    const currentId = useRecoilValue(currentIdState);

    return (
        <input 
            value={quest[currentId]?.value}
            placeholder={quest[currentId]?.value}
            onChange={(e) => {
                setQuest((prev) => {
                    console.log("현재 id", quest[currentId].num)
                    console.log("바꾸고 있는 값", e.target.value)
                    console.log(prev)
                    return prev.map((el) => el.num === quest[currentId]?.num ?
                    {
                        ...el,
                        num: quest[currentId]?.num, quiz: quest[currentId]?.quiz,
                        value: e.target.value
                    } : el)                   
                })
            }} />
    )
}

const InputSlider = () => {
    const [quest, setQuest] = useRecoilState(questState);
    const currentId = useRecoilValue(currentIdState);

    function valueLabelFormat(value) {
        if(value >= 100 && value < 1000){
            return `${value}만`
        }
        else if(value >= 1000 && value < 10000){
            const calcValue = value/1000
            return `${calcValue}천`
        }
        else{
            const million = parseInt(value/10000)
            const thousand = (value%10000)/1000

            return `${million}억 ${thousand}천`
        }
    }

    
    if(quest[currentId]?.num === 1)
        return (
            <Slider 
                sx={{width: '600px'}}
                valueLabelFormat={valueLabelFormat}
                min={100}
                max={12000}
                step={100}
                marks
                value={quest[currentId].value} 
                valueLabelDisplay="auto" 
                color="secondary"
                onChange={(e) => {
                    setQuest((prev) => {
                        console.log("현재 id", quest[currentId]?.num)
                        console.log("바꾸고 있는 값", e.target.value)
                        console.log(prev)
                        return prev.map((el) => el.num === quest[currentId].num ?
                        {
                            ...el,
                            num: quest[currentId]?.num, quiz: quest[currentId]?.quiz,
                            value: e.target.value
                        } : el)                   
                    })
                }}/>
        )
    
    else
        return (
            <Slider 
                sx={{width: '600px'}}
                value={quest[currentId].value} 
                valueLabelDisplay="auto" 
                color="secondary"
                onChange={(e) => {
                    setQuest((prev) => {
                        console.log("현재 id", quest[currentId]?.num)
                        console.log("바꾸고 있는 값", e.target.value)
                        console.log(prev)
                        return prev.map((el) => el.num === quest[currentId].num ?
                        {
                            ...el,
                            num: quest[currentId]?.num, quiz: quest[currentId]?.quiz,
                            value: e.target.value
                        } : el)                   
                    })
                }}/>
        )
    
    
}

function QuestionContent(){
    const quest = useRecoilValue(questState);
    const [currentId, setCurrentId] = useRecoilState(currentIdState);

    console.log(quest)

    return (
        <Box className={question.questBox}>

            <div>{quest[currentId]?.quiz}</div>

            {(quest[currentId]?.num === 0) 
            ? <InputText></InputText>
            : <InputSlider></InputSlider> }          
            
            <Stack sx={{display: 'flex', flexDirection: 'row'}}>
                <Button onClick={() => {
                    setCurrentId((prev) => {
                        if(prev === 0){
                            alert("첫 번째 질문입니다!")
                            return prev
                        }
                        else 
                            return prev - 1
                        
                    })
                    //입력을 하고 다음버튼이나 이전 버튼을 누르면 현재 input에 있는 값을 초기화함
                }}>이전</Button>

                <Button onClick={() => {
                    setCurrentId((prev) => {
                        if(prev === 4){
                            alert("마지막 질문입니다!")
                            return prev
                        }
                        else 
                            return prev + 1
                    })
                    //입력을 하고 다음버튼이나 이전 버튼을 누르면 현재 input에 있는 값을 초기화함
                }}>다음</Button>
            </Stack>
            
        </Box>
    )
}
export default QuestionContent