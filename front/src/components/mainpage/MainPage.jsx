import style from '../../srcAssets/style/Mainpage.module.css'
import Typed from 'typed.js'
import React, { useEffect, useRef, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Intro from './Intro.jsx'
import Snackbar from "@mui/material/Snackbar";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReactFullpage from '@fullpage/react-fullpage';
import { Box } from '@mui/material';
import ChartComposed from './chart/ChartComposed';
import ChartTreemap from './chart/ChartTreemap';
import ChartMap from './chart/ChartMap';
import Ranking from './ranking/Ranking';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../Route';
import ReactPlayer from 'react-player'

function MainPage() {
  const el = useRef(null)
  const typed = useRef(null)
  const sectionRef = useRef(null) 
  const [section, setSection] = useState(0)//section을 저장할 상태
  const [activeBtn, setActiveBtn] = useState(0); // 활성화된 btn 저장할 상태
 /*  const [openElice, setEliceOpen] = useState(true);
  const [open, setOpen] = useState(true);
  const [open20, setOpen20] = useState(true);

  useEffect(() => {
    if (!open && !openElice) {
      setOpen(false)
      setEliceOpen(false)
      setOpen20(false)
    }
    else if(open && !openElice) setOpen(true);
    else if(!open && openElice)  setEliceOpen(true)
  }, [open, open20, openElice]);
  
  const handleEliceClose = (event, reason) => {
    setEliceOpen(false)
  };
  const handle4Close = (event, reason) => {
    setOpen(false);
  };

  const handle20Close = (event, reason) => {
    setOpen20(false);
  }; */

  /* //section 세팅
  useEffect(() => {
    const s = sectionRef.current.getElementsByTagName("section");
    setSection(s)
  }, []) */

  useEffect (() => {
    const options = {
        strings: [
            'Happy?', 'Unhappy?'
        ],
        typeSpeed: 100, 
        backSpeed: 100, 
        loop: true,
        showCursor: false,
    }

    typed.current = new Typed(el.current, options)

    return () => {
        typed.current.destroy()
    }
  }, [])

 /*  window.addEventListener("scroll", function (event) {
    let yOffset = this.scrollY;
    let height = window.innerHeight / 1.5;

    for (let i = 0; i < section.length; i++) {
      if (
        yOffset > section[i].offsetTop - height &&
        yOffset <= section[i].offsetTop - height + section[i].offsetHeight
      ) {
        setActiveBtn(i);
        break;
      }
    }
  }); */

  const anchors = ["firstPage", "secondPage", "thirdPage", "4Page", "5Page"];
  const bgvideo = document.getElementsByTagName("video");
  console.log(bgvideo)

  console.log(bgvideo.paused)



  return (  
  <>
    <ReactFullpage
        anchors={anchors}
        navigation
        navigationTooltips={anchors}
        sectionsColor={["#fff", "#fff", "#fff", "#fff", "#fff"]}
        onLeave={(origin, destination, direction) => {
            console.log("onLeave event", { origin, destination, direction });
            setActiveBtn(destination.index)
        }}
        render={({ state, fullpageApi }) => {
            console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console

            return (

            <>
            {/* <MainVideo & greeting /> */}
            <div className='section'>
              <ReactPlayer 
                url={'https://storage.googleapis.com/crashingdevstorage14/video/titlevideo.mp4'} 
                className={style.bgVideo}
                width='100%'
                height='100%'
                playing={activeBtn===0}
                muted={true} //chrome정책으로 인해 자동 재생을 위해 mute 옵션을 true로 해주었다.
                loop={true}
              />

              {/* <video playsInline controls autoplay="autoplay" loop muted className={style.bgVideo}>
                <source src={`https://storage.googleapis.com/crashingdevstorage14/video/titlevideo.mp4`} type="video/mp4" />
              </video> */}

              <div className={style.greetingContainer}>
                <span className={style.greetingWord1}>Are you </span>
                <p className = {style.greetingWord2} ref={el}></p>
              </div>

              <div className={style.decoration}></div>

              <div className={style.mainText}>
                <h1>매일 행복하진 않지만, 행복한 일은 매일 있어요 :)</h1>
              </div>

              <div style={{fontSize: '110px'}}>
                <KeyboardArrowDownIcon fontSize="inherit" className={style.scrollIcon1}/>
                <KeyboardArrowDownIcon fontSize="inherit" className={style.scrollIcon2}/>
              </div>
            </div>

                {/* happy-ti 간단소개 */}
                <div className="section">
                    <h1 class={style.title}>
                        <span class={style.coloring}>H</span>ap<span class={style.coloring}>p</span>iness
                        <span class={style.coloring}>Ti</span> Test
                    </h1>

                    <Box sx={{my: 10}}>
                        <h2 class={style.subtitle}>
                            <span class={style.coloring}>행복 TI</span> 란?
                        </h2>
                        <div class={style.chart1}>
                            <ChartComposed active={activeBtn === 1}></ChartComposed>
                        </div>
                        <p className={style.introContent1}>2022년 세계행복보고서에 따르면, 삶에 대한 평가는 시간이 흐를수록 단계적으로 변화합니다. </p>
                        <p className={style.introContent2}>기대 수명의 점진적인 증가는 서구인의 삶에 대한 평가와 동유럽의 격차를 줄였고, GDP의 변화는 전체적인 생활 평가에 변화를 주었습니다.</p>
                        <p className={style.introContent3}>행복이라는 것은 삶에 대한 평가로부터 기인하며, 여러 감정적인 요인에 따라 달라집니다.<br/> 모든 국가는 매년 행복도에 대한 설문조사를 실시하고 95%의 신뢰구간을 가지고 있습니다.</p>      
                    </Box>
                </div>

                {/* 대륙별 행복도 트리맵 차트 */}
                <div className="section">
                    <Box sx={{my: 10}}>
                        <h2 class={style.subtitle}>
                            Total Continents <span class={style.coloring}>Happiness</span>
                        </h2>
                    
                        <div style={{width: '90%', height: '500px', marginBottom : '50px'}}>
                            <ChartTreemap active={activeBtn === 2}></ChartTreemap>
                        </div>
                        <p className={style.introContent1}> 또한 행복에 대한 척도와 기준은 대륙마다 뚜렷한 지역적인 차이를 가지고 있습니다. 각 대륙의 특수한 문화 속에서 겪는 삶의 경험과 공유하는 감정에 따라 달라지니까요. 그 패턴은 유사성 또한 가지고 있습니다. </p>
                        <br/>
                        <p className={style.introContent1}> 대표적인 것이 바로 스트레스입니다. 특히 삶에 대한 자유의식을 갖게 된다거나 사회의 부패를 인지하는 경향, 친사회적인 행위 등이 한 나라에서 공유되는 스트레스에 영향을 미칩니다. 그 외에도 복지의 불평등 등이 있을 수 있습니다.</p>
                    </Box>
                </div>

                {/* 나라별 행복도 지도맵 차트 & 랭킹 */}
                <div className="section">
                    <Box sx={{my: 10}}>
                        <h2 className={style.subtitle}>
                            Total Countries <span class={style.coloring}>Happiness</span>
                        </h2>

                        <div className={style.country}>
                            <div className={`${activeBtn === 3 ? `${style.chart2} ${style.active}` : style.chart2}`}>
                                <ChartMap></ChartMap>
                            </div>
                            <div className={style.ranking}>
                                <Ranking></Ranking>
                            </div>
                        </div>
                        <p className={style.introContent1}>행복 Ti는 기대수명, GDP, 자유, 부패 인식, 관용, 총 5가지 지표를 이용한 설문조사를 기반으로 당신의 행복도를 조사하고, 세계행복보고서에서 수립된 지표로 만들어진 kaggle 데이터를 활용하여 총 100여 개의 나라와 당신의 행복도를 비교해줍니다. <br/>또한 당신이 속해있는 나라의 현재와 비교해 당신이 미래에 행복해질 가능성을 보여줍니다.</p>
                    </Box>
                </div>

                {/* 설문조사로 이동 버튼 */}
                <div className="section">
                <Box className={style.guide}>
                      <h1 className={style.guideText}>지금 당신과 같은 행복을 가지고 있는 나라가 궁금하신가요?</h1>
                      <Link to={ROUTES.QUESTION.link}>
                          <span>나의 행복도 찾기 Go!</span>
                      </Link> 
                  </Box>
                </div>
                
            </>
          );
        }}
    />
  </>
  )
}
export default MainPage

