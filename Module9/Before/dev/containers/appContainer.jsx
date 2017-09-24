import React, { Component } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import LoginForm from "../components/app/loginForm.jsx";
import Home from "../components/home/home.jsx";
import Loading from "../components/shared/loading.jsx";
import ErrorMessage from "../components/shared/errorMessage.jsx";
import CharacterHome from "../containers/characters/characterHome.jsx";
import IceAndFireRepository from "../iceAndFireRepository.js";

const NavBar =
    props =>
        <ul className="list-inline navMenu">
            <li role="presentation">
                <NavLink to="/"
                         exact
                         activeClassName="active">Home</NavLink>
            </li>
            <li role="presentation">
                <NavLink to="/characters"
                         activeClassName="active">Characters</NavLink>
            </li>
        </ul>

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
        </div>

export default class AppContainer extends Component {
    constructor (props) {
        super(props);

        this.state = { isInitialized: false };
    }

    componentDidMount () {
        IceAndFireRepository
            .init()
            .then(response => { this.setState({ isInitialized: true }) });
    }
    
    render () {
        if (!this.state.isInitialized) {
            return <Loading />
        }

        return (
            <BrowserRouter>
                <div>
                    <NavBar />
                    <PageContent />
                </div>
            </BrowserRouter>
        );
    }
}
