import React, { Component } from "react";
import ReactDOM from "react-dom";

if (process.env.NODE_ENV === "debug") {
    require("./site.scss");
}

const getUserInfo = (firstName, lastName) =>
    ({
        firstName: "Dave",
        lastName: "Fancher"
    });

function HelloWorld (props) {
    return (
        <div>Hello {props.user.firstName} {props.user.lastName}!</div>
    )
}

ReactDOM.render(
    <HelloWorld user={getUserInfo()} />,
    document.querySelector("#container")
);
