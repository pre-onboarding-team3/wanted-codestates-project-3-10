import { SEARCH } from '../actions';

const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH: {
      console.log(action.payload.items);
      return {
        items: action.payload.items,
      };
    }
    default:
      return state;
  }
};

export default searchReducer;
