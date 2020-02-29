import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import configureStore from "./store/configureStore";
import { ConnectedRouter } from "connected-react-router";

import "antd/dist/antd.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./index.css";
import App from "./containers/App";
import history from "./utils/history"
import * as serviceWorker from "./serviceWorker";

const mountNode = document.getElementById("root");
const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
  <ConnectedRouter history={history}>
    <Router history={history}>
      <App />
    </Router>
  </ConnectedRouter>
  </Provider>,
  mountNode
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
