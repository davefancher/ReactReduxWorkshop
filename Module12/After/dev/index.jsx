import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import reducers from "./reducers";
import AppContainer from "./containers/appContainer.jsx";

if (process.env.NODE_ENV === "debug") {
    require("./site.scss");
}

const store =
    createStore(
        reducers,
        applyMiddleware(thunkMiddleware)
    );

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.querySelector("#container")
);
