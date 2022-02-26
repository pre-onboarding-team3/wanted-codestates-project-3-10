import { STORE_ITEMS } from '../actions';
import { initialState } from './initialState';

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ITEMS: {
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
