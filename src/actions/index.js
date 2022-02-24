export const SEARCH = 'SEARCH';

export const search = items => {
  return {
    type: SEARCH,
    payload: {
      items,
    },
  };
};
