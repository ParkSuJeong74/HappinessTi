import { Link } from 'react-router-dom';
import styled from 'styled-components'
import logoImg from '../srcAssets/img/crashingdevlogo-removebg.png'
import Style from '../srcAssets/style/Header.module.css'

function Header() {

  return (
    <HeaderNavBar>
      <Link to="/" className={Style.headerTitle}>
      <HeaderLogo>
        
          <LogoImg src={logoImg}/>
          <HeaderTitle>Happy-TI</HeaderTitle>
        
      </HeaderLogo>
      </Link>
      
      <HeaderNav>
        <Link to="/" className={Style.headerLink}>Team</Link>

        <Link to="/" className={Style.headerLink}>LogIn</Link>

        <Link to="/" className={Style.headerLink}>Logout</Link>

      </HeaderNav>
    </HeaderNavBar>

  )

}

export default Header

const HeaderNavBar = styled.div`
  height: 10vh;
  padding: 4px 50px;
  border: 1px solid black;
  box-shadow: 0 4px 4px -2px lightgray;
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
