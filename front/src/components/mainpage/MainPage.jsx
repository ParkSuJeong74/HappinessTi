import style from '../../srcAssets/style/Mainpage.module.css'
import Typed from 'typed.js'
import React, { useEffect, useRef, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Intro from './Intro.jsx'
import Snackbar from "@mui/material/Snackbar";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

  //section 세팅
  useEffect(() => {
    const s = sectionRef.current.getElementsByTagName("section");
    setSection(s)
  }, [])

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

  window.addEventListener("scroll", function (event) {
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
  });

  return (  
    <>
    <div ref={sectionRef}>
      {/* <MainVideo & greeting /> */}
      <section>
        <video autoPlay loop muted className={style.bgVideo}>
          <source src={`https://storage.googleapis.com/crashingdevstorage14/video/titlevideo.mp4`} type="video/mp4" />
        </video>

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
      </section>

      {/* mainpage의 intro 부분 */}
      <Intro activeBtn={activeBtn}></Intro>
    </div>
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
  </>
  )
}
export default MainPage
