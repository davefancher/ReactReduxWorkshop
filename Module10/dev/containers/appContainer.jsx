import React, { Component } from "react";
import { connect } from "react-redux";
import { initializeApp } from "../actions/app.js"; 

import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import CharacterHome from "./characters/characterHome.jsx";
import Loading from "../components/shared/loading.jsx";
import Home from "../components/home/home.jsx";
import LoginForm from "../components/home/LoginForm";
import AuthWrapper from "../utility/authWrapper";

class App extends Component {
    constructor (props) {
        super(props);

        props.initializeApp();
    }

    render () {
        if (this.props.isInitialized) {
            return (
                <BrowserRouter>
                    <div>
                        <LoginForm />
                        <ul className="list-inline navMenu">
                            <li role="presentation">
                                <NavLink exact to="/" activeClassName="active">Home</NavLink>
                            </li>
                            <li role="presentation">
                                <NavLink to="/characters" activeClassName="active">Characters</NavLink>
                            </li>
                        </ul>

                        <div className="iceAndFireBody">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/characters" component={AuthWrapper(CharacterHome)} />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>)
        } else {
            return <Loading />
        }
    }
}

const mapStateToProps = 
    state => ({
        isInitialized: state.app.isInitialized
    });

const AppContainer = connect(mapStateToProps, { initializeApp })(App);

export default AppContainer;
