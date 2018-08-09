import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from "connected-react-router";
import createStore from "./store";

import App from "./App/App";
//import './index.css';
import "./styles/main.css";
// Create a store and get back itself and its history object
const { store, history, persistor } = createStore();


const Application = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

const root = document.querySelector("#root");

render(Application, root);

