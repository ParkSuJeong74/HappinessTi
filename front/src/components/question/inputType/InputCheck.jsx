import situation from '../data/situation'
import choice from '../data/choice5'
import style from '../../../srcAssets/style/Question.module.css'
import CheckIcon from '@mui/icons-material/Check';
import { useRecoilState, useRecoilValue } from 'recoil';
import {questState, currentNumState } from '../../../atom';


function InputCheck({ currentQuest }) {
    const [quest, setQuest] = useRecoilState(questState);
    const currentNum = useRecoilValue(currentNumState);

    const ChoosedAnsToQuest = (e) => {

        setQuest((prev) => {
            const stringToInt = parseInt(e.target.value)
            console.log("현재 id", currentQuest.id)
            console.log("바꾸고 있는 값", e.target.value)
            return prev.map((el) => el.id === currentNum ?
            {
                ...el,
                id: currentNum, quiz: currentQuest.quiz,
                value: stringToInt
            } : el)                   
        })
    }

    
    //현재 문항에 대한 situation을 가져옴
    const currentSituation = situation.find((item) => item.num === currentNum)

    return (
    <>
        {/* 현재 문항에 대한 상황을 가져옴 */}
        <h1 className={`${style.situation} ${style.highlight}`}>{currentSituation?.content}</h1>

        {/* 5지 선다로 선택할 수 있는 라디오 버튼! */}
        <div className={style.radioButtons}>
        
            <label className={style.customRadio}>
            <input type="radio" value={20} name="choice" checked={currentQuest?.value === 20}
                    onChange={ChoosedAnsToQuest} />
                <span className={style.radioBtn}>
                    <CheckIcon className={style.icon}/>
                    <h3>{choice[1]}</h3>
                </span>
                
            </label>
        
            <label className={style.customRadio}>
                <input type="radio" value={40} name="choice" checked={currentQuest?.value === 40}
                    onChange={ChoosedAnsToQuest}/>
                <span className={style.radioBtn}>
                    <CheckIcon className={style.icon}/>
                    <h3>{choice[2]}</h3>
                </span>
            </label>

            <label className={style.customRadio}>
                <input type="radio" value={60} name="choice" checked={currentQuest?.value === 60}
                    onChange={ChoosedAnsToQuest}/>
                <span className={style.radioBtn}>
                    <CheckIcon className={style.icon}/>
                    <h3>{choice[3]}</h3>
                </span>
            </label>

            <label className={style.customRadio}>
                <input type="radio" value={80} name="choice" checked={currentQuest?.value === 80}
                    onChange={ChoosedAnsToQuest}/>
                <span className={style.radioBtn}>
                    <CheckIcon className={style.icon}/>
                    <h3>{choice[4]}</h3>
                </span>
            </label>

            <label className={style.customRadio}>
                <input type="radio" value={100} name="choice" checked={currentQuest?.value === 100}
                    onChange={ChoosedAnsToQuest}/>
                <span className={style.radioBtn}>
                    <CheckIcon className={style.icon}/>
                    <h3>{choice[5]}</h3>
                </span>
            </label>
        </div>
    </>
    )
    
}
export default InputCheck