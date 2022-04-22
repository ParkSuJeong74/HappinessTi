import {createGlobalStyle} from 'styled-components'
import reset from 'styled-reset'


export const GlobalStyles = createGlobalStyle`
    ${reset};
    * {
        font-family: "Elice Digital Baeum", sans-serif;
    }
`;

export const FontStyle = createGlobalStyle`

    @import url(//font.elice.io/EliceDigitalBaeum.css);

    @font-face {
        font-family: 'SANGJUDajungdagam';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/SANGJUDajungdagam.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
`;