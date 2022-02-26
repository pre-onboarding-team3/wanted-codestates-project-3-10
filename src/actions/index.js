import axios from 'axios';

export const STORE_ITEMS = 'STORE_ITEMS';
export const KEY_DOWN = 'KEY_DOWN';

export const search = value => async dispatch => {
  try {
    const URL = process.env.REACT_APP_SEARCH_API + value;
    const items = await axios.get(URL);
    sessionStorage.setItem(value, JSON.stringify(items.data.slice(0, 7)));
    dispatch(storeItems(items.data.slice(0, 7)));
  } catch (err) {
    console.log(err);
  }
};

export const storeItems = items => {
  return {
    type: STORE_ITEMS,
    payload: {
      items,
    },
  };
};

export const keyDown = keyword => {
  return {
    type: KEY_DOWN,
    payload: {
      keyword,
    },
  };
};
