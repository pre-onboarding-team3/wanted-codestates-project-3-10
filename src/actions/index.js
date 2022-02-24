export const SEARCH = 'SEARCH';
export const KEY_DOWN = 'KEY_DOWN';

export const search = items => {
  return {
    type: SEARCH,
    payload: {
      items,
    },
  };
};

export const keyDonw = keyword => {
  return {
    type: KEY_DOWN,
    payload: {
      keyword,
    },
  };
};
