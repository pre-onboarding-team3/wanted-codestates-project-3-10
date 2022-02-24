import { SEARCH } from '../actions';
import { initialState } from './initialState';

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH: {
      return {
        ...state,
        items: action.payload.items,
      };
    }
    default:
      return state;
  }
};

export default searchReducer;
