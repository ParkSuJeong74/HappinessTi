import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {withStyles} from "@material-ui/core/styles";

import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import logoImg from '../../srcAssets/img/crashingdevlogo-removebg.png';
import signin from '../../srcAssets/style/Signin.module.css';

import { useContext, useState } from "react"
import * as Api from '../../api'
import { DispatchContext } from "../../App";

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

function Signin() {
    const navigate = useNavigate()
   

    const dispatch = useContext(DispatchContext);
    
    const [email, setEmail] = useState("")
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmpassword] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            //TODO: user 로그인 api 호출!
            const res = await Api.post("users/register", {
                email,
                nickname,
                password,
            })
            const user = res.data

            console.log(res)

            const jwtToken = user.token
            sessionStorage.setItem("userToken", jwtToken)
            alert("회원가입이 성공하였습니다!")
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

        <SigninBody onSubmit={handleSubmit}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </Box>
            <Box class={signin.inputPassword}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="standard-basic" 
                    label="Password"
                    type = "password"
                    placeholder='Password'
                    variant="standard"
                    InputLabelProps={{
                        style: {color: '#FFB7C0'}
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Box class={signin.inputPasswordconfirm}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="standard-basic" 
                    label="Confirm Password"
                    type = "Password"
                    placeholder='Confirm Password'
                    variant="standard"
                    InputLabelProps={{
                        style: {color: '#FFB7C0'}
                    }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                />
            </Box>

            <div class={signin.signinButtonbox}>
                <button type='submit' class={signin.signinButton}>SIGN IN</button>

                <Box class={signin.otherButtonbox}>
                    <Link to="/login" class={signin.loginButton}>Already have account?</Link>
                    <Link to="/password" class={signin.forgotpasswordButton}>Forgot password?</Link>
                </Box>
            </div>

            
        </SigninBody>
    )
}

export default Signin;

const SigninBody = styled.form`
  
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