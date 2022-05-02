import { Box, Button, Stack } from "@mui/material"
import { useRecoilState, useRecoilValue } from "recoil";
import {useNavigate } from 'react-router-dom';
import {ROUTES} from '../../Route'

import style from '../../srcAssets/style/Question.module.css'
import styled from 'styled-components'
import {questState, currentNumState } from '../../atom.jsx';
import InputText from "./inputType/InputText";
import InputCheck from "./inputType/InputCheck";
import InputSelect from "./inputType/InputSelect";
import Progress from "./Progress";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function QuestionContent(){
    const navigate = useNavigate()
    const quest = useRecoilValue(questState);
    const [currentNum, setCurrentNum] = useRecoilState(currentNumState);

    function updateQuestProcess(prev, val) {
        console.log("현재 문항번호!", currentNum)
        console.log("바꾸고 있는 값", val)
        return (
            
            prev.map((el) => el.id === currentNum 
            ? {
                ...el,
                id: el.id, quiz: quest[currentNum]?.quiz,
                value: val
            } 
            : el) 
        )
    } 


    const movePrevNumber = () => {
        setCurrentNum((prev) => prev - 1)
    }

    const moveNextNumber = () => {
        setCurrentNum((prev) => prev + 1)
    }

    const toggleInputSpace = () => {
        if(currentNum === 0 ){
            return <InputSelect updateQuestProcess={updateQuestProcess}></InputSelect>
        }
        else if(currentNum === 1 || currentNum === 2){
            return <InputText updateQuestProcess={updateQuestProcess}></InputText>
        }
        return <InputCheck updateQuestProcess={updateQuestProcess}></InputCheck>
    }

    console.log(quest)

    return (
        <Box className={style.questBox}>

            <Progress currentNum={currentNum} />

            {/* 설문조사 문항 질문 */}
            <div className={style.quiz}>{quest[currentNum]?.quiz}</div>

            {/* 입력 공간 형식이 문제에 따라 바뀜 */}
            {toggleInputSpace()}
            
            <Stack sx={prevNextButtons}>
                {currentNum !== 0 && 
                    <Button variant="contained" startIcon={<ArrowBackIosIcon />} sx={prevNextBtn} onClick={() => movePrevNumber()}>이전</Button>}
                {currentNum !== 9 &&
                    <Button variant="contained" endIcon={<ArrowForwardIosIcon />} sx={prevNextBtn} onClick={() => moveNextNumber()}>다음</Button>}
            </Stack>

            {/* 마지막 페이지에서 결과 페이지로 이동 버튼 */}
            {currentNum === 9 &&
                <Box className={style.guide}>
                    <h1>재밌으셨나요? 결과를 확인해볼까요?</h1>
                    <input  
                        type="checkbox"
                        onChange={(e) => e.target.checked ? navigate(ROUTES.RESULT.link) : ''}
                    />
                </Box>}
            
        </Box>
    )
}

export default QuestionContent

const prevNextButtons = {
    margin: '70px 0',
    display: 'flex', 
    flexDirection: 'row'
}

const prevNextBtn = {
    backgroundColor: '#8353e6',
    marginRight: '10px',
    fontSize: '15px',
    '&:hover': {
        backgroundColor: '#8353e6',
    },
}