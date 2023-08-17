import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import * as Sentry from "@sentry/react";

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
    // Optionally pass options
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];

const initialState = {};
// const bindMiddleware = middleware => {
//     if (process.env.NODE_ENV !== 'production') {
//         const {composeWithDevTools} = require('redux-devtools-extension');
//         return composeWithDevTools(applyMiddleware(...middleware));
//     }
//
//     return applyMiddleware(...middleware);
// };
const bindMiddleware = middleware => {
    const {composeWithDevTools} = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
};

const store = createStore(rootReducer, initialState, compose(bindMiddleware(middlewares), sentryReduxEnhancer));
sagaMiddleware.run(rootSaga);
export {store};
