import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
//import { BrowserRouter } from 'react-router-dom'
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import allReducer from "./reducer";
import NavigationBar from "./components/NavigationBar";
import Jumbotron from "./components/Jumbotron";
let globalState = createStore(allReducer, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={globalState}>
    <Router>
      <NavigationBar />
      <Jumbotron />
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
