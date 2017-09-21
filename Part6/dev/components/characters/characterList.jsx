import React, { Component } from "react";
import * as IceAndFire from "../../iceAndFireRepository.js";

export default class CharacterList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            characters: []
        };
    }

    componentDidMount () {
        IceAndFire
            .getCharacters(1, 25)
            .then(
                response =>
                    this.setState({
                        characters: response
                    }));
    }

    render () {
        return (
            <ul>
                {this.state.characters.map((c, ix) => <li key={ix}>{c.name}</li>)}
            </ul>
        );
    }
}
