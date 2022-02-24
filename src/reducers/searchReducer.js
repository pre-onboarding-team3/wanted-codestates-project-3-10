import { SEARCH } from '../actions';

const searchReducer = async (state = {}, action) => {
  switch (action.type) {
    case SEARCH: {
      return {
        items: action.payload.items,
      };
    }
    default:
      return state;
  }
};

export default searchReducer;
