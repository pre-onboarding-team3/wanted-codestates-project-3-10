import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { keyDown } from '../actions/index';
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
        background-color: #eee;
      }

      :hover {
        cursor: pointer;
        background-color: #eee;
      }

      p {
        margin-left: 10px;
      }
    }
  }
`;

function RecommendedSearch({ selected, searchClick }) {
  const { items } = useSelector(state => state.searchReducer);
  const dispatch = useDispatch();

  const clickKeyword = (e) => {
    dispatch(keyDown(e.target.textContent))
    searchClick(e.target.textContent);    
    // console.log(e.target.textContent, searchClick)
    // console.log('클릭됨', e.target.value)
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
                onClick={clickKeyword}
              >
                <IoIosSearch color="black" size="20px" />
                <p>{item.name}</p>
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
  searchClick: PropTypes.func,
};

export default RecommendedSearch;
