import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {withStyles} from "@material-ui/core/styles";

import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import logoImg from '../../srcAssets/img/crashingdevlogo-removebg.png';
import signin from '../../srcAssets/style/Signin.module.css';

function Signin() {
    const navigate = useNavigate()
    const CssTextField = withStyles({
        root: {
          '& label.Mui-focused': {
            color: 'pink',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'pink',
          }, 
          width: '300px'
        },
    })(TextField);
 
    return(

        <SigninBody>
            <SigninBodyUpper>
                <Box>
                    <LogoImg src={logoImg} onClick={() => navigate("/")}/>
                </Box>
                <Box>
                    <SigninTitle>Sign In</SigninTitle>
                    <SigninTitle2>Start <span style={{color: "#FFB7C0"}}>Happy</span></SigninTitle2>
                </Box>
            </SigninBodyUpper>
            
            <Box class={signin.inputEmail}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="standard-basic" 
                    label="Email" 
                    placeholder='Email'
                    variant="standard"
                    InputLabelProps={{
                        style: {color: '#FFB7C0'}
                    }}
                />
            </Box>
            <Box class={signin.inputNickname}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="standard-basic" 
                    label="Nickname" 
                    placeholder='Nickname'
                    variant="standard"
                    InputLabelProps={{
                        style: {color: '#FFB7C0'}
                    }}
                />
            </Box>
            <Box class={signin.inputPassword}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="standard-basic" 
                    label="Password" 
                    placeholder='Password'
                    variant="standard"
                    InputLabelProps={{
                        style: {color: '#FFB7C0'}
                    }}
                />
            </Box>
            <Box class={signin.inputPasswordconfirm}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="standard-basic" 
                    label="Confirm Password" 
                    placeholder='Confirm Password'
                    variant="standard"
                    InputLabelProps={{
                        style: {color: '#FFB7C0'}
                    }}
                />
            </Box>

            <div class={signin.signinButtonbox}>
                <button type='button' class={signin.signinButton}>SIGN IN</button>

                <Box class={signin.otherButtonbox}>
                    <Link to="/login" class={signin.loginButton}>Already have account?</Link>
                    <Link to="/password" class={signin.forgotpasswordButton}>Forgot password?</Link>
                </Box>
            </div>

            
        </SigninBody>
    )
}

export default Signin;

const SigninBody = styled.div`
  
`;

const SigninBodyUpper = styled.div`
    display: flex;  
`;

const SigninTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    padding-top: 14px;
`;
const SigninTitle2 = styled.div`
    font-size: 18px;
    font-weight: 600;
    padding-top: 4px;
`;

const LogoImg = styled.img`
    width: 100px;
    cursor: pointer;

`;