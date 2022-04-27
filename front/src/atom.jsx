import { atom } from 'recoil';

const questState = atom({
  key: 'questState',
  default: [{
        num: 0,
        quiz: '당신의 나라를 입력해주세요! (ex. korea)',
        value: ''
    },
    {
        num: 1,
        quiz: '당신의 평균 연봉을 입력해주세요! (만 원 단위) ',
        value: 50
    },
    {
        num: 2,
        quiz: '우리가 기대하는 평균 수명을 입력해주세요 ',
        value: 50
    },
    {
        num: 3,
        quiz: '만약 문제가 생겼을 때  당신이 의지할 수 있는 가족이나 친구가 있습니까?',
        value: 50
    },
    {
        num: 4,
        quiz: '지난 몇달 동안 자선단체에 혹은 다양한 곳에 기부를 한 경험이 있나요?',
        value: 50
    }] 
});

export default questState;