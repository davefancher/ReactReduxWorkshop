import React, { Component } from "react";
import LoginForm from "../components/app/loginForm.jsx";
import Home from "../components/home/home.jsx";
import CharacterList from "../components/characters/characterList.jsx";

export default class AppContainer extends Component {
    render () {
        return (
            <div>
                <LoginForm />
                <Home />
                <CharacterList />
            </div>
        );
    }
}
