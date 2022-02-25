import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import { search, keyDown } from '../actions/index';
import { useSelector, useDispatch } from 'react-redux';
import RecommendedSearch from '../components/RecommendedSearch';
import axios from 'axios';

const Main = () => {
  const { keyword } = useSelector(state => state.keyDownReducer);
  const { items } = useSelector(state => state.searchReducer);
  const inputRef = useRef();
  const { REACT_APP_SEARCH_API } = process.env;
  const [selected, setSelected] = useState(-1);
  const dispatch = useDispatch();

  const [handleLoading, setHandleLoading] = useState(false);

  const writeSearchWord = async e => {
    //Todo : value에 공백이 추가된것도 같게본다. ex) '공   '와 '공' 전부
    const value = e.target.value.replace(/\s+$/gm, '');
    if (value === '') {
      setSelected(-1);
      dispatch(search([]));
    }
    // 캐시가 있을 때, 캐시 사용
    else if (sessionStorage.getItem(value)) {
      dispatch(search(JSON.parse(sessionStorage.getItem(value))));
    }
    // 없을 때 axios API 호출 => 세션 스토리 저장
    else if (value) {
      const URL = REACT_APP_SEARCH_API + value;
      const items = await axios.get(URL);
      sessionStorage.setItem(value, JSON.stringify(items.data.slice(0, 7)));
      dispatch(search(items.data.slice(0, 7)));
    }
    dispatch(keyDown(value));
  };

  const debounce = (callback, delay) => {
    // callback => 일정 시간이 지난 후 실행되는 함수
    // delay => 지연 시간
    let timer;
    return (...args) => {
      // 실행할 함수(setTimeout())를 취소
      setHandleLoading(true);
      clearTimeout(timer);

      // delay가 지나면 callback 함수를 실행
      timer = setTimeout(() => {
        setHandleLoading(false);
        return callback(...args);
      }, delay);
    };
  };

  const pressKey = ({ key }) => {
    if (key === 'Enter') {
      inputRef.current.value = items[selected] ? items[selected].name : keyword
      dispatch(keyDown(inputRef.current.value))     
      searchClick(inputRef.current.value);
    } else if (key === 'ArrowDown') {
      setSelected((selected + 1) % 7);
    } else if (key === 'ArrowUp') {
      setSelected(selected - 1 >= 0 ? (selected - 1) % 7 : selected + 6);
    }
  };

  const searchClick = (word=keyword) => {    
    if (!word) return;
    location.replace(
      `https://clinicaltrialskorea.com/studies?condition=${word}`,
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
            onChange={debounce(writeSearchWord, 400)}
            ref={inputRef}
            type="text"
            onKeyDown={pressKey}
            placeholder="질환명을 입력해 주세요."
          />
        </div>
        <button onClick={searchClick}>검색</button>
      </Search>
      <RecommendedSearch
        searchClick={searchClick}
        selected={selected}
        handleLoading={handleLoading}
      />
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
