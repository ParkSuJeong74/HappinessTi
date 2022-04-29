import { useRecoilState, useRecoilValue } from "recoil";
import {questState, currentNumState } from '../../../atom';

function InputText() {
    const [quest, setQuest] = useRecoilState(questState);
    const currentNum = useRecoilValue(currentNumState);
console.log(quest)
console.log(currentNum)
    return (
        <input 
            value={quest[currentNum]?.value}
            placeholder={quest[currentNum]?.value}
            onChange={(e) => {
                setQuest((prev) => {
                    console.log("현재 id", quest[currentNum].id)
                    console.log("바꾸고 있는 값", e.target.value)

                    return prev.map((el) => el.id === quest[currentNum]?.id 
                    ? {
                        ...el,
                        id: quest[currentNum]?.id, quiz: quest[currentNum]?.quiz,
                        value: e.target.value
                    } 
                    : el)                   
                })
            }} />
    )
}
export default InputText