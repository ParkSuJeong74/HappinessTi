import { useContext } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import styled from 'styled-components'
import { DispatchContext } from '../App';
import logoImg from '../srcAssets/img/crashingdevlogo-removebg.png'
import Style from '../srcAssets/style/Header.module.css'


function Header() {
  const dispatch = useContext(DispatchContext)

  const isLoggedin = sessionStorage.getItem("userToken")

  const navigate = useNavigate()
  const sampleLocation = useLocation();
  if (sampleLocation.pathname === '/login' || sampleLocation.pathname === '/signin' || sampleLocation.pathname === '/password'){
    return null;
  }

  function logoutHandler(){
    sessionStorage.removeItem("userToken")
    dispatch({
      type: 'LOGOUT'      
    })
    alert("로그아웃됐습니다!")
    navigate("/")
  }

  return (
    <>
    <HeaderNavBar>
      <Link to="/" className={Style.headerTitle}>
        <HeaderLogo>
          
          <LogoImg src={logoImg}/>
          <HeaderTitle>Happy-TI</HeaderTitle>
          
        </HeaderLogo>
      </Link>
      
      <div>

        <Link to="/teampage" className={Style.headerLink}>Team</Link>

        <Link to="/datalogs" className={Style.headerLink}>Data</Link>

        {!isLoggedin && (
        <Link to="/login" className={Style.headerLink}>LogIn</Link>)}

        {isLoggedin && 
        <Link to="/mypage" className={Style.headerLink}>Mypage</Link>}

        {isLoggedin &&
        <LogoutButton onClick={() => logoutHandler()} className={Style.headerLink}>Logout</LogoutButton>}
        
      </div>
    </HeaderNavBar>
    </>
  )

}

export default Header

const HeaderNavBar = styled.div`
  width: 94.2%;
  height: 10vh;
  padding: 4px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  background-color: rgba(0,0,0, 0.7);
  backdrop-filter: blur(8px)
`;

const LogoImg = styled.img`
  width: 130px;
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