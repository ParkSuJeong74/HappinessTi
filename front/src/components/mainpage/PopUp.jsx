import React from 'react';

interface IPopUpProps {
  showPopUp: boolean;
  setshowPopUp: Function;
}

function PopUp({ showPopUp, setshowPopUp }: IPopUpProps) {
  const onPopUpNotShot = () => {
    // logic
  };

  return (
    <>
      {showPopUp ? (
        <S.Wrapper>
          <S.ImageWrapper className="notice-img">
            <img src="3team_ad.png" alt="" />
          </S.ImageWrapper>
          <S.TodayWrapper className="todays">
            <button className="today-not-show" onClick={onPopUpNotShot}>
              오늘 하루 보지 않기
            </button>
            <button className="close" onClick={() => setshowPopUp(false)}>
              닫기
            </button>
          </S.TodayWrapper>
        </S.Wrapper>
      ) : (
        ''
      )}
    </>
  );
}

export default PopUp;