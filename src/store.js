// imports
import { userReducer } from './Reducers/Users_Reducers';
import { combineReducers, createStore } from 'redux';

// combining multiple reducers
const reducers = combineReducers({
    userReducer
});

// creating store
export const appStore = createStore(reducers);