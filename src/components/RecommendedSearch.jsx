import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import styled from 'styled-components';

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
    }
  }
`;

const data = ['암', '건강', '세포', '임상', '염증', '복통'];

function RecommendedSearch() {
  return (
    <SearchResultList>
      <Recommend>추천 검색어</Recommend>
      <ul>
        {data.map((value, index) => (
          <li key={index}>
            <IoIosSearch color="black" size="20px" />
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </SearchResultList>
  );
}

export default RecommendedSearch;
