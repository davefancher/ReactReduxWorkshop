import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as IceAndFire from "../../iceAndFireRepository.js";

const CharacterListItem =
    props =>
        <li>
            <Link to={`${props.location.pathname}${props.character.id}`}>
                {props.character.name}
            </Link>
        </li>

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
                {this.state.characters.map((c, ix) =>
                    <CharacterListItem
                        key={ix}
                        character={{ id: ix, name: c.name }}
                        {...this.props} />
                )}
            </ul>
        );
    }
}
