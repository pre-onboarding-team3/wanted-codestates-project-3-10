import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import RecommendedSearch from '../components/RecommendedSearch';

const Main = () => {
  const [searchWord, setSearchWord] = useState('');
  const input = useRef();

  const writeSearchWord = () => {
    setSearchWord(input.current.value);
  };

  const pressEnter = e => {
    if (e.key === 'Enter') {
      searchClick();
    }
  };

  const searchClick = () => {
    if (searchWord == null) return;
    location.replace(
      `https://clinicaltrialskorea.com/studies?condition=${searchWord}`,
    );
  };
  return (
    <MainStyle>
      <Text>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </Text>
      <Search>
        <div>
          <IoIosSearch color="#000" size="23px" />
          <input
            ref={input}
            onChange={writeSearchWord}
            type="text"
            onKeyPress={pressEnter}
            placeholder="질환명을 입력해 주세요."
          />
        </div>
        <button onClick={searchClick}>검색</button>
      </Search>
      <RecommendedSearch />
    </MainStyle>
  );
};

const MainStyle = styled.div`
  width: 100vw;
  height: 100vh;
  background: #cae9ff;
`;

const Text = styled.p`
  margin-bottom: 20px;
  padding-top: 10%;
  text-align: center;
  font-size: 2.1rem;
  font-weight: bold;
  line-height: 1.6;
`;

const Search = styled.div`
  display: flex;
  max-width: 700px;
  margin: 0 auto 10px;
  border-radius: 42px;
  overflow: hidden;
  svg {
    margin-bottom: -5px;
  }
  div {
    display: flex;
    width: 100%;
    background-color: #fff;
    padding: 20px 24px;
    input {
      font-size: 1.125rem;
      width: 100%;
      border: none;
      line-height: 1.2;
      padding-left: 10px;
      :focus {
        outline: none;
      }
      ::placeholder {
        font-weight: 600;
        color: #ccc;
      }
    }
  }
  button {
    padding: 18px 32px;
    width: 111px;
    border: none;
    background-color: #007be9;
    font-size: 1.125rem;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }
`;
export default Main;
