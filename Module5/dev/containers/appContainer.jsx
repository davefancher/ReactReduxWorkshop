import React, { Component } from "react";
import LoginForm from "../components/app/loginForm.jsx";
import Home from "../components/home/home.jsx";

export default class AppContainer extends Component {
    render () {
        return (
            <div>
                <LoginForm />
                <Home />
            </div>
        );
    }
}
