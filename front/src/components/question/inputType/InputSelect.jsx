import style from '../../../srcAssets/style/Question.module.css'
import { useRecoilState, useRecoilValue } from "recoil";
import {questState, currentNumState } from '../../../atom';
import { FormControl, FormHelperText, MenuItem, Select, Stack } from '@mui/material';
import { useState } from 'react';
import {continents, countryCategory} from '../data/countries'

// 나라는 select로 입력받음
function InputSelect() {
    const [quest, setQuest] = useRecoilState(questState);
    const currentNum = useRecoilValue(currentNumState);
    const [continent, setContinent] = useState('아시아')
    const [country, setCountry] = useState('The Republic Of Korea')
    const [checked, setChecked] = useState(false) // 대륙이 체크되면 나라 input을 자동으로  focus함

    return (
    <>
        <Stack direction="row" >
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <Select
                    autoFocus
                    color="secondary"
                    value={continent}
                    onChange={(e) => {
                        setContinent(e.target.value)
                        setChecked(true)
                    }}
                >
                {continents.map((continent) => (
                    <MenuItem 
                        key={continent}
                        value={continent}
                    >
                        {continent}
                    </MenuItem>
                ))}
                </Select>
                <FormHelperText>Select Continent</FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <Select
                    autoFocus = {checked}
                    value={country}
                    color="secondary"
                    onChange={(e) => {
                        setChecked(false)
                        setCountry(e.target.value)
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
                    }}
                >
                    {countryCategory[continent].map((country) => (
                        <MenuItem 
                            key={country}
                            value={country}
                        >
                            {country}
                        </MenuItem>
                    ))}

                </Select>
                <FormHelperText>Select Country</FormHelperText>
            </FormControl>

            <div className={style.nationFlag}>
                <img alt="국기" src={`https://countryflagsapi.com/png/${country}`} />
            </div>
        </Stack>
    </>
    )
}
export default InputSelect