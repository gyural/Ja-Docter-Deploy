import axios from "axios"
import { useContext } from "react";
import api from './API'
import instance from "./Instance";
const baseURL = '/api'
// const baseURL = 'http://43.200.184.226/api'


const login = async (email, pw, isChecked) => {
    // axios를 이용하여 jwt 로그인 요청을 보낸다.
    const apiURL = baseURL + '/user/auth/'
    const requestData = {
        'email': email,
        'password': pw
    }
    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    return await instance.post(apiURL, finaldata)
    .then((response) => {
        const accessToken = response.data.token.access;
        instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        if(isChecked)
            localStorage.setItem('access_token', accessToken);
        alert('로그인 성공');
        // 벡엔드에서 httponly 쿠키로 토큰들이 전송되어 로그인됨
        // navigate('/')
    }).catch((error) => {
        console.log(error);
        alert('로그인 실패');
        throw error;
    })
}

const register = (email, pw) => {
    // axios를 이용하여 jwt 회원가입 요청을 보낸다.
    const apiURL = baseURL + '/user/register/'
    const requestData = {
        'email': email,
        'password': pw
    }
    const finaldata = JSON.stringify(requestData)
    console.log(finaldata)
    return instance.post(apiURL, finaldata)
    .then((response) => {
        console.log(response.data);
        console.log('회원가입 성공')
        return true;
        // 벡엔드에서 httponly 쿠키로 토큰들이 전송되어 로그인됨
    }).catch((error) => {
        console.log(error)
        // 백엔드에서 자동으로 리프레시 해주므로 구현할 필요없음
        alert('회원가입 실패');
        return false;
    })
}
const refresh = async () => {
    instance.post('/api/user/auth/refresh', {withCredentials:true})
    .then((response)=>{
        console.log('token refreshed');
    })
    .catch((response)=>{
        console.log(response);
        console.log('token refresh error')
    })
}

const refresh_interceptor = () => {
    
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
      
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
      
            try {
              const response = await instance.post('/api/user/token/refresh/');

              return api(originalRequest);
            } catch (error) {
              // 로그아웃
              return Promise.reject(error);
            }
          }
      
          return Promise.reject(error);
        }
      );
}
export {login, register, refresh_interceptor};