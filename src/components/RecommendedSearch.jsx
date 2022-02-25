import React from 'react';
import { useSelector } from 'react-redux';
import { IoIosSearch } from 'react-icons/io';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

      &.selected {
        background-color: #ddd;
      }

      :hover {
        cursor: pointer;
        background-color: #eee;
      }

      span {
        margin-left: 10px;
      }
    }
  }
`;

function RecommendedSearch({ selected }) {
  const { items } = useSelector(state => state.searchReducer);
  console.log(items)
  console.log(selected)

  const clickKeyword = () => {

  }

  return (
    <>
      {items.length === 0 ? null : (
        <SearchResultList>
          <Recommend>추천 검색어</Recommend>
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                className={index === selected ? 'selected' : ''}
                tabIndex="0"
              >
                <IoIosSearch color="black" size="20px" />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </SearchResultList>
      )}
    </>
  );
}

RecommendedSearch.propTypes = {
  selected: PropTypes.number,
};

export default RecommendedSearch;
