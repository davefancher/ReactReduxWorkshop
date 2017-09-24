import React, { Component } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import LoginForm from "../components/app/loginForm.jsx";
import Home from "../components/home/home.jsx";
import CharacterHome from "./characters/characterHome.jsx";

const NavBar =
    props =>
        <ul className="list-inline navMenu">
            <li role="presentation">
                <NavLink to="/" exact activeClassName="active">Home</NavLink>
            </li>
            <li role="presentation">
                <NavLink to="/characters" activeClassName="active">Characters</NavLink>
            </li>
        </ul>

export default class AppContainer extends Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <NavBar />
                    <div className="iceAndFireBody">
                        <LoginForm />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/characters" component={CharacterHome} />
                            <Route render={
                                props =>
                                    <div className="spacerTop alert alert-danger">
                                        Sorry, the resource you requested ({props.location.pathname}) does not exist.
                                    </div>} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
