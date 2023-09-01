import React, { useState, useEffect } from 'react';
import img1 from "../../images/poster.jpg";
import styled from "styled-components"

const AppWrapper = styled.div`
  width: 33.3vw;
  height: 100vh;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  margin-left: 20px;
`;

const CenterContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageBox = styled.div`
  max-width: 100%;
  border-radius: 10px;
`;

const Image = styled.img`
  width: 250px;
  height: 380px;
  border-radius: 10px;
`;

const Title = styled.h1`
  color: orange;
  padding: 20px;
  font-size: 30px;
  font-weight: 700;
`;

const AdviceText = styled.p`
  font-size: 16px;
`;

const AccountName = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: black;
`;

function HomeRight() {
  const [advice, setAdvice] = useState("");

  const fetchAdvice = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      console.log(data)
      setAdvice(data.slip.advice);
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <AppWrapper>
      <ContentWrapper>
        <CenterContentWrapper>
          <ImageBox>
            <a href="https://naver.me/xQ8sLjDH" target="_blank" rel="noopener noreferrer">
              <Image src={img1} alt="Poster" />
            </a>
          </ImageBox>
          <div className="advice">
            <Title>오늘의 명언</Title>
            <AdviceText>"{advice}"</AdviceText>
            <AccountName>{'<'}홍길동{'>'}</AccountName>
          </div>
        </CenterContentWrapper>
      </ContentWrapper>
    </AppWrapper>
  );
}

export default HomeRight;
