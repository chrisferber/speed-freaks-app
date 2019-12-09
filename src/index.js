import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'; // imports redux to create redux store
import { Provider } from 'react-redux'; // Wrapper around App component to give all child components access to redux store
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'; // Saga middleware that logs redux state updates to console

import rootReducer from './redux/reducers'; // imports ./redux/reducers/index.js
import rootSaga from './redux/sagas'; // imports ./redux/sagas/index.js

import App from './components/App/App'; // Root component to render

const sagaMiddleware = createSagaMiddleware();

// logger will only be added to project if in development mode to avoid large amount of console.log's in production code
const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];

const store = createStore(
  // tells the saga middleware to use the rootReducer
  // rootSaga contains all of our other reducers
  rootReducer,
  // adds all middleware to our project including saga and logger
  applyMiddleware(...middlewareList),
);

// tells the saga middleware to use the rootSaga
// rootSaga contains all other sagas
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root'),
);
