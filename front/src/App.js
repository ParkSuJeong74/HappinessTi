import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./api";
import { loginReducer } from "./reducer";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/mainpage/MainPage.jsx";
import Question from "./components/question/Question";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Signin from "./components/user/Signin";
import Password from "./components/user/Password";
import Mypage from "./components/mypage/Mypage";
import Team from "./components/team/Team";

import { MainWrapper } from "./srcAssets/style/MainWrapper";
import "./srcAssets/style/Font.module.css";

import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import DataLog from "./components/datalogs/DataLog";
import Result from "./components/result/Result";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

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
              <Routes>
                <Route path="/" exact element={<MainPage />} />
                <Route path="/teampage" element={<Team />} />
                <Route path="/question" element={<Question />} />
                <Route path="/question/result" element={<Result />} />
                <Route path="/datalogs" element={<DataLog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/password" element={<Password />} />
                <Route path="*" element={<MainPage />} />
              </Routes>
              <Footer />
            </MainWrapper>
          </Router>
        </MuiThemeProvider>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
