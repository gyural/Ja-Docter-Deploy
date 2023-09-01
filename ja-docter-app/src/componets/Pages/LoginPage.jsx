import React, { useState } from 'react'
import LoginCard from '../UI/LoginCard'
import styled from "styled-components"
import SignupCard from '../UI/SignupCard';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';
/**
 * 
 * 로그인 정상 동작을 확인하기위한 임시 컨테이너
 */
const Container = styled.div`
    display: flex;
    padding: 8px;
    height: 100vh;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
`;

const Center = styled.div`
    width: 33.33%;
    height: 100%;
    
    padding-top: 100px;
    box-sizing: border-box;
`
/**
 * 
 * 로그인 페이지 컴포넌트 
 * 
 */
export default function LoginPage() {

    /**
     * 로그인 회원가입 카드를 각각 랜더링할지 안할지를 관리하는 state 
     */
    const [loginmode, setLoginmode] = useState(true)

    /** 각 로그인 / 회원가입카드의 props로 넘겨줄 modeChange함수 */
    const handleMode = () => {
        setLoginmode(!loginmode)
    }
    return (
    
        <Container>
            <HomeLeft></HomeLeft>
            {loginmode? (
                <Center>
                <LoginCard handleMode = {handleMode}></LoginCard>
            </Center>
            ):(
                <Center>
                <SignupCard handleMode = {handleMode}></SignupCard>
            </Center>)}
            <HomeRight></HomeRight>
        </Container>
    )
}


