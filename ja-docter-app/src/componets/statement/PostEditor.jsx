import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { createStatement, getStatementList, updatePost, updateStatement } from '../../APIs/Statemet';
const StyledPostEditor = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  height: 94%;
  h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  textarea {
      width: 95%;
      padding: 15px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
      resize: none; /* Allow vertical resizing of textarea */
      transition: border-color 0.3s ease;
      

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
        &:focus {
        outline: none;
        border-color: #F0790A;
      }
    }

    button {
      background-color: #F0790A;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      font-size: 1rem;
      cursor: pointer;
    }

`;

const PostEditor = (props) => {
  const { inheritContent = '', inheritTitle = '' , isNew = true
        , statementID, postID} = props;
  console.log(inheritContent, inheritTitle)
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    setContent(inheritContent);
    setTitle(inheritTitle);
  }, [inheritContent, inheritTitle]);
  
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    
  };
  const handleSubmit = (isNew, statementID, postID) => {
    
    if (isNew === true){
      //새로운 statement 만들기
      createStatement(title, content)

    }
    else{
      //기존 버전에서 편집
      updateStatement(statementID, title)
      updatePost(statementID, postID, content, 'editing-version')
    }
    navigate(`/statement?id=${statementID}`)
  };
  const getList = async () =>{
    const resData =  await getStatementList()
    console.log(resData)
  }
  return (
    <StyledPostEditor>
      <h2>Create a Post</h2>

      <textarea
        placeholder="Write your title..."
        value = {title}
        onChange = {handleTitleChange}
        rows = "2"
        
      >

      </textarea>
      <textarea
        rows="18"
        placeholder="Write your post..."
        value={content}
        onChange={handleContentChange}
      />
      <div className="char-count">
        {content.length} / 2000
      </div>
      <button 
      onClick={() => {
        handleSubmit(isNew, statementID, postID);
      }}
      >
        {isNew ? '등록하기' : '편집하기'}
      </button>
    </StyledPostEditor>
  );
};

export default PostEditor;
