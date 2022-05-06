import {createGlobalStyle} from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyles = createGlobalStyle`
    ${reset};
    * {
        font-family: "Elice Digital Baeum", sans-serif;
    }

    html, body, * {
        font-family: "Elice Digital Baeum", sans-serif;
        box-sizing: border-box;
        scroll-behavior: smooth;
    }

    *::-webkit-scrollbar {
        width: 12px;
        height: 12px;
    }
    *::-webkit-scrollbar-track {
        background-color: #F6E7D8;
        border-radius: 10px;
    }
    *::-webkit-scrollbar-thumb {
        background-color: #FE8F8F;
        border-radius: 10px;
    }
`;
