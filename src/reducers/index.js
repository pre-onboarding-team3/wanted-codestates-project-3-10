import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import keyDownReducer from './keyDownReducer';

const rootReducer = combineReducers({
  searchReducer,
  keyDownReducer,
});

export default rootReducer;
