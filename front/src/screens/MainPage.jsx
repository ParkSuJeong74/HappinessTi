import styled from 'styled-components'
import bgImg from '../srcAssets/img/main-Img.png'

function MainPage() {
  return (
    <>
    <MainImg>
    </MainImg>
    <div>안녕????</div>
    </>
  )
}
export default MainPage

const MainImg = styled.div`
  background-image: url(${bgImg});
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: -1;
  opacity: 0.8;
  background-size: cover;
  background-position: 50%;
`;


