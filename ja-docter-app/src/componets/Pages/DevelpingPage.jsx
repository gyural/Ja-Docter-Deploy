import React from 'react'
import styled from 'styled-components'
import img1 from '../../images/docterImage1.png'
import { FadeLoader } from "react-spinners";

const override = {
  display: "flex",
  margin: "0 auto",
  borderColor: "#F0790A",
  textAlign: "center",
};
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 20px;
`;
const Title = styled.div`
    width: 33.3vw;
    color: #F0790A;
    font-size: 42px;
    font-weight: 700;
`;
const Messages = styled.div`
    width: 46vw;
    height:30vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 32px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    span{

    }
    strong{
        font-weight: 700;
        color: #F0790A;
    }
`;

const Image1 = styled.div`
    position: absolute;
    right: 200px;
    top: 100px;
    width: 300px;
    height: 300px;

    img{
        display: block;
        width: 100%;
        height: 100%;
    }
`

const Image2 = styled.div`
    width: 400px;
    height: 400px;

    span{
        position: absolute;
        top: 255px;
        left: 205px;
        color: #F0790A;
        font-weight: 600;
    }
    
`
export default function DevelpingPage() {
  return (
    <Container>
        <Title>
            자소서 닥터
        </Title>
        <Messages>
            <span>컨텐츠 <strong>준비중</strong>입니다.</span>
            <span>현재 컨텐츠가 준비중입니다.</span>
            <span>가능한 빠른 시일내에 업데이트 하겠습다.</span>
        </Messages>

        <Image1><img src={img1} alt="남자 의사 이미지" /></Image1>
        <Image2>
            <FadeLoader
                color="#F0790A"
                height = {60}
                width = {20}
                margin = {70}
                cssOverride={override}
                speedMultiplier={0.5}
                >
            </FadeLoader>
            <span>Commin Soon</span>
        </Image2>
    </Container>
  )
}
