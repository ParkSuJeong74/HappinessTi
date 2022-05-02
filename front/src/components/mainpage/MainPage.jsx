import style from '../../srcAssets/style/Mainpage.module.css'
import Typed from 'typed.js'
import { useEffect, useRef, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Intro from './Intro.jsx'
import Snackbar from "@mui/material/Snackbar";


function MainPage() {
  const el = useRef(null)
  const typed = useRef(null)
  const sectionRef = useRef(null) 
  const [section, setSection] = useState(0)//section을 저장할 상태
  const [activeBtn, setActiveBtn] = useState(0); // 활성화된 btn 저장할 상태
  const action = <img src="3team_ad.png" style={{ height: "300px" }} />;
  // const [showPopUp, setshowPopUp] = useState(false);

  // useEffect(() => {
  //   const fuzePopUpNotShow = localStorage.getItem('fuzePopUpNotShow'); // ISO
  //   const fuzePopUpNotShowUNIX = Date.parse(fuzePopUpNotShow); // UNIX
  //   const whenWillBeExpired = fuzePopUpNotShowUNIX + 1000 * 60; // 우선 1분만

  //   const currentUNIX = Math.floor(new Date().getTime());
  //   if (Number.isNaN(fuzePopUpNotShowUNIX)) {
  //     setshowPopUp(true);
  //   }

  //   if (whenWillBeExpired < currentUNIX) {
  //     setshowPopUp(true);
  //   }
  // }, []);

  // //section 세팅
  // useEffect(() => {
  //   const s = sectionRef.current.getElementsByTagName("section");
  //   setSection(s)
  // }, [])

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
    <Snackbar
    open={true}
    autoHideDuration={6000}
    onClose={false}
    action={action}
  />
  </>
  )
}
export default MainPage



