import { KEY_DOWN } from '../actions';
import { initialState } from './initialState';

const keyDownReducer = (state = initialState, action) => {
  switch (action.type) {
    case KEY_DOWN: {
      return {
        ...state,
        keyword: '',
      };
    }
    default:
      return state;
  }
};

export default keyDownReducer;
