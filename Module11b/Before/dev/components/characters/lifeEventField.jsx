import React, { Component } from "react";

const LifeEventField =
    (props) =>
    {
        if (props.date && props.location) {
            return <div>{props.date} <small className="text-muted">({props.location})</small></div>;
        }
        
        if (props.date) {
            return <div>{props.date}</div>;
        }

        if (props.location) {
            return <div>{props.location}</div>;
        }

        return <div></div>;
    };

export default LifeEventField;
