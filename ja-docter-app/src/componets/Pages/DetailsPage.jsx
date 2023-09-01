import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import leftimg from "../../images/left.png";
import rightimg from "../../images/right.png";
import { deleteStatement, getPostList, getStatement } from '../../APIs/Statemet';
import Chatbot from '../UI/Chatbot';
import Diff from '../../functions/Diff';
import PostEditor from '../statement/PostEditor';
import HomeLeft from './HomeLeft';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  box-sizing: border-box;
`
const StatementContainer = styled.div`
  width: 60vw;
  height: 83vh;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
`;
/**
 * 홈 > 실시간 무료 첨삭
 */
const Smalltext = styled.p`
  font-size: 14px;
  color: #495057;
  margin-left: 20px;
`;
/**
 * 자소서 박스
 */
const BoxContainer = styled.div`
  border: none;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  max-height: 89%;
  overflow-y: auto;

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

const BoxTitle = styled.h2`
  font-size: 24px;
`;

const BoxContent = styled.p`
  font-size: 16px;
  white-space: pre-line;

`;
/**
 * 구분선
 */
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
`;
/**
 * 아래 3개의 버튼
 */
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  
  background-color: ${props => props.focus ? '#868e96' : 'white'};

  color: #495057;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background-color : ${ props => { // 배경화면색상에 조건분기 하여 적용
      if (props.focus) {
        return 'white'
      }
      else {
        return '#868e96'
      }
    }};
  }
`;
/**
 * 일단 지금은 사용 안 함
 */
const ArrowContainer = styled.div`
  position: absolute;
  top: calc(50% - 20px);
  left: 20px; 
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 50px;
  cursor: pointer; 
`;
/**
 * 화살표 이미지
 */
const ArrowImage = styled.img`
  display: block;
  border-radius: 12px;
  width: 100%;
  height: auto;
`;

/**
 * 화살표와 그 아래 텍스트를 감싼 컨테이너
 */
const ImageTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: ${props => props.align || 'flex-start'};
  cursor: pointer;
  padding : 0;
  margin: 0;
  img:hover{
    background-color: #ccc;    
  }
`;
/**
 * 화살표 밑의 텍스트(이전버전..)
 */
const ArrowText = styled.p`
  font-size: 14px;
  margin-top: 5px;
`;

const ChatBotWrapper = styled.div`
  position: absolute;
  left: -490px;
  top: 20px;
`
function  DetailsPage() {
  const [id, setId] = useState()
  const [statementData, setStatementData] = useState([{
    version : '',
    content : ''
  }])
  const [focusID, setFocusID] = useState(0)
  const [postsLength, setPostLength] = useState()
  const [title, setTitle] = useState('로딩중 입니다..')
  const [diffMode, setDiffMode] = useState(false)
  const [editMode , setEditMode] = useState(false)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const statementId = searchParams.get("id");
    console.log(`렌더링 해야할 stateId = ${statementId}`);
    const fetchPostData = async () => {
      try {
        const res = await getPostList(statementId);
        // 처음버전 가져오기
        const recentPost = res.data[0]
        console.log(recentPost)
        setStatementData(res.data)
        setPostLength(res.data.length)
      } catch (error) {
        // 오류 처리
        console.error('Error fetching data:', error);
      }
    };
    
    const fetchTitleData = async () => {
      try {
        const res = await getStatement(statementId);
        const resData = res.data
        setTitle(resData)
        setId(statementId)
      } catch (error) {
        // 오류 처리
        console.error('Error fetching data:', error);
      }
    };

    fetchTitleData();
    fetchPostData(); // 비동기 함수 호출

  }, []);
  
  const handleArrowButtonClick = (targetID) => {
    if (targetID >= 0 && targetID < postsLength){
      console.log(`${targetID}로 변경`)
      setFocusID(targetID)
    }
  };

  /**
     * 자소서 내용을 복사하게 하는 함수
     */
  const copytext = async () => {
    try {
      await navigator.clipboard.writeText(statementData[focusID].content);
      alert('클립보드에 텍스트가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };
  return (
    <PageContainer>
      <HomeLeft style={{ width: '20vw' }}></HomeLeft>
      {editMode ? (
        <>
          <StatementContainer>
            <PostEditor
              inheritContent={statementData[focusID].content}
              inheritTitle={title.title}
              isNew={false}
              statementID={id}
              postID={statementData[focusID].id}
            >
            <Divider />
          <div className="char-count">
            {statementData[focusID].content.length} / 2000
          </div>
            </PostEditor>
            <Divider />
          <div className="char-count">
            {statementData[focusID].content.length} / 2000
          </div>
          <ButtonContainer>
            <Button
              focus={editMode}
              onClick={() => setEditMode(!editMode)}
            >
              편집하기
            </Button>
            <Button onClick={copytext}>복사하기</Button>
            <Button>맞춤법 검사</Button>
            <Button
              focus={diffMode}
              onClick={() => setDiffMode(!diffMode)}
            >
              수정부분 표시
            </Button>
            
          </ButtonContainer>
          </StatementContainer>
          
          
        </>
      ) : (
        <StatementContainer>
          {focusID > 0 && (
            <ImageTextContainer
              style={{
                position: 'absolute',
                bottom: '25%',
                left: '-4%',
              }}
              onClick={() => handleArrowButtonClick(focusID - 1)}
            >
              <ArrowImage src={leftimg} alt="Previous" />
              <ArrowText>이전버전</ArrowText>
            </ImageTextContainer>
          )}
          {focusID + 1 < postsLength && (
            <ImageTextContainer
              style={{
                position: 'absolute',
                bottom: '25%',
                right: '-4%',
              }}
              onClick={() => handleArrowButtonClick(focusID + 1)}
            >
              <ArrowImage src={rightimg} alt="Next" />
              <ArrowText>다음버전</ArrowText>
            </ImageTextContainer>
          )}
          <Smalltext>홈 {'>'} 실시간 무료 첨삭</Smalltext>
          <BoxContainer>
            <BoxTitle>{title.title}</BoxTitle>
            <ChatBotWrapper>
              <Chatbot
                post={statementData[focusID].content}
                statementId={id}
                newVersion={focusID + 1 === postsLength}
              ></Chatbot>
            </ChatBotWrapper>
            <div>
              <p>{'version Name :'}</p>
              <p
                style={{
                  color: '#F0790A',
                  fontWeight: '700',
                }}
              >
                {statementData[focusID].version_info}
              </p>
              {diffMode && focusID !== 0 ? (
                <Diff
                  string1={statementData[focusID - 1].content}
                  string2={statementData[focusID].content}
                  mode="words"
                ></Diff>
              ) : (
                <BoxContent>{statementData[focusID].content}</BoxContent>
              )}
            </div>
          </BoxContainer>
          <Divider />
          <div className="char-count">
            {statementData[focusID].content.length} / 2000
          </div>
          <ButtonContainer>
            <Button
              focus={editMode}
              onClick={() => setEditMode(!editMode)}
            >
              편집하기
            </Button>
            <Button onClick={copytext}>복사하기</Button>
            <Button>맞춤법 검사</Button>
            <Button
              focus={diffMode}
              onClick={() => setDiffMode(!diffMode)}
            >
              수정부분 표시
            </Button>
            <button
              style ={{
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: '700',
                backgroundColor: 'red',
                color: "#cecece",
                border: '1px solid #ccc',
                cursor: 'pointer',
                borderRadius: '10px',
              }}
              onClick = {()=>{
                deleteStatement(id, title.title)

              }
              }
            >
              삭제하기
            </button>
          </ButtonContainer>
        </StatementContainer>
      )}
    </PageContainer>
  );
  
};

export default DetailsPage;
