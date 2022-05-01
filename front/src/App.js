import React, { useState, useEffect, useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { loginReducer } from "./reducer";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/mainpage/MainPage.jsx";
import Question from "./components/question/Question";
import Login from "./components/user/Login";
import Signin from "./components/user/Signin";
import Password from "./components/user/Password";
import Mypage from "./components/mypage/Mypage";
import Team from "./components/team/Team";
import DataLog from "./components/datalogs/DataLog";
import Result from "./components/result/Result";

import { MainWrapper } from "./srcAssets/style/MainWrapper";
import "./srcAssets/style/Font.module.css";
import * as Api from "./api";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const res = await Api.get("users/current");
      const currentUser = res.data;
      console.log("currentUser", currentUser);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
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
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
