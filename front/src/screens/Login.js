import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {withStyles} from "@material-ui/core/styles";

import { Link } from 'react-router-dom'
import styled from 'styled-components';
import logoImg from '../srcAssets/img/crashingdevlogo-removebg.png';
import login from '../srcAssets/style/Login.module.css';

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Api from '../api.js'
import { DispatchContext } from "../App.js";

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

function Login() {
    const navigate = useNavigate()
    const dispatch = useContext(DispatchContext);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    console.log(email)
    console.log(password)
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            //TODO: user 로그인 api 호출!
            const res = await Api.post("users/login", {
                email,
                password,
            })
            const user = res.data

            const jwtToken = user.token
            sessionStorage.setItem("userToken", jwtToken)
            alert("로그인이 성공하였습니다!")
            navigate('/')

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: user,
            });

        } catch (error) {
            alert(error.response.data)
        }
    }
 
    return(
        <LoginBody onSubmit={handleSubmit}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>

            <div class={login.loginButtonbox}>
                <button type='submit' class={login.loginButton}>LOG IN</button>

                <Box class={login.otherButtonbox}>
                    <Link to="/signin" class={login.createaccountButton}>Create Account</Link>
                    <Link to="/password" class={login.forgotpasswordButton}>Forgot password?</Link>
                </Box>
                
            </div>

            
        </LoginBody>
    )
}

export default Login;

const LoginBody = styled.form`
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