import Style from 'styled-components'
import { useEffect, useState } from 'react';
import style from '../srcAssets/style/Mainpage.module.css'
import { Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function Footer(){
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    // window창을 제일 위로 가게 하는 함수
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    return (
        <>
        {showButton && (
            <Button onClick={scrollToTop} className={style.backToTop}>
                <ArrowUpwardIcon />
            </Button>
        )}
        
        <FooterDiv>
            <p>Copyrightⓒ2022 by crashingdev. All Page content is property of 행복Ti</p>
        </FooterDiv>
        </>
    )
}

export default Footer

const FooterDiv = Style.div`
    padding: 20px;
    text-align: center;
    margin-top: auto;
    background-color: #E4E4E4;
`;