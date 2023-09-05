import axios from "axios";

const api = axios.create({
    // baseURL: 'http://127.0.0.1:8000/api',
    baseURL : 'https://server.ja-doctor.net/api',

    // baseURL : '/api',
    withCredentials: true,
  });

export default api;