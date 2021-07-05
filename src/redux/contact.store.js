import { createStore, combineReducers } from 'redux';
import ContactReducer from './contact.reducer';

const Store = createStore(combineReducers({
    ContactReducer: ContactReducer,
}))

export default Store