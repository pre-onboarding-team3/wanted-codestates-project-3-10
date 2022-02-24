import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
// import { SEARCH } from '../actions';
// import axios from 'axios';

const rootReducer = combineReducers({
  searchReducer,
});

export default rootReducer;
