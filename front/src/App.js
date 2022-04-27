import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./api";
import { loginReducer } from "./reducer";

<<<<<<< HEAD
import Header from "./components/Header";
import Home from "./screens/Home";
import Footer from "./components/Footer";
import { GlobalStyles } from "./srcAssets/style/GlobalStyle";
import { MainWrapper } from "./srcAssets/style/MainWrapper";
import Team from "./screens/Team";
import Question from "./screens/Question";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Mypage from "./screens/Mypage";
import "./srcAssets/style/Font.module.css";

import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Signin from "./screens/Signin";
import Password from "./screens/Password";
=======
import Header from "./components/Header"
import Footer from "./components/Footer"
import MainPage from "./components/mainpage/MainPage.jsx"
import Question from "./components/question/Question"
import Login from "./components/user/Login"
import Register from "./components/user/Register"
import Signin from "./components/user/Signin"
import Password from "./components/user/Password"
import Mypage from "./components/mypage/Mypage"
import Team from "./components/team/Team"

import { MainWrapper } from "./srcAssets/style/MainWrapper"
import './srcAssets/style/Font.module.css'

import { MuiThemeProvider, createTheme} from '@material-ui/core/styles';
import DataLog from "./components/datalogs/DataLog"
import Result from "./components/result/Result"
>>>>>>> 2adc76086fddc67b47a3df93b9d4ed57db4d3dce

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

<<<<<<< HEAD
  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("users/current");
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });
      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch (error) {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

=======
>>>>>>> 2adc76086fddc67b47a3df93b9d4ed57db4d3dce
  const themeMuiCore = createTheme({
    typography: {
      fontFamily: '"Elice Digital Baeum", sans-serif',
    },
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>

        <MuiThemeProvider theme={themeMuiCore}>
          <Router>
            <MainWrapper>
              <Header />
<<<<<<< HEAD
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/teampage" element={<Team />} />
                <Route path="/question" element={<Question />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/signin" element={<Register />} />
                <Route path="/password" element={<Password />} />
                <Route path="*" element={<Home />} />
              </Routes>
=======
                <Routes>
                  <Route path="/" exact element={<MainPage />} />
                  <Route path="/teampage" element={<Team/>} />
                  <Route path="/question" element={<Question />} />
                  <Route path="/question/result" element={<Result />} />
                  <Route path="/datalogs" element={<DataLog />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/mypage" element={<Mypage />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/password" element={<Password />} />
                  <Route path="*" element={<MainPage />} />
                </Routes>
>>>>>>> 2adc76086fddc67b47a3df93b9d4ed57db4d3dce
              <Footer />
            </MainWrapper>
          </Router>
        </MuiThemeProvider>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
