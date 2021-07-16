import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from "redux-saga";
import watchContacts from "../sagas/contact.saga";
import ContactReducer from '../reducers/contact.reducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware()

const Store = createStore(combineReducers({
    contactReducer: ContactReducer,
}),  composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(watchContacts)

export default Store