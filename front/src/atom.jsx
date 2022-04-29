import { atom } from 'recoil';

const questState = atom({
  key: 'questState',
  default: [{
        id: 0,
        quiz: '당신의 나라를 입력해주세요! (ex. korea)',
        value: ''
    },
    {
        id: 1,
        quiz: '당신의 평균 연봉을 입력해주세요! (만 원 단위) ',
        value: 6100
    },
    {
        id: 2,
        quiz: '우리가 기대하는 평균 수명을 입력해주세요 ',
        value: 50
    },
    {
        id: 3,
        quiz: '만약 문제가 생겼을 때  당신이 의지할 수 있는 가족이나 친구가 있습니까?',
        value: 50
    },
    {
        id: 4,
        quiz: '지난 몇달 동안 자선단체에 혹은 다양한 곳에 기부를 한 경험이 있나요?',
        value: 50
    },
    {
        id: 5,
        quiz: '(부패질문 1) 해당 내용에 대해서 자신이 생각하는 부패의 정도를 체크해주세요. ',
        value: 50
    },
    {
        id: 6,
        quiz: '(부패질문 2) 해당 내용에 대해서 자신이 생각하는 부패의 정도를 체크해주세요. ',
        value: 50
    },
    {
        id: 7,
        quiz: '(부패질문 3) 해당 내용에 대해서 자신이 생각하는 부패의 정도를 체크해주세요. ',
        value: 50
    },
    {
        id: 8,
        quiz: '(부패질문 4) 해당 내용에 대해서 자신이 생각하는 부패의 정도를 체크해주세요. ',
        value: 50
    },
    {
        id: 9,
        quiz: '(부패질문 5) 해당 내용에 대해서 자신이 생각하는 부패의 정도를 체크해주세요. ',
        value: 50
    }
    
    ] 
});

const currentNumState = atom({
    key: 'currentNumState',
    default: 0
});

export { questState, currentNumState };