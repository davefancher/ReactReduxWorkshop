import React, { Component } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { initializeApp } from "../actions/app.js";
import Loading from "../components/shared/loading.jsx";
import ErrorMessage from "../components/shared/errorMessage.jsx";
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
        </ul>;

const PageContent =
    props =>
        <div className="iceAndFireBody">
            <LoginForm />
            <Switch>
                <Route exact
                       path="/"
                       component={Home} />
                <Route path="/characters"
                       render={props => (
                           <CharacterHome
                                pageSize="25"
                                {...props} />)} />
                <Route render={
                    props =>
                        <ErrorMessage message={`Sorry, the resource you requested (${props.location.pathname}) does not exist.`} /> } />
            </Switch>
        </div>;

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
                        <NavBar />
                        <PageContent />
                    </div>
                </BrowserRouter>)
        } 
        
        return <Loading />
    }
}

const mapStateToProps =
    state => ({
        isInitialized: state.app.isInitialized
    });

const AppContainer = connect(mapStateToProps, { initializeApp })(App);

export default AppContainer;
