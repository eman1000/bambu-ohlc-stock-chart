import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import {createLogger} from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import { createBrowserHistory, createMemoryHistory } from 'history';
import rootReducer from './modules';



export default (url = '/') => {
  // history
  const history = createBrowserHistory();

  const enhancers = [];

  // Dev tools are helpful
  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  // logger
  const log = createLogger({ diff: true, collapsed: true });

  //middleware
  const middleware = [thunk, routerMiddleware(history)];
  if (process.env.NODE_ENV === 'development'){
    middleware.push(log);
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );
 
  // initial state
  const initialState =  {}; 

  const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
  }

const persistedReducer = persistReducer(persistConfig, connectRouter(history)(rootReducer))

  // Create the store
  const store = createStore(
    persistedReducer,
    initialState,
    composedEnhancers
  );
  const persistor = persistStore(store);

  return {
    store,
    history,
    persistor
  };
};
