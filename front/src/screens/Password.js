import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../srcAssets/img/crashingdevlogo-removebg.png";
import password from "../srcAssets/style/Password.module.css";

function Password() {
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

  return (
    <PasswordBody>
      <PasswordBodyUpper>
        <Box>
          <LogoImg src={logoImg} />
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
        />
      </Box>
      <Box class={password.inputNickname}>
        <CssTextField
          style={{ width: "30%" }}
          id="standard-basic"
          label="인증번호"
          placeholder="인증번호를 입력해주세요"
          variant="standard"
          InputLabelProps={{
            style: { color: "#FFB7C0" },
          }}
        />
      </Box>
      <Box class={password.inputPassword}>
        <CssTextField
          style={{ width: "30%" }}
          id="standard-basic"
          label="Password"
          placeholder="Password"
          variant="standard"
          InputLabelProps={{
            style: { color: "#FFB7C0" },
          }}
        />
      </Box>
      <Box class={password.inputPasswordconfirm}>
        <CssTextField
          style={{ width: "30%" }}
          id="standard-basic"
          label="Confirm Password"
          placeholder="Confirm Password"
          variant="standard"
          InputLabelProps={{
            style: { color: "#FFB7C0" },
          }}
        />
      </Box>

      <div class={password.signinButtonbox}>
        <button type="button" class={password.signinButton}>
          비밀번호 변경
        </button>

        <Box class={password.otherButtonbox}>
          <Link to="/login" class={password.loginButton}>
            Back to Login page
          </Link>
          <Link to="/signin" class={password.forgotpasswordButton}>
            Back to Signin page
          </Link>
        </Box>
      </div>
    </PasswordBody>
  );
}

export default Password;

const PasswordBody = styled.div``;

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
`;
