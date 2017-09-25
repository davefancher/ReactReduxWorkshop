import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AuthReducer from "./reducers/authentication.js";
import AppContainer from "./containers/appContainer.jsx";

require("./site.scss");

const store = createStore(AuthReducer);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.querySelector("#container")
);
