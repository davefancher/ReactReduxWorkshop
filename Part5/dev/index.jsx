import React, { Component } from "react";
import ReactDOM from "react-dom";
import AppContainer from "./containers/appContainer.jsx";

if (process.env.NODE_ENV === "debug") {
    require("./site.scss");
}

ReactDOM.render(
    <AppContainer />,
    document.querySelector("#container")
);
