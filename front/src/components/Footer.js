import Style from 'styled-components'

function Footer(){
    return (
        <FooterDiv>
            <p>Copyrightⓒ2022 by crashingdev. All Page content is property of 행복Ti</p>
        </FooterDiv>
    )
}

export default Footer

const FooterDiv = Style.div`
    padding: 20px;
    text-align: center;
    margin-top: auto;
    background-color: #E4E4E4;
`;