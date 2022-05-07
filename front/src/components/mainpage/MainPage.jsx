import Typed from 'typed.js'
import React, { useEffect, useRef, useState } from 'react'

import Snackbar from "@mui/material/Snackbar";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReactFullpage from '@fullpage/react-fullpage';

import Greeting from './Greeting';
import Introduction from './Introduction';
import Continent from './Continent';
import Country from './Country';
import GotoSurvey from './GotoSurvey';

function MainPage() {
  const el = useRef(null)
  const typed = useRef(null)
  const sectionRef = useRef(null) 
  const [section, setSection] = useState(0)//section을 저장할 상태
  const [activeBtn, setActiveBtn] = useState(0); // 활성화된 btn 저장할 상태
  const [openElice, setEliceOpen] = useState(true);
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
  };

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

  const anchors = ["Home", "Greeting", "Continent", "Country", "GoSurvey"];

  return (  
  <>
    <ReactFullpage
        anchors={anchors}
        navigation
        navigationTooltips={anchors}
        sectionsColor={["#fff", "#fff", "#fff", "#fff", "#000"]}
        onLeave={(origin, destination, direction) => {
            console.log("onLeave event", { origin, destination, direction });
            setActiveBtn(destination.index)
        }}
        render={({ state, fullpageApi }) => {
            console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console

            return (
            <>
              {/* <MainVideo & greeting /> */}
              <Greeting activeBtn={activeBtn} el={el}/>
              
              {/* happy-ti 간단소개 */}
              <Introduction activeBtn={activeBtn}/>

              {/* 대륙별 행복도 트리맵 차트 */}
              <Continent activeBtn={activeBtn} />

              {/* 나라별 행복도 지도맵 차트 & 랭킹 */}
              <Country activeBtn={activeBtn} />

              {/* 설문조사로 이동 버튼 */}
              <GotoSurvey />

              <Snackbar
                open={open}
                autoHideDuration={10000}
                onClose={handle4Close}
                anchorOrigin={{vertical:'bottom' , horizontal:'right' }}
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
              />
            </>
          );
        }}
    />
  </>
  )
}
export default MainPage

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