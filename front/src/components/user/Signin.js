import {Box} from '@mui/material';
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import {ROUTES} from '../../Route'
import styled from 'styled-components';
import logoImg from '../../srcAssets/img/crashingdevlogo-removebg.gif';
import style from '../../srcAssets/style/Signin.module.css';
import * as Api from '../../api'
import CssTextField from './CssTextField'
import errorHandler from '../../errorHandler';

function Signin() {
    const navigate = useNavigate()
    
    const [form, setForm] = useState({
        email: '',
        nickname: '',
        password: '',
    })

    const [confirmPassword, setConfirmpassword] = useState("")
    
    const isPasswordSame = form.password === confirmPassword

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            //user 회원가입 api 호출
            await Api.post("users/register", form)
            Swal.fire({
                position: 'top-center',
                title: '회원가입 성공!<br>로그인 해주세요!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            navigate(ROUTES.LOGIN.link)

        } catch (error) {
            errorHandler('회원가입 오류', error.response.data)
        }
    }

    return(

        <SigninBody onSubmit={handleSubmit}>
            <SigninBodyUpper>
                <Box>
                    <LogoImg src={logoImg} onClick={() => navigate(ROUTES.MAIN_PAGE.link)}/>
                </Box>
                <Box>
                    <SigninTitle>Sign In</SigninTitle>
                    <SigninTitle2>Start <span style={{color: "#FFB7C0"}}>Happy</span></SigninTitle2>
                </Box>
            </SigninBodyUpper>
            
            <Box class={style.inputEmail}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="email" 
                    name="email"
                    label="Email" 
                    placeholder='Email'
                    variant="standard"
                    required
                    InputLabelProps={{
                        style: {color: '#FFB7C0'}
                    }}
                    onChange={(e) => setForm((prev) => ({
                        ...prev, [e.target.name]: e.target.value
                    }))}  
                />
            </Box>

            <Box class={style.inputNickname}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="nickname" 
                    name="nickname"
                    label="Nickname" 
                    placeholder='Nickname'
                    variant="standard"
                    required
                    InputLabelProps={{
                        style: {color: '#FFB7C0'}
                    }}
                    onChange={(e) => setForm((prev) => ({
                        ...prev, [e.target.name]: e.target.value
                    }))}  
                />
            </Box>

            <Box class={style.inputPassword}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="password" 
                    name="password"
                    label="Password"
                    type = "password"
                    placeholder='Password'
                    variant="standard"
                    required
                    InputLabelProps={{
                        style: {color: '#FFB7C0'}
                    }}
                    onChange={(e) => setForm((prev) => ({
                        ...prev, [e.target.name]: e.target.value
                    }))}  
                />
            </Box>

            <Box class={style.inputPasswordconfirm}>
                <CssTextField
                    style = {{width: '30%'}}
                    id="confirmPassword" 
                    name="confirmPassword"
                    label="Confirm Password"
                    type = "Password"
                    placeholder='Confirm Password'
                    variant="standard"
                    required
                    InputLabelProps={{
                        style: {color: '#FFB7C0'}
                    }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmpassword(e.target.value) }
                />
                {!isPasswordSame && (
                    <h1 className={style.warning}>
                        비밀번호가 일치하지 않습니다.
                    </h1>
                )}
            </Box>

            <div class={style.signinButtonbox}>
                <button type='submit' class={style.signinButton}>SIGN IN</button>

                <Box class={style.otherButtonbox}>
                    <Link to={ROUTES.LOGIN.link} class={style.loginButton}>Already have account?</Link>
                    <Link to={ROUTES.PASSWORD.link} class={style.forgotpasswordButton}>Forgot password?</Link>
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
    width: 60px;
    cursor: pointer;

`;