import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { DispatchContext, UserStateContext } from '../App';
import logoImg from '../srcAssets/img/crashingdevlogo-removebg.png'
import Style from '../srcAssets/style/Header.module.css'

function Header() {
  const dispatch = useContext(DispatchContext)
  const userState = useContext(UserStateContext)
  const navigate = useNavigate()

  function logoutHandler(){
    sessionStorage.removeItem("userToken")
    dispatch({
      type: 'LOGOUT'      
    })
    alert("로그아웃됐습니다!")
    navigate("/")
  }

  return (
    <HeaderNavBar>
      <Link to="/" className={Style.headerTitle}>
        <HeaderLogo>
          
          <LogoImg src={logoImg}/>
          <HeaderTitle>Happy-TI</HeaderTitle>
          
        </HeaderLogo>
      </Link>
      
      <HeaderNav>

        <Link to="/teampage" className={Style.headerLink}>Team</Link>

        {!userState.user && 
        <Link to="/login" className={Style.headerLink}>LogIn</Link>}

        <Link to="/mypage" className={Style.headerLink}>Mypage</Link>

        <LogoutButton onClick={() => logoutHandler()} className={Style.headerLink}>Logout</LogoutButton>

      </HeaderNav>
    </HeaderNavBar>

  )

}

export default Header

const HeaderNavBar = styled.div`
  height: 10vh;
  padding: 4px 50px;
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  color: #000;
  text-transform: uppercase;
  font-size: 3rem;
`;

const HeaderNav = styled.div`
`;

const LogoutButton = styled.span`
  cursor: pointer;
`;