import React, { Component } from "react";
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
var ReactToastr = require("react-toastr");
var { ToastContainer } = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import { connect } from 'react-redux';
import FontAwesome from "react-fontawesome";
import Loading from "../../shared/loading.jsx";
import LifeEventField from "../lifeEventField.jsx";
import IceAndFireRepository from "../../../IceAndFireRepository.js";
import renderInput from '../form/renderInput';
import renderAliasArray from '../form/renderAliasArray';
import validate from '../form/validate';

const List = (props) => {
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
const PropertyGroup = (props) => {
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

class CharacterDetails extends Component {
    constructor () {
        super();
        this.state = {
            contentEditable: false
        };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.notifySave = this.notifySave.bind(this);
    }

    toggleEdit () {
        this.setState({
            contentEditable: !this.state.contentEditable
        });
    }

    submitForm (e) {
        const character = this.props.character;
        const { gender, culture, aliases } = this.props.formFields.values;
        character.gender = gender;
        character.culture = culture;
        character.aliases = aliases;

        IceAndFireRepository
            .characters
            .store(character)
            .then(character => {
                this.toggleEdit();
                this.notifySave();
            });
    }

    notifySave () {
        this.container.success(
            "Success!",
            "Your character saved.", {
            timeOut: 5000,
            extendedTimeOut: 10000
        });
    }

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
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px' }}>
                    <h2 style={{ margin: 0 }}>
                        {character.name ? character.name : <i>{character.aliases[0]}*</i>}
                    </h2>
                    <span onClick={this.toggleEdit} style={{ cursor: 'pointer' }}>
                        Edit
                        <FontAwesome
                            name='edit'
                            style={{ marginLeft: '7px' }}
                        />
                    </span>
                </header>

                <form onSubmit={this.props.handleSubmit(this.submitForm)}>
                {
                    this.state.contentEditable ?
                        <dl className="dl-horizontal">
                            <Field
                                title="Gender"
                                name="gender"
                                component={renderInput}
                            />
                            <Field
                                title="Culture"
                                name="culture"
                                component={renderInput}
                            />
                            <Field
                                title="Born"
                                name="born"
                                component={renderInput}
                            />
                            <Field
                                title="Died"
                                name="died"
                                component={renderInput}
                            />
                            <FieldArray
                                title="Alias"
                                name="aliases"
                                component={renderAliasArray}
                            />
                            <Field
                                title="Titles"
                                name="titles"
                                component={renderInput}
                            />
                            <Field
                                title="Portrayed By"
                                name="portrayed-by"
                                component={renderInput}
                            />
                            <dt></dt>
                            <dd><button className="btn btn-primary">Save</button></dd>
                        </dl>  :
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
                }
                </form>

                {character.name ? "" : <p className="pull-right"><small className="text-muted">* - Name unknown, using alias instead</small></p>}

                <ToastContainer ref={(input) => {this.container = input;}}
                    toastMessageFactory={ToastMessageFactory}
                    className="toast-top-right"
                />
            </div>
        );
    }
}


let CharacterDetailsForm = reduxForm({
    form: 'characterForm',
    enableReinitialize: true,
    validate
  })(CharacterDetails);

CharacterDetailsForm = connect(
  (state, props) => {

    let initialValues = {};

    const {
        aliases,
        portrayedBy,
        titles,
        birthDate,
        culture,
        deathDate,
        gender,
        name
    } = state.characters.character;

    initialValues = {
        aliases,
        "portrayed-by": portrayedBy,
        titles,
        born: birthDate,
        culture,
        died: deathDate,
        gender,
        name: name || "Unknown"
    };

    return {
        initialValues,
        formFields: state.form.characterForm
    };
  }
)(CharacterDetailsForm);

export default CharacterDetailsForm;
