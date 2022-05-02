import { Box, Stack, TextField } from "@mui/material";
import style from '../../../srcAssets/style/Question.module.css'
import { useRecoilState, useRecoilValue } from "recoil";
import {questState, currentNumState } from '../../../atom';

// 연봉과 수명은 textfield로 입력받음
function InputText() {
    const [quest, setQuest] = useRecoilState(questState);
    const currentNum = useRecoilValue(currentNumState);

    const isUnderSalary = quest[currentNum]?.value < 800;
    const isExcessSalary = quest[currentNum]?.value > 120000;

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

    if(Number.isNaN(quest[currentNum]?.value)){
        setQuest((prev) => updateQuestProcess(prev, 0))
    }

    function incThousand(){
        setQuest((prev) => updateQuestProcess(prev, parseInt(quest[currentNum]?.value)+1000))
    }
    
    function incHundred(){
        setQuest((prev) => updateQuestProcess(prev, parseInt(quest[currentNum]?.value)+100))
    }

    function calcSalary(value) {
        if(value >= 80 && value < 1000){
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

    return (

    <Box>
        {/* 1000만, 100만 단위로 증가버튼 */}
        {currentNum === 1 && (
            <Box className={style.increases}>
                <div className={style.incThousand} onClick={incThousand}>+1000만</div>
                <div className={style.incHundred} onClick={incHundred}>+100만</div>
            </Box>
        )}

        <Stack direction="row" spacing={2}>
        
            <TextField
                color="secondary"
                variant="outlined"
                value={quest[currentNum]?.value}
                onChange={(e) => {
                    setQuest((prev) => updateQuestProcess(prev, parseInt(e.target.value)))
                }}
            />

            {currentNum === 1 && <span className={style.suffix}>만원</span>}
            {currentNum === 2 && <span className={style.suffix}>세</span>}
            
        </Stack>

        {currentNum === 1 && <h1 className={style.calcSalary}>{calcSalary(quest[currentNum]?.value)}</h1>}
    
        {currentNum === 1 && isExcessSalary && <h1 className={style.limitSalary}>12억을 초과할 수 없습니다!</h1>}
        {currentNum === 1 && isUnderSalary && <h1 className={style.limitSalary}>죄송하지만 800만 미만은 적용되지 않습니다!</h1>}
    </Box>
    )
}
export default InputText