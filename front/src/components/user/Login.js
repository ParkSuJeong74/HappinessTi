import { useContext, useState } from "react"
import {Box} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'

import {ROUTES} from '../../Route'
import styled from 'styled-components';
import logoImg from '../../srcAssets/img/crashingdevlogo-removebg.gif';
import style from '../../srcAssets/style/Login.module.css';
import * as Api from '../../api'
import { DispatchContext } from "../../App";
import CssTextField from "./CssTextField";
import errorHandler from "../../errorHandler";

function Login() {
    const navigate = useNavigate()
    const dispatch = useContext(DispatchContext);

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            //user 로그인 api 호출!
            const res = await Api.post("users/login", form)
            const user = res.data.loginUser

            const jwtToken = user.token
            sessionStorage.setItem("userToken", jwtToken)

            alert("로그인이 성공하였습니다!")
            navigate(ROUTES.MAIN_PAGE.link)

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: user,
            });

        } catch (error) {
            errorHandler('로그인 오류', error.response.data)
        }
    }
 
    return(
        <LoginBody onSubmit={handleSubmit}>
            <LoginBodyUpper>
                <Box>
                    <LogoImg src={logoImg} onClick={() => navigate(ROUTES.MAIN_PAGE.link)}/>
                </Box>
                <Box>
                    <LoginTitle>Log In</LoginTitle>
                    <LoginTitle2>Start <span style={{color: "#FFB7C0"}}>Happy</span></LoginTitle2>
                </Box>
            </LoginBodyUpper>
            
            <Box class={style.inputEmail}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="email" 
                    name="email"
                    label="Email" 
                    placeholder='Email'
                    variant="standard"
                    InputLabelProps={{
                        style: {color: '#FFB7C0'}
                    }}
                    required   
                    onChange={(e) => setForm((prev) => ({
                        ...prev, [e.target.name]: e.target.value
                    }))}            
                />
            </Box>

            <Box class={style.inputPassword}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="standard-basic"
                    label="Password" 
                    name="password"
                    type='password'
                    placeholder='Password'
                    variant="standard" 
                    InputLabelProps={{
                        style: {color: '#FFB7C0'}
                    }}
                    required
                    onChange={(e) => setForm((prev) => ({
                        ...prev, [e.target.name]: e.target.value
                    }))}  
                />
            </Box>

            <div class={style.loginButtonbox}>
                <button type='submit' class={style.loginButton}>LOG IN</button>

                <Box class={style.otherButtonbox}>
                    <Link to={ROUTES.SIGN_IN.link} class={style.createaccountButton}>Create Account</Link>
                    <Link to={ROUTES.PASSWORD.link} class={style.forgotpasswordButton}>Forgot password?</Link>
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
    width: 60px;
    cursor: pointer;
`;