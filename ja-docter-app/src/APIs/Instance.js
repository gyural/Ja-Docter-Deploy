import axios from 'axios';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// 여기에 토큰 추가
// instance.defaults.headers.common['Authorization'] = 'Bearer ' + YOUR_ACCESS_TOKEN;

export default instance;