import React, { Component } from "react";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validationError: null,
            username: localStorage.getItem("username")
        };

        // Ensure that 'this' is defined properly for event handling
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogoff = this.handleLogoff.bind(this);
    }

    handleLogin(e) {
        var emailAddress = this.username.value;
        var password = this.password.value;

        if (emailAddress && password) {
            localStorage.setItem("username", emailAddress);
            this.setState({ username: emailAddress, validationError: null });
        } else {
            this.setState({ username: null, validationError: "There was a problem logging you in. Please check your credentials and try again." });
        }
    }

    handleLogoff(e) {
        e.preventDefault();
        localStorage.removeItem("username");
        this.setState({ username: null, validationError: null });
    }

    render () {
        if (this.state.username) {
            var buttonStyle = {
                border: "1px solid #AA0000",
                borderRadius: "5px",
                color: "#AA0000",
                fontSize: "8pt",
                fontWeight: "bold",
                padding: "7px",
                textDecoration: "none",
                textTransform: "uppercase"
            };

            return (
                <div>
                    Hello, {this.state.username}! <a href="#" onClick={this.handleLogoff} style={buttonStyle}>Log Off</a>
                </div>
            );
        }

        return (
            <div>
                {this.state.validationError
                    ? <div className="alert alert-danger">
                        {this.state.validationError}
                        </div>
                    : null }
                <div className="form-inline">
                    <div className="form-group">
                        <label htmlFor="username">User Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email Address"
                            ref={element => this.username = element} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            className="form-control"
                            ref={element => this.password = element} />
                    </div>
                    <button className="btn btn-default" onClick={this.handleLogin}>Log in</button>
                </div>
            </div>
        );
    }
}
