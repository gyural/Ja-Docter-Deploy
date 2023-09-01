import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const AppWrapper = styled.div`
  text-align: center;
  width: 33.3vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
`;

const Title = styled.div`
  color: orange;
  padding: 20px;
  font-size: 30px;
  font-weight: 700;
`;

const TitleWithButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px; 
`;

const LoginButton = styled.button`
  cursor: pointer;
  background-color: #E0E0E0;
  color: black;
  border: none;
  padding: 5px 10px;
  margin-left: 20px;
  border-radius: 20px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  margin-left: 20px;
`;

const Link = styled.div`
  width: 80%;
  margin: 10px 0;
  padding: 6px 9px;
  text-align: start;
  font-size: 18px;
  border-radius: 4px;
  color: black;
  cursor: pointer;

  &:hover{
    background-color: #ccc;
  }
`;

function HomeLeft() {
  const navigate = useNavigate()
  return (
    <AppWrapper>
      <Title>
        <TitleWithButton
        >
          <div
            style = {{
              cursor: 'pointer',
            }}
            onClick = {
              ()=>{
                navigate('/')
              }
            }
          >자소서 닥터</div>
          <LoginButton
            onClick={() =>{
              navigate("/signin")
            }}
          >로그인/가입</LoginButton>
        </TitleWithButton>
      </Title>
      <Content>
        <Link
          onClick={() =>{
            navigate("/WriteStatement")
          }}
        >새 자소서 만들기</Link>
        <Link
          onClick={() =>{
            navigate("/developing")
          }}
          
          >전문가 상담받기</Link>
        <Link

        onClick={() =>{
          navigate("/developing")
        }}
>비슷한 자소서 열람하기</Link>
        <Link
          onClick={() =>{
            navigate("/developing")
          }}
        >멤버쉽 결제하기</Link>
      </Content>
    </AppWrapper>
  );
}

export default HomeLeft;
