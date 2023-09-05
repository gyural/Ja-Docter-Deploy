import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../App";
import NewStatementIMG from "../../images/favicon2.png"
import ConsultingExpert from "../../images/expert.png"
import memberShip from "../../images/membership.png"
import readStatement from "../../images/readStatement.png"
import { getUserAuth, logOut } from '../../APIs/Auth';


const AppWrapper = styled.div`
  text-align: center;
  width: 25vw;
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
  margin-bottom: 0;
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
  border-radius: 20px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
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
  display: flex;
  gap: 10px;
  img{
    height: 30px;
    width: 30px;
  }
  &:hover{
    background-color: #ccc;
  }
`;

function HomeLeft() {
  /**UserInfo를 비동기적으로 가져오는 함수 */
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [accountID, setaccountID] = useState()
  useEffect( () => {
    const getUserInfo = async () => {
      try {
        const res = await getUserAuth();
        console.log('HomeLeft에서 받은 authInfo');
        console.log(res);

        if (res) {
          setIsLoggedIn(true);
          const accountID = res.data.email;
          setaccountID(accountID)
        } else {
          accountID = undefined;
        }
      } catch (error) {
        console.error('getUserInfo 호출 오류:', error);
      }
    };

    getUserInfo();
  }, []);
  

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
          
        </TitleWithButton>
      </Title>

      <Content>
        {isLoggedIn? (
            <>
              <div style = {{marginBottom: '18px'}}>
                {accountID}님 환영합니다
              </div>
              <LoginButton
                onClick={async() =>{
                  const res = await logOut()
                  // 페이지 새로 고침
                  window.location.reload();
                  setIsLoggedIn(false);
                  setaccountID('')
                }}
              >
                로그아웃하기
              </LoginButton>
              
            </>

          ) : (
            <LoginButton
            onClick={() =>{
              navigate("/signin")
            }}
            >로그인/가입
            </LoginButton>
          )}
        <Link
          onClick={() =>{
            navigate("/WriteStatement")
          }}
        >
          <img src={NewStatementIMG} alt="새자소서 만들기 이미지" />새 자소서 만들기</Link>
        <Link
          onClick={() =>{
            navigate("/developing")
          }}
          
          >
            <img src={ConsultingExpert} alt="전문가와 상담받기 이미지" />
            전문가 상담받기</Link>
        <Link

        onClick={() =>{
          navigate("/developing")
        }}
        >
          <img src={readStatement} alt="비슷한 자소서 열람하기 이미지" />
          비슷한 자소서 열람하기</Link>
        <Link
          onClick={() =>{
            navigate("/developing")
          }}
        >
          <img src={memberShip} alt="비슷한 자소서 열람하기 이미지" />
          멤버쉽 결제하기</Link>
      </Content>
    </AppWrapper>
  );
}

export default HomeLeft;