//  {/* mainpage의 intro 부분 */}
//  <Intro activeBtn={activeBtn}></Intro>

    {/* 광고 */}
   {/*  <Snackbar
    open={open}
    autoHideDuration={6000}
    // onClose={handle4Close}
    anchorOrigin={{vertical:'bottom' , horizontal:'left' }}
    action={<React.Fragment>
      <a href="https://aitrack.lms.elice.io/"> <img src="3team_ad.png" style={{ height: "200px" }} /></a>
      <IconButton
    aria-label="close"
    color="inherit"
    sx={{ p: 0.5 }}
    onClick={handle4Close}>
    <CloseIcon />
  </IconButton>
  </React.Fragment>}
    
  /> */}
  {/* <Snackbar
    open={open20}
    autoHideDuration={6000}
    // onClose={handle4Close}
    anchorOrigin={{vertical:'top' , horizontal:'center' }}
    action={<React.Fragment>
      <a href="https://aitrack.lms.elice.io/"> <img src="20team_ad.png" style={{ height: "400px" }} /></a>
      <IconButton
    aria-label="close"
    color="inherit"
    sx={{ p: 0.5 }}
    onClick={handle20Close}>
    <CloseIcon />
  </IconButton>
  </React.Fragment>}
    
  /> */}
  {/* <Snackbar
    open={openElice}
    autoHideDuration={6000}
    // onClose={handleEliceClose}
    anchorOrigin={{vertical:'top' , horizontal:'left' }}
    action={<React.Fragment>
      <a href="https://aitrack.lms.elice.io/"><img src="elice-ad.png" style={{ height: "500px" }} /></a>
      <IconButton
    aria-label="close"
    color="inherit"
    sx={{ p: 0.5 }}
    onClick={handleEliceClose}>
    <CloseIcon />
  </IconButton>
  </React.Fragment>}
  /> */}