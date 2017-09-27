import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import AppContainer from "./containers/appContainer.jsx";

if (process.env.NODE_ENV === "debug") {
    require("./site.scss");
}

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.querySelector("#container")
);
