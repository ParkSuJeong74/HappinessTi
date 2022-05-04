import { Box, Stack, TextField } from "@mui/material";
import style from '../../../srcAssets/style/Question.module.css'
import { useRecoilState, useRecoilValue } from "recoil";
import {questState, currentNumState } from '../../../atom';

// 디스토피아, 연봉, 수명 -> textfield로 입력받음
function InputText({updateQuestProcess}) {
    const [quest, setQuest] = useRecoilState(questState);
    const currentNum = useRecoilValue(currentNumState);

    const isUnderSalary = quest[currentNum]?.value < 800;
    const isExcessSalary = quest[currentNum]?.value > 120000;

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
        const million = parseInt(value/10000)
        let temp = value%10000
        const thousand = parseInt(temp/1000)
        temp = value%1000
        const hundred = temp/100

        const miliMark = million <= 0 ? '' : `${million}억`
        const thousMark = thousand <= 0 ? '' : `${thousand}천`
        const hundMark = hundred <= 0 ? '' : `${hundred}만`

        return miliMark + ' ' + thousMark + ' ' + hundMark
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