import React, { Component } from "react";
import Loading from "../../shared/loading.jsx";
import LifeEventField from "../lifeEventField.jsx";

export const List = (props) => {
    if (props.length === 0) return null;

    const labelStyle = {
        marginRight: "3px",
        marginBottom: "3px",
        fontSize: "14px",
        display: "inline-block",
        fontWeight: "normal"
    };

    return (
        <div>
            {props.map((p, ix) => <span key={ix} style={labelStyle} className="label label-default">{p}</span>)}
        </div>
    )
}
export const PropertyGroup = (props) => {
    var content = null;

    if(props.children) {
        content = props.children;
    } else if (!props.value) {
        return null;
    } else if(Array.isArray(props.value)) {
        content = List(props.value);
    } else if (props.value.location && props.value.date) {
        content = <div>{props.value.date}<br />{props.value.location}</div>;
    } else if (props.value.location) {
        content = props.value.location;
    } else if (props.value.date) {
        content = props.value.date;
    } else {
        content = props.value;
    }

    return (
        <div>
            <dt>{props.title}:</dt>
            <dd>{content || <i className="text-muted">Unknown</i>}</dd>
        </div>
    );
};

export class CharacterDetails extends Component {
    componentDidMount () {
        this.props.getCharacter();
    }

    render () {
        if (this.props.loading) {
           return <Loading />;
        }

        var character = this.props.character;

        return (
            <div>
                <h2>{character.name ? character.name : <i>{character.aliases[0]}*</i>}</h2>
                <dl className="dl-horizontal">
                    <PropertyGroup title="Gender" value={character.gender} />
                    <PropertyGroup title="Culture" value={character.culture} />
                    <PropertyGroup title="Born">
                        <LifeEventField date={character.birthDate}
                                        location={character.birthLocation} />
                    </PropertyGroup>
                    <PropertyGroup title="Died">
                        <LifeEventField date={character.deathDate}
                                        location={character.deathLocation} />
                    </PropertyGroup>
                    <PropertyGroup title="Aliases" value={character.aliases} />
                    <PropertyGroup title="Titles" value={character.titles} />
                    <PropertyGroup title="Portrayed By" value={character.portrayedBy} />
                </dl>

                {character.name ? "" : <p className="pull-right"><small className="text-muted">* - Name unknown, using alias instead</small></p>}
            </div>
        );
    }
}
