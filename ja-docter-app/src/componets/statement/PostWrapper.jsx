import React, { useState } from 'react'
import styled from 'styled-components'
import post1 from '../../VirtualData/postsample.json'
import post2 from '../../VirtualData/postEditSample.json'
import Button from '../UI/Button'
const Container = styled.div`
    width: 33.3vw;
    padding: 15px;
    
`;

const ContentWrapper = styled.textarea`
    width: 100%;
    min-height: 30vw;
    max-height: 50vw;
    outline: none;
    overflow-y: scroll;
    margin-bottom: 40px;
`;

const Line = styled.div`
    width: 98%;
    height: 1px;
    background-color: #000;
    margin: 0 auto;
    
`

const ButtonWrappder = styled.div`
    width: fit-content;
    display: flex;
    justify-content: flex-start;
`
export default function PostWrapper() {
    const [contents, setContents] = useState(post1.content)
    return (
        <Container>
            <div>홈 &gt; 실시간 무료 첨삭</div>
            <div
                styled ={{
                    fontSize : '36px',
                    fontWeight : '700'
                }}
            >자소서 제목</div>
            <div
                styled = {{
                    color : '#7D7C7C',
                }}
            >전00 5분전</div>
            <ContentWrapper>
                {contents}
            </ContentWrapper>

            <Line></Line>

            <ButtonWrappder>
                <Button
                    
                    title = {'편집하기'}
                    ></Button>
                <Button
                    title = {'맞춤법 검사'}
                    
                    ></Button>
                <Button
                    title = {'수정하기'}
                
                ></Button>
                <Button
                    title = {'수정표시'}
                ></Button>
            </ButtonWrappder>
        </Container>
    )
}
