import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";
import rootSaga from "./sagas";
import { createBrowserHistory } from "history";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";

const sagaMiddleware = createSagaMiddleware();
const browserHistory = createBrowserHistory();

const store = createStore(
  rootReducer(browserHistory),
  composeWithDevTools(
    applyMiddleware(sagaMiddleware, logger, routerMiddleware(browserHistory))
  )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
