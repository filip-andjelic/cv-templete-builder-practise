// External dependencies
import React from "react";
import {Redirect} from "react-router-dom";
// Internal dependencies
import {Utility} from "../services/utility.service";
import Button from './button';
import "../styles/logInForm.css";

export default class LogInForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isRemembered: (this.props.isRemembered === "false" ? "" : "✓"),
            emailValue: (this.props.isRemembered === "false" ? "" : this.props.userEmail)
        };

        this.updateEmail = this.updateEmail.bind(this);
        this.remember = this.remember.bind(this);
    }

    updateEmail(e) {
        this.setState({
            emailValue: e.target.value
        });
    }

    remember() {
        if (this.state.isRemembered === "") {
            this.setState({isRemembered: "✓"});

            Utility.setCookie('email', this.state.emailValue, 20);
            Utility.setCookie('remembered', "true", 20);
        } else {
            this.setState({isRemembered: ""});

            Utility.setCookie('email', "", 1);
            Utility.setCookie('remembered', "false", 1);
        }
    }

    render() {
        return (
            <div className="log-in-form">
                {
                    this.state.redirectUrl && <Redirect to={this.state.redirectUrl} />
                }

                <input value={this.state.emailValue}
                       onChange={this.updateEmail}
                       type="email"
                       placeholder="Your E-mail"
                />
                <input type="password" placeholder="Your Password"/>
                <div className="remember">
                    <span>Remember me</span>
                    <div id="remember-box" onClick={this.remember}>{this.state.isRemembered}</div>
                </div>

                <Button
                    text="Log In"
                    backgroundColor="blue"
                    handleClick={() => {
                        this.setState({
                            redirectUrl: '/templates'
                        });
                    }}
                />
            </div>
        )
    }
};