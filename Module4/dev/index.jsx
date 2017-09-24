import React, { Component } from "react";
import ReactDOM from "react-dom";
import LoginForm from "./components/app/loginForm.jsx";

require("./site.scss");

ReactDOM.render(
    <LoginForm />,
    document.querySelector("#container")
);
