import { Slider } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import {questState, currentNumState } from '../../../atom';


function InputSlider() {
    const [quest, setQuest] = useRecoilState(questState);
    const currentNum = useRecoilValue(currentNumState);

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

    
    if(quest[currentNum]?.id === 1)
        return (
            <Slider 
                sx={{width: '600px'}}
                valueLabelFormat={valueLabelFormat}
                min={100}
                max={12000}
                step={100}
                marks
                value={quest[currentNum].value} 
                valueLabelDisplay="auto" 
                color="secondary"
                onChange={(e) => {
                    setQuest((prev) => {
                        console.log("현재 id", quest[currentNum]?.id)
                        console.log("바꾸고 있는 값", e.target.value)
                        console.log(prev)
                        return prev.map((el) => el.id === quest[currentNum].id ?
                        {
                            ...el,
                            id: quest[currentNum]?.id, quiz: quest[currentNum]?.quiz,
                            value: e.target.value
                        } : el)                   
                    })
                }}/>
        )
    
    else
        return (
            <Slider 
                sx={{width: '600px'}}
                value={quest[currentNum].value} 
                valueLabelDisplay="auto" 
                color="secondary"
                onChange={(e) => {
                    setQuest((prev) => {
                        console.log("현재 id", quest[currentNum]?.id)
                        console.log("바꾸고 있는 값", e.target.value)
                        return prev.map((el) => el.id === quest[currentNum].id ?
                        {
                            ...el,
                            id: quest[currentNum]?.id, quiz: quest[currentNum]?.quiz,
                            value: e.target.value
                        } : el)                   
                    })
                }}/>
        )
    
    
}

export default InputSlider