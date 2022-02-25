import React from 'react';
import { useSelector } from 'react-redux';
import { IoIosSearch } from 'react-icons/io';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Recommend = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: #919191;
  margin-bottom: ${props => (props.handleLoading ? '0px' : '10px')};
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

      span {
        margin-left: 10px;
      }
    }
  }
`;


function RecommendedSearch({ selected, handleLoading }) {
  const { items } = useSelector(state => state.searchReducer);

  return (
    <>
      {handleLoading ? (
        <SearchResultList>
          <Recommend handleLoading={handleLoading}>검색 중..</Recommend>
        </SearchResultList>
      ) : items.length === 0 ? null : (
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
  handleLoading: PropTypes.bool,
  selected: PropTypes.number,
};

export default RecommendedSearch;
