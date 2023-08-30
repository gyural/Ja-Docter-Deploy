import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Chatbot from './componets/UI/Chatbot';
import Diffmark from './componets/UI/Diffmark';
import HomeRight from './componets/Pages/HomeRight';
import HomeLeft from './componets/Pages/HomeLeft';
import HomeScreen from './componets/Pages/HomeScreen';
import DetailsPage from './componets/Pages/DetailsPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
