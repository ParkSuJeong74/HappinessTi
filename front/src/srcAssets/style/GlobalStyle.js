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
    }
`;
