import React, {useState, useRef, useEffect, version} from "react";
import styled from "styled-components"
import ChatBotSwitch from "../../images/ChatBotSwitch.png";
import submitButton from "../../images/message-submit.png"
import { postGPTCall } from "../../APIs/Swagger";
import post1 from "../../VirtualData/postsample.json"
import post2 from "../../VirtualData/post2.json"
import { ToDoubleslash } from "../../functions/ToDoubleslash";
import Loading from "./Loading";
import Diff from "../../functions/Diff";
import { createpost } from "../../APIs/Statemet";
const Container = styled.div`
    width: 464px;
    height: 554px;
    position: relative;
`;

const ChattingWindow = styled.div`
    background-color: #FFF6ED;
    width: 464px;
    height: 554px;
    position: relative;

    img{
        position: absolute;
        bottom: 5px;
        right: 4px;
    }
`;

/**
 * 채팅창 전체 메시지들을 감싸는 스타일 컴포넌트
 */
const ChatAllContainer = styled.div`
    width: 100%;
    height: 92%;
    background-color: #ffffff;
    border: 1px solid #ccc;
    box-sizing: border-box;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 9px 0;
    &::-webkit-scrollbar {
     width: 10px;
    }

    &::-webkit-scrollbar-track {
    background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
    }
`;
/**
 * 채팅박스 한개를 감싸서 왼쪽 or 오른쪽으로 배치후 감싸는 컨테이너
 */
const ChatContainer = styled.div`
    width: 100%;
    margin-top: 3px;
    position: relative;
    height: fit-content;
    padding: 0 12px;
    box-sizing: border-box;
`
const ReceiveChatWrapper = styled.div`
    background-color: #ccc;
    width: fit-content;
    max-width: 240px;
    color: #000;
    padding: 4px 8px;
    border-radius: 12px;

    `;

const SendChatWrapper = styled.div`
    background-color: #F0790A;
    width: fit-content;
    max-width: 240px;
    color: #fff;
    padding: 4px 8px;
    border-radius: 12px;


`;
const ChatInput = styled.textarea`
    display: block;
    background-color: #fff;
    border: 3px solid #ccc;
    border-radius: 12px;
    min-width: 100%;
    max-height: 9%;
    padding: 10px 8px;
    padding-right: 7%;
    font-size: 18px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    
`

const ImageWrapper = styled.div`
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: 0;
    right: -60px;
    img{
        display: block;
        width: 100%;
        height: 100%;
    }
    &:hover{
        background-color: #ccc

    }
`
const ImageWrapper2 = styled.div`
    width: 8%;
    height: 9%;
    border-radius: 12px;
    box-sizing: border-box;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
    border: 2px solid #000000;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        display: block;
        position: absolute;
        right: 5px;
        bottom: 12px;
        width: 24px;
        height: 24px;
    }

    &:hover{
        background-color: #9a9a9a

    }
`;

