/* import { loggerMiddleware } from "./middleware/logger"; */
/* import thunk from 'redux-thunk'; */
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* const middlewares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean); */
const middlewares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean);


const composeEnhancer = 
  (process.env.NODE_ENV !== 'production'
    && window
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
