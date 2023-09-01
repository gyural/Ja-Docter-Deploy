import React from 'react'
import styled from 'styled-components'
import HomeRight from './HomeRight';
import HomeLeft from './HomeLeft'
import HomeScreen from './HomeScreen'

const Container = styled.div`
  display: flex;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 20px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;
export default function HomePage() {

    
    return (
        <Container>

            <HomeLeft></HomeLeft>
            <HomeScreen></HomeScreen>
            <HomeRight></HomeRight>

        </Container>
    )
}
