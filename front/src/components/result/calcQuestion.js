function calcQuestion(original){
    const calculated = {}
    for(let id=0; id<original.length; id++){
        if(id >= 0 && id < 4){
            if(id === 0)
                calculated['myCountry'] = original[id]['value'] /* 나라는 값 그대로 */
            
            if(id === 1) 
                calculated['NorDystopia'] = 100 - original[id]['value'] /* 디스토피아는 100-값 */
            
            if(id === 2)
                calculated['lifeExpectancy'] = original[id]['value'] /* 수명은 값 그대로 */

            if(id === 3)
                calculated['kw'] = original[id]['value'] /* 연봉은 값 그대로 */
        }
        else if(id >= 4 && id <= 6){ /* 자유 */
            let sum = 0
            for(let i=4; i<=6; i++){
                sum = sum + original[i]['value']
            }
            calculated['freedom'] = parseInt(sum / 3)
        }
        else if(id >= 7 && id <= 10){ /* 관용 */
            let sum = 0
            for(let i=7; i<=10; i++){
                sum = sum + original[i]['value']
            }
            calculated['generosity'] = parseInt(sum / 4)
        }
        else if(id >=11 && id <= 16){ /* 부패 */
            let sum = 0
            for(let i=11; i<=16; i++){
                sum = sum + original[i]['value']
            }
            calculated['perceptions'] = parseInt(sum / 6)
        }
        else { /* 사회적 지지 */
            let sum = 0
            for(let i=17; i<=34; i++){
                sum = sum + original[i]['value']
            }
            calculated['social'] = parseInt(sum / 18)
        }
    }
    return calculated
}
export default calcQuestion