import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
