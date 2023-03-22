import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
/* import { loggerMiddleware } from "./middleware/logger"; */

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

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

export const persistor = persistStore(store);