function Chatbot(props){

    /**
     * 첨삭 받을 자소서
     */
    const targetPost = props.post
    const statementId = props.statementId
    const newVersion = props.newVersion
    /**
     * 챗봇 비/ 활성화 관리 State
     */
    const [switchOn, setSwitchOn] = useState(false)
    const [inputMessage, setInputMessage] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const startMessage = {
        isSent: true,
        timeStamp: new Date(),
        contents: "안녕하세요 자소서 닥터입니다!!! 어떤것을 도와드릴까요???" 
    }
    const [messages, setMessages] = useState([startMessage])
    const scrollToBottom = (elementRef) => {
        if (elementRef.current) {
          elementRef.current.scrollTop = elementRef.current.scrollHeight;
        }
      };
      /** 컴포넌트의 스크롤을 아래로 내려주는함수 */
    const chatContainerRef = useRef(null);
    
    useEffect(() => {
        scrollToBottom(chatContainerRef);
    }, [messages]);
        
    /**
     * 날짜 출력 형식
     */
    const options = { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false, timeZone: 'Asia/Seoul' };
    /**
     * 채팅창안에 모든 메시지를 관리하는 함수
     * 메시지 객체 형태 key값 3개임
     * {
     *  isSent : true / false
     *  timeStamp : 메시지 수/송신 시간 (Date)
     *  content : 메시지 내용 (String)
     * }
     */

    /** 
     * 챗봇을 비/활성화 스위치 관리 함수
    */
    const handleSwitch = () => {
        setSwitchOn(!switchOn)
    } 
    /**
     * input 메시지를 state로 관리하게 하는 함수
     */
    const handleChange = (e) =>{
        setInputMessage(e.target.value)
    }
    /**
     * 채팅 submit 관리 함수 
     * 제출후 messages에 추가해준다.
     */

    /**
     * 
     * @param {*} editPost 
     * @param {*} versionInfo 
     */
    const versionCreate = (editPost, versionInfo) => {
      createpost(statementId, editPost, versionInfo)
    }
    const handleSubmit = async () => {
        if (newVersion === false){
            alert('최신버전만 첨삭이 가능합니다!!')
        }
        else if (inputMessage !== ""){
            console.log(`${inputMessage} 제출`)
            const newMessage = {
                isSent: false,
                timeStamp : new Date(),
                contents: inputMessage,
            }
            setMessages([...messages, newMessage])
            console.log(`메시지들 출력`)
            setIsLoading(true)
            const order = "미래계획을 구체적으로 서술해줘"
            const res = await postGPTCall(
                ToDoubleslash(targetPost)
                , inputMessage)
                console.log('여기!!!')
                console.log(res)
            console.log(messages)
            setInputMessage("")
            if (res){
                if (res.data.output.explanation === ""){
                    const returnMessage ={
                        isSent: true,
                        timeStamp: new Date(),
                        contents: "AI가 요청을 이해하지 못했습니다 죄송합니다.",
                        preContents: "AI가 요청을 이해하지 못했습니다 죄송합니다.",
                        iserror : true,
                    }
                    setMessages([...messages, newMessage, returnMessage])
                    console.log(messages)
                    setIsLoading(false)
                }
                else{
                    // explanation === ""일 때 
                    const returnMessage ={
                        isSent: true,
                        timeStamp: new Date(),
                        contents: res.data.output.renewal_text,
                        preContents: targetPost
                    }
                    setMessages([...messages, newMessage, returnMessage])
                    console.log(messages)
                    setIsLoading(false)
                }
            }
            else{
                setIsLoading(false)

            }
        }

        
    }
    
    
    
    return (
        <Container
        style={{
            zIndex: switchOn ? '2' : '0'
          }}
        >
        {switchOn ? (
            <ChattingWindow>
                <ChatAllContainer ref={chatContainerRef}>
                        {
                            messages.map((message, idx) =>{
                                if (message.isSent) {
                                    if (message.preContents){
                                        /*diff객체를 출력하게 함 */
                                        return (
                                            <ChatContainer
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "flex-end",
                                                gap: '1px',

                                            }}>
                                            <ReceiveChatWrapper key={idx}>
                                                <Diff string1={message.preContents.replace(/\\n/g, '')} string2={message.contents} mode="words"></Diff>
                                            </ReceiveChatWrapper>
                                            <div
                                                style={{
                                                    fontSize: '10px',
                                                }}
                                            >{message.timeStamp.toLocaleDateString('en-US', options)}</div>
                                            {message.iserror !== true &&(
                                                <div>
                                                <button
                                                  style={{
                                                    border: '2px solid',
                                                    backgroundColor: '#F0790A',
                                                    color: 'white', // 텍스트 색상
                                                    padding: '8px 16px', // 여백
                                                    borderRadius: '4px', // 모서리 둥글기
                                                    cursor: 'pointer', // 포인터 커서
                                                    fontSize: '14px', // 글꼴 크기
                                                    fontWeight: 'bold', // 글꼴 굵기
                                                  }}
                                                  onMouseOver={(e) => {
                                                    e.target.style.backgroundColor = '#C05200'; // hover 시 배경색 변경
                                                  }}
                                                  onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = '#F0790A'; // hover 빠져나올 때 원래 배경색으로 변경
                                                  }}
                                                  onClick={() => {
                                                    console.log('수정본 추가 내용!!!');
                                                    console.log(message.contents);
                                                    versionCreate(message.contents, "editVersion!!")
                                                  }}
                                                >
                                                  적용하기
                                                </button>
                                              </div>
                                            )}
                                            
                                            
                                        </ChatContainer>
                                        )
                                    }
                                    else{
                                        return (
                                            <ChatContainer
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "flex-start",
                                                    alignItems: "flex-end",
                                                    gap: '1px',
    
                                                }}>
                                                <ReceiveChatWrapper key={idx}>
                                                    {message.contents}
                                                </ReceiveChatWrapper>
                                                <div
                                                    style={{
                                                        fontSize: '10px',
                                                    }}
                                                >{message.timeStamp.toLocaleDateString('en-US', options)}</div>
    
                                            </ChatContainer>
                                        );
                                    }
                                    
                                } else {
                                    return (
                                        <ChatContainer
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                alignItems: "flex-end",
                                                gap: '1px',
                                            }}>
                                            <div
                                                style={{
                                                    fontSize: '10px',
                                                }}
                                            >{message.timeStamp.toLocaleDateString('en-US', options)}</div>
                                            
                                            <SendChatWrapper key={idx}>
                                                {message.contents}
                                            </SendChatWrapper>
                                        </ChatContainer>
                                    );
                                }
                               
                        })}
                    {isLoading && 
                            <ChatContainer>
                                <ReceiveChatWrapper>
                                    <Loading></Loading>
                                </ReceiveChatWrapper>

                            </ChatContainer>
                        }
                </ChatAllContainer>
                <ChatInput
                    placeholder= {"요청사항을 입력해주세요..."}
                    value = {inputMessage}
                    onChange ={handleChange}
                    onKeyDown= {(e) =>
                        {
                            if (e.key === 'Enter') {
                                if (!e.shiftKey) {
                                    e.preventDefault(); // Enter 키의 기본 동작 막기
                                    // 여기서 메시지 전송 또는 다른 동작 수행
                                    handleSubmit()
                                    setInputMessage(''); // 메시지 입력창 비우기
                                } else {
                                    // Shift + Enter를 눌렀을 때 줄바꿈 처리
                                    setInputMessage((inputMessage) => inputMessage + '\n');
                                }
                        }}}
                        // (e) => {
                        // if (e.key === 'Enter') {
                        //     handleSubmit()
                        // }}}
                        >
                    
                </ChatInput>
                <ImageWrapper2
                        onClick={() => {
                            setInputMessage(''); // 메시지 입력창 비우기
                            handleSubmit()
                        }}
                    >
                        <img src={submitButton} alt="제출하기 이미지" />
                </ImageWrapper2>
                <ImageWrapper onClick={handleSwitch}>
                    <img src={ChatBotSwitch} alt="챗봇 스위치 이미지" />
                </ImageWrapper>
                
            </ChattingWindow>
        ) : (
            <ImageWrapper onClick={handleSwitch}>
                <img src={ChatBotSwitch} alt="챗봇 스위치 이미지" />
            </ImageWrapper>
        )}
        </Container>
    )
}

export default Chatbot;
