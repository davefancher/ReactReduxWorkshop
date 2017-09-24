import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import CharacterList from "../../components/characters/characterList.jsx";

const CharacterDetail =
    props =>
        <div className="spacerTop">Details for character: {props.match.params.id}</div>

export default class CharacterHome extends Component {
    render () {
        return (
            <Switch>
                <Route path={this.props.match.url} exact component={CharacterList} />
                <Route path={`${this.props.match.url}/:id(\\d+)`} component={CharacterDetail} />
                <Route render={() => <div className="alert alert-danger spacerTop">Invalid character path</div>} />
            </Switch>
        );
    }
}
