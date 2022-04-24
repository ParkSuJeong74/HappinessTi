import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {withStyles} from "@material-ui/core/styles";

import { Link } from 'react-router-dom'
import styled from 'styled-components';
import logoImg from '../srcAssets/img/crashingdevlogo-removebg.png';
import login from '../srcAssets/style/Login.module.css';

function Login() {
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

        <LoginBody>
            <LoginBodyUpper>
                <Box>
                    <LogoImg src={logoImg}/>
                </Box>
                <Box>
                    <LoginTitle>Log In</LoginTitle>
                    <LoginTitle2>Start <span style={{color: "#FFB7C0"}}>Happy</span></LoginTitle2>
                </Box>
            </LoginBodyUpper>
            
            <Box class={login.inputEmail}>
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
            <Box class={login.inputPassword}>
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

            <div class={login.loginButtonbox}>
                <button type='button' class={login.loginButton}>LOG IN</button>

                <Box class={login.otherButtonbox}>
                    <Link to="/signin" class={login.createaccountButton}>Create Account</Link>
                    <Link to="/password" class={login.forgotpasswordButton}>Forgot password?</Link>
                </Box>
                
            </div>

            
        </LoginBody>
    )
}

export default Login;

const LoginBody = styled.div`
`;

const LoginBodyUpper = styled.div`
    display: flex;  
`;

const LoginTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    padding-top: 14px;
`;
const LoginTitle2 = styled.div`
    font-size: 18px;
    font-weight: 600;
    padding-top: 4px;
`;

const LogoImg = styled.img`
    width: 100px;
`;