import { HashRouter as Router, Route, Routes, Switch } from "react-router-dom";
import './App.css';
import HomePage from "./componets/Pages/HomePage";
import LoginPage from "./componets/Pages/LoginPage";
import { createContext, useState, useEffect } from "react";
import DevelpingPage from "./componets/Pages/DevelpingPage";
import DetailsPage from "./componets/Pages/DetailsPage";
import WriteStatement from "./componets/Pages/WriteStatement";
import { refresh_interceptor } from "./APIs/Auth";

const AuthContext = createContext();
function App() {
  const [authInfo, setAuthInfo] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 localStorage에서 access 토큰을 읽어옴
    const storedToken = localStorage.getItem('access_token');
    const isAuthenticated = !!storedToken; // 토큰이 존재하면 인증됨
    setAuthInfo(isAuthenticated);
    console.log(`로그인 여부 ${isAuthenticated}`)
  }, []); // 빈 배열을 전달하여 페이지 로드 시 한 번만 실행
  console.log(`authInfo : ${authInfo}`)
  refresh_interceptor();
  return (
    <AuthContext.Provider value ={[authInfo, setAuthInfo]}>
      <Router>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/signin" element={<LoginPage />}></Route>
          <Route path="/developing" element={<DevelpingPage/>}></Route>
          <Route path="/statement" element={<DetailsPage/>}></Route>
          <Route path="/WriteStatement" element={<WriteStatement/>}></Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
export {AuthContext};