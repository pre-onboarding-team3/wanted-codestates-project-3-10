import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Recommend = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: #919191;
  margin-bottom: 10px;
`;

const SearchResultList = styled.div`
  background-color: #ffffff;
  max-width: 700px;
  border-radius: 20px;
  padding: 20px;
  margin: auto;
  box-sizing: border-box;
  font-size: 16px;
  ul {
    li {
      display: flex;
      align-items: center;
      font-weight: bold;
      padding: 10px 0;
      span {
        margin-left: 10px;
      }
      :last-child {
        padding: 10px 0 0;
      }
    }
  }
`;

function RecommendedSearch() {
  const state = useSelector(state => state.searchReducer);

  return (
    <SearchResultList>
      {state.items?.length === 0 ? null : <Recommend>추천 검색어</Recommend>}
      <ul>
        {state.items?.map((item, index) => (
          <li key={index}>
            <IoIosSearch color="black" size="20px" />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </SearchResultList>
  );
}

export default RecommendedSearch;
