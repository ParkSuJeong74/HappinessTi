import ReactPlayer from "react-player";
import Style from '../../srcAssets/style/Mainpage.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Greeting({activeBtn, el}){
    return(
        <div className='section'>
            <ReactPlayer 
                url={'https://storage.googleapis.com/crashingdevstorage14/video/titlevideo.mp4'} 
                className={Style.bgVideo}
                width='100%'
                height='100%'
                playing={activeBtn===0}
                muted={true} //chrome정책으로 인해 자동 재생을 위해 mute 옵션을 true로 해주었다.
                loop={true}
            />

            <div className={Style.greetingContainer}>
                <span className={Style.greetingWord1}>Are you </span>
                <p className = {Style.greetingWord2} ref={el}></p>
            </div>

            <div className={Style.decoration}></div>

            <div className={Style.mainText}>
                <h1>매일 행복하진 않지만, 행복한 일은 매일 있어요 :)</h1>
            </div>

            <div style={{fontSize: '110px'}}>
            <KeyboardArrowDownIcon fontSize="inherit" className={Style.scrollIcon1}/>
            <KeyboardArrowDownIcon fontSize="inherit" className={Style.scrollIcon2}/>
            </div>
        </div>
    )
}

export default Greeting