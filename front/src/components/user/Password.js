import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import {ROUTES} from '../../Route'

import styled from "styled-components";
import logoImg from "../../srcAssets/img/crashingdevlogo-removebg.png";
import password from "../../srcAssets/style/Password.module.css";
import Swal from 'sweetalert2'

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "pink",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "pink",
    },
    width: "300px",
  },
})(TextField);

function Password() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function errorHandler(message){
    Swal.fire({
        title: '비밀번호 리셋 오류',
        text: message,
        icon: 'warning',
        showCloseButton: true,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put("users/password/reset", {
        email,
      });
      console.log(res)
      alert("비밀번호 리셋이 성공하였습니다!")
      /* const user = res.data;
      const jwtToken = user.token;
      console.log(res.data);
      sessionStorage.setItem("userToken", jwtToken); */
      // navigate("/");
    } catch (error) {
      errorHandler(error.response.data)
    }
  };

  return (
    <PasswordBody onSubmit={handleSubmit}>
      <PasswordBodyUpper>
        <Box>
          <LogoImg src={logoImg} onClick={() => navigate(ROUTES.MAIN_PAGE.link)} />
        </Box>
        <Box>
          <PasswordTitle>Forgot your password?</PasswordTitle>
          <PasswordTitle2>
            Please enter the <span style={{ color: "#FFB7C0" }}>email</span> and
            find your <span style={{ color: "#FFB7C0" }}>Happiness</span>
          </PasswordTitle2>
        </Box>
      </PasswordBodyUpper>

      <Box class={password.inputEmail}>
        <CssTextField
          style={{ width: "30%" }}
          id="standard-basic"
          label="Email"
          placeholder="Email"
          variant="standard"
          InputLabelProps={{
            style: { color: "#FFB7C0" },
          }}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <div class={password.signinButtonbox}>
        <button type="submit" class={password.signinButton}>
          비밀번호 재설정
        </button>

        <Box class={password.otherButtonbox}>
          <Link to={ROUTES.LOGIN.link} class={password.loginButton}>
            Back to Login page
          </Link>
          <Link to={ROUTES.SIGN_IN.link} class={password.forgotpasswordButton}>
            Back to Signin page
          </Link>
        </Box>
      </div>
    </PasswordBody>
  );
}

export default Password;

const PasswordBody = styled.form``;

const PasswordBodyUpper = styled.div`
  display: flex;
`;

const PasswordTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-top: 14px;
`;
const PasswordTitle2 = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding-top: 4px;
`;

const LogoImg = styled.img`
  width: 100px;
  cursor: pointer;
`;
