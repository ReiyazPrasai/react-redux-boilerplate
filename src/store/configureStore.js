import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { applyMiddleware, compose, createStore } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

import createRootReducer from "../reducers";

const configureStoreProd = (initialState = {}, history) => {
  const middlewares = [thunk, routerMiddleware(history)];

  return createStore(
    createRootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
};

const configureStoreDev = (initialState = {}, history) => {
  const middlewares = [
    reduxImmutableStateInvariant(),
    thunk,
    routerMiddleware(history)
  ];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
};

const configureStore = (initialState = {}, history) => {
  return process.env.NODE_ENV === "production"
    ? configureStoreProd(initialState, history)
    : configureStoreDev(initialState, history);
};

export default configureStore;
