import React, { Component } from "react";
import ReactDOM from "react-dom";

if (process.env.NODE_ENV === "debug") {
    require("./site.scss");
}

function HelloWorld (props) {
    return (
        <div>Hello {props.firstName} {props.lastName}!</div>
    )
}

ReactDOM.render(
    <HelloWorld firstName="Dave" lastName="Fancher" />,
    document.querySelector("#container")
);
