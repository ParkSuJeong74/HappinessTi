import situation from '../data/situation'
import choice from '../data/choice5'
import style from '../../../srcAssets/style/Question.module.css'
import CheckIcon from '@mui/icons-material/Check';
import { useRecoilState, useRecoilValue } from 'recoil';
import {questState, currentNumState } from '../../../atom';
import { useEffect, useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';

// 자유, 관용, 부패, 지지 -> check(5지선다)로 입력받음
function InputCheck({updateQuestProcess}) {
    const [quest, setQuest] = useRecoilState(questState);
    const currentNum = useRecoilValue(currentNumState);
    const currentQuest = quest[currentNum]
    
    const ChoosedAnsToQuest = (e) => {
        setQuest((prev) => updateQuestProcess(prev, parseInt(e.target.value)))
    }
    
    //현재 문항에 대한 situation을 가져옴
    const currentSituation = situation.find((item) => item.num === currentNum)

    return (
    <>        

        {/* (부패인식만 해당)현재 문항에 대한 상황을 가져옴 */}
        {(currentNum >= 11 && currentNum <= 16) &&
            <h1 className={`${style.situation}`}>{currentSituation?.content}</h1>}

        {/* 5지 선다로 선택할 수 있는 라디오 버튼! */}
        <div className={style.radioButtons}>
        
            <label className={style.customRadio}>
            <input type="radio" value={5} name="choice" checked={currentQuest?.value === 5}
                    onChange={ChoosedAnsToQuest} />
                <span className={style.radioBtn}>
                    <CheckIcon className={style.icon}/>
                    <h3>{choice[1]}</h3>
                </span>
                
            </label>
        
            <label className={style.customRadio}>
                <input type="radio" value={25} name="choice" checked={currentQuest?.value === 25}
                    onChange={ChoosedAnsToQuest}/>
                <span className={style.radioBtn}>
                    <CheckIcon className={style.icon}/>
                    <h3>{choice[2]}</h3>
                </span>
            </label>

            <label className={style.customRadio}>
                <input type="radio" value={50} name="choice" checked={currentQuest?.value === 50}
                    onChange={ChoosedAnsToQuest}/>
                <span className={style.radioBtn}>
                    <CheckIcon className={style.icon}/>
                    <h3>{choice[3]}</h3>
                </span>
            </label>

            <label className={style.customRadio}>
                <input type="radio" value={75} name="choice" checked={currentQuest?.value === 75}
                    onChange={ChoosedAnsToQuest}/>
                <span className={style.radioBtn}>
                    <CheckIcon className={style.icon}/>
                    <h3>{choice[4]}</h3>
                </span>
            </label>

            <label className={style.customRadio}>
                <input type="radio" value={95} name="choice" checked={currentQuest?.value === 95}
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