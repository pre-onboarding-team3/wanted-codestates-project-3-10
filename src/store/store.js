// import { compose, createStore, applyMiddleware } from 'redux';
import { createStore } from 'redux';
import rootReducer from '../reducers/index';

// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const store = createStore(rootReducer);

export default store;
