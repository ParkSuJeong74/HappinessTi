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
    video::-webkit-media-controls-fullscreen-button {
        display: none !important;
    }
    video::-webkit-media-controls-play-button {
        display: none !important;
    }
    video::-webkit-media-controls-timeline {
        display: none !important;
    }

    video::-webkit-media-controls-current-time-display{
        display: none !important;
    }

    video::-webkit-media-controls-mute-button {
        display: none !important;
    }

    video::-webkit-media-controls-volume-slider {
        display: none !important;
    }

    

    video::-webkit-media-controls-fullscreen-button { 
        display: none !important; 
    }





`;
