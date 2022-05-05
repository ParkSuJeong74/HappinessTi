import { useContext } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import styled from 'styled-components'
import { DispatchContext } from '../App';
import logoImg from '../srcAssets/img/crashingdevlogo-removebg.gif'
import Style from '../srcAssets/style/Header.module.css'
import {ROUTES} from '../Route'

function Header() {
  const dispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const sampleLocation = useLocation();

  const isLoggedin = sessionStorage.getItem("userToken");

  if (sampleLocation.pathname === '/login' || sampleLocation.pathname === '/signin' || sampleLocation.pathname === '/password'){
    return null;
  }

  function logoutHandler(){
    sessionStorage.removeItem("userToken")

    dispatch({
      type: 'LOGOUT'      
    })
    alert("로그아웃됐습니다!")
    navigate(ROUTES.MAIN_PAGE.link)
  }

  return (
    <HeaderNavBar>

      <Link to={ROUTES.MAIN_PAGE.link} className={Style.headerTitle}>
        <HeaderLogo>
          
          <LogoImg src={logoImg}/>
          <HeaderTitle>Happy-TI</HeaderTitle>
          
        </HeaderLogo>
      </Link>
      
      <div>

        {!isLoggedin && (
          <Link to={ROUTES.LOGIN.link} className={Style.headerLink}>LogIn</Link>)}
        <Link to={ROUTES.DATA_LOGS.link} className={Style.headerLink}>Data</Link>
        <Link to={ROUTES.MY_PAGE.link} className={Style.headerLink}>Mypage</Link>
        <Link to={ROUTES.ABOUT.link} className={Style.headerLink}>About</Link>
        {isLoggedin &&
          <LogoutButton onClick={() => logoutHandler()} className={Style.headerLink}>Logout</LogoutButton>}
        
      </div>

    </HeaderNavBar>
  )

}

export default Header

const HeaderNavBar = styled.div`
  width: 100%;
  height: 10vh;
  padding: 45px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  background-color: rgba(0,0,0, 0.7);
  backdrop-filter: blur(8px)
`;

const LogoImg = styled.img`
  width: 90px;
  cursor: pointer;
`;

const HeaderLogo=styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const HeaderTitle = styled.span`
  text-transform: uppercase;
  font-size: 3rem;
  color: #fff;
`;

const LogoutButton = styled.span`
  cursor: pointer;
`;