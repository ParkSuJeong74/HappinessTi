import { Box } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";

import { ROUTES } from "../../Route";
import logoImg from "../../srcAssets/img/crashingdevlogo-removebg.gif";
import style from "../../srcAssets/style/Password.module.css";
import * as Api from "../../api";
import CssTextField from "./CssTextField";
import errorHandler from "../../errorHandler";

function Password() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put("users/password/reset", {
        email,
      });
      console.log(res);
      Swal.fire({
        position: "top-center",
        title: "비밀번호 리셋 성공!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      /* const user = res.data;
      const jwtToken = user.token;
      console.log(res.data);
      sessionStorage.setItem("userToken", jwtToken); */
      // navigate("/");
    } catch (error) {
      errorHandler("비밀번호 리셋 오류", error.response.data);
    }
  };

  return (
    <PasswordBody onSubmit={handleSubmit}>
      <PasswordBodyUpper>
        <Box>
          <LogoImg
            src={logoImg}
            onClick={() => navigate(ROUTES.MAIN_PAGE.link)}
          />
        </Box>

        <Box>
          <PasswordTitle>Forgot your password?</PasswordTitle>
          <PasswordTitle2>
            Please enter the <span style={{ color: "#FFB7C0" }}>email</span> and
            find your <span style={{ color: "#FFB7C0" }}>Happiness</span>
          </PasswordTitle2>
        </Box>
      </PasswordBodyUpper>

      <Box class={style.inputEmail}>
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

      <div class={style.signinButtonbox}>
        <button type="submit" class={style.signinButton}>
          비밀번호 재설정
        </button>

        <Box class={style.otherButtonbox}>
          <Link to={ROUTES.LOGIN.link} class={style.loginButton}>
            Back to Login page
          </Link>
          <Link to={ROUTES.SIGN_IN.link} class={style.forgotpasswordButton}>
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
  width: 60px;
  cursor: pointer;
`;

