import Style from '../../srcAssets/style/Mainpage.module.css'
import { ROUTES } from '../../Route';
import { Link } from 'react-router-dom';
import lighting from '../../srcAssets/img/light.png'
import tomato from '../../srcAssets/img/tomatoSmile.png'

function GotoSurvey(){
    return (
        <div className={`section ${Style.goButtonContainer}`}>
            <img src={lighting} alt="빛" className={Style.lighting}/>
            <div className={Style.guide}>
                <img src={tomato} alt="우리 토마토" className={Style.tomato}/>
                <h1 className={Style.guideText}>지금 당신과 같은 행복을 가지고 있는 나라가 궁금하신가요?</h1>
                <Link to={ROUTES.QUESTION.link}>
                    <span>나의 행복도 찾기 Go!</span>
                </Link> 
            </div>
        </div>
    )
}

export default GotoSurvey