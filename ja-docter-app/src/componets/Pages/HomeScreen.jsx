import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStatementList } from '../../APIs/Statemet';
import { Navigate, useNavigate } from 'react-router-dom';
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  max-height: 99vh;
  box-sizing: border-box;
  margin: 0 auto;
  text-align: center;
  background-color: #ffffff;
  
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  justify-content: flex-end;
`;

const Title = styled.h1`
  font-size: 40px;
  text-align: left;
  margin: 30px 0 0 50px;
`;

const InfoIcon = styled.div`
  font-size: 60px;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: gray;
  margin: 0;
`;
/**
 * '자소서 선택' 버튼
 */
const SelectButton = styled.button`
  background-color: #c9ccd1;
  color: black;
  padding: 20px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  border-radius: 10px;
`;
/**
 * '자소서 선택' 버튼 눌렀을 때의 팝업 창
 */
const Popup = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
/**
 * 팝업 안의 content
 */
const PopupContent = styled.div`
  background-color: white;
  width: 70%;
  padding: 20px;
  border-radius: 10px;
  max-height: 88vh; 
  overflow-y: auto; 
`;
/**
 * 자소서 데이터를 목록 형태로 표시
 */
const StatementList = styled.div`
  max-height : 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 20px 0;
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
/**
 * 자소서 한 개씩의 item
 */
const StatementItem = styled.div`
  width: 95%;
  border: 1px solid #ccc;
  padding:0 10px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  border-radius: 5px;
  transition: .6s;

  &:hover{
    background-color: #ccc;
    cursor: pointer;
  }
`;


function HomeScreen() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [testList, setTestList] = useState([{
    title: '로딩중 입니다',
    posts: [
      {content: '조금만 기다려주세요...'}

    ]
    }
  ])
  const navigate = useNavigate() 
  function StatementListComponent({ data }) {
      console.log(data)
      return (
        <StatementList>
          {data.map((item, index) => (
            <StatementItem key={index}
              onClick={()=>{
                navigate(`/statement?id=${item.id}`)
              }}
            >
              <h3>제목 : {item.title}</h3>
              <p>{truncateString(item.posts[0].content, 45)}</p>
            </StatementItem>
          ))}
        </StatementList>
      );
    }

  /** 페이지 첫 랜더링시만 StatementList 가져오기 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStatementList();
        setTestList(res.data);
      } catch (error) {
        // 오류 처리
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // 비동기 함수 호출
  }, []);
  /**
   * @return str[0:maxLength] + '...'
   *  최대 maxLength까지 스트링이 리턴되게
   * @param {*} str 
   * @param {*} maxLength 
   * @returns 
   */
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substr(0, maxLength) + '...';
    }
    return str;
  }


  return (
    <Container>
        <Title>실시간 무료 첨삭</Title>
        <Header>
        <InfoIcon>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50">
<path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
</svg>
        </InfoIcon>
        <InfoText>&nbsp;첨삭 중인 모든 자소서를 가져왔어요.</InfoText>
      </Header>
      
      <SelectButton onClick={() => setPopupVisible(true)}>자소서 선택 ▿</SelectButton>
      <StatementListComponent data={testList} /> {/* StatementList 렌더링 */}
      {popupVisible && (
        <Popup>
          <PopupContent>
            <h2>내 자소서들</h2>
            <StatementList>
              {testList.map((item, index) => (
                <StatementItem 
                  key={index}
                  onClick={()=>{
                    navigate(`/statement?id=${item.id}`)
                }}
                >
                  <h3
                    styled ={{
                      padding: '0',
                      margin : '0',
                    }}
                  >{item.title}</h3>
                  <p
                    styled ={{
                      padding: '0',
                      margin : '0',
                    }}
                  >{truncateString(item.posts[0].content, 20)}</p>
                </StatementItem>
              ))}
            </StatementList>
            <button onClick={() => setPopupVisible(false)}>닫기</button>
          </PopupContent>
        </Popup>
      )}
    </Container>
  );
}

export default HomeScreen;

