import React from "react";

const CharacterDetail =
    props =>
        <div className="spacerTop">Details for character: {props.match.params.id}</div>;

export default CharacterDetail;
