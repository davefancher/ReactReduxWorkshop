import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { CharacterTable } from "../../components/characters/list/characterTable.jsx";
import { CharacterDetails } from "../../components/characters/detail/characterDetails.jsx";
import ErrorMessage from "../../components/shared/errorMessage.jsx";
import IceAndFireRepository from "../../iceAndFireRepository.js";
import { fetchCharacters } from "../../actions/characters.js";

class CharacterHome extends Component {
    constructor (props) {
        super(props);

        this.state = {
            character: {
                name: "",
                aliases: []
            }
        };

        this.getPage = this.getPage.bind(this);
        this.getCharacter = this.getCharacter.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
    }

    getPage (pageInfo) {
        this.props.fetchCharacters(pageInfo);
    }

    getCharacter (characterId) {
        if (!characterId) return;

        IceAndFireRepository
            .characters
            .get(characterId)
            .then(response => this.setState({ character: response[0] }));
    }

    changePageSize (event) {
        var pageSize = parseInt(event.target.value, 10);
        var page = 1;
        this.getPage({ pageSize: pageSize, page: page });
    }

    render () {
        return (
            <div className="spacerTop">
                <Switch>
                    <Route exact
                        path={this.props.match.url}
                        render={props => (
                                <CharacterTable
                                    getPage={this.getPage}
                                    changePageSize={this.changePageSize}
                                    {...this.props} />
                            )} />
                    <Route path={`${this.props.match.url}/:id(\\d+)`}
                        render={props => (
                                <CharacterDetails
                                    getCharacter={() => this.getCharacter(parseInt(this.props.match.params.id, 10 ))}
                                    character={this.state.character}
                                    {...this.props} />
                            )} />
                    <Route render={props => <ErrorMessage message="Unable to locate the requested resource." />} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps =
    state => ({
        characters: state.characters.characters,
        pagination: state.characters.pagination,
        loading: state.characters.loading,
        errorMessage: state.characters.errorMessage
    });

export default connect(mapStateToProps, { fetchCharacters })(CharacterHome);
