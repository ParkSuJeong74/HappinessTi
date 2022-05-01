import { useRecoilState, useRecoilValue } from "recoil";
import {questState, currentNumState } from '../../../atom';

function InputText() {
    const [quest, setQuest] = useRecoilState(questState);
    const currentNum = useRecoilValue(currentNumState);

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

console.log(quest)
console.log(currentNum)
    return (
    <>
        <input 
            value={quest[currentNum]?.value}
            placeholder={quest[currentNum]?.value}
            onChange={(e) => {
                setQuest((prev) => {
                    
                    console.log("현재 문항번호!", currentNum)
                    console.log("바꾸고 있는 값", e.target.value)

                    return prev.map((el) => el.id === currentNum 
                    ? {
                        ...el,
                        id: currentNum, quiz: quest[currentNum]?.quiz,
                        value: e.target.value
                    } 
                    : el)                   
                })
            }} />
            
        {currentNum === 1 && 
        <h1>{calcSalary(quest[currentNum]?.value)}</h1>}
    </>
    )
}
export default InputText