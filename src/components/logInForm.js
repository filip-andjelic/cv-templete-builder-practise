// External dependencies
import React from "react";
import {Redirect} from "react-router-dom";
// Internal dependencies
import {Utility} from "../services/utility.service";
import Button from './button';
import TooltipWrapper from "./tooltip.wrapper";
import {ApiService} from "../services/api.service";
import {StoreService} from "../services/store.service";
import {ListenerService} from "../services/listener.service";

export default class LogInForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isRemembered: (this.props.isRemembered === "false" ? "" : "✓"),
            emailValue: (this.props.isRemembered === "false" ? "" : this.props.userEmail),
            password: (this.props.isRemembered === "false" ? "" : this.props.password),
            emailTooltip: '',
            passwordTooltip: ''
        };

        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.loginAttempt = this.loginAttempt.bind(this);
        this.remember = this.remember.bind(this);

    }

    updateEmail(e) {
        this.setState({
            emailValue: e.target.value
        });
    }

    updatePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    loginAttempt() {
        const component = this;

        if (!this.state.emailValue) {
            this.setState({
                emailTooltip: 'Please enter e-mail address!'
            });

            return;
        }
        if (!Utility.validateEmail(this.state.emailValue)) {
            this.setState({
                emailTooltip: 'Please enter valid e-mail address!'
            });

            return;
        }
        if (!this.state.password || this.state.password.length < 6) {
            this.setState({
                passwordTooltip: 'Please enter your password!'
            });

            return;
        }

        ApiService.endpoints.loginAttempt({
            email: this.state.emailValue,
            password: this.state.password
        }).then((response) => {
            if (!response || response.errorMessage) {
                const notificationConfig = {
                    icon: "exclamation-triangle",
                    title: "Login attempt failed!",
                    description: "Please provide correct credentials. If you are experiencing issues on our side please write to us via complain@oykos.me",
                    type: "important-3"
                };

                ListenerService.triggerHook(
                    ListenerService.CHANGE_NAMES.TOGGLE_NOTIFICATION,
                    notificationConfig
                );

                StoreService.updateStoreData(StoreService.getEmptyData());

                return;
            }
            if (response && response.data && response.data.user) {
                const notificationConfig = {
                    icon: "check-double",
                    title: "Log In was successful!",
                    description: "Thanks for using our CV Template builder tool. Hope you will enjoy it!",
                    type: "info-2"
                };

                component.setState({
                    redirectUrl: '/templates'
                }, () => {
                    ListenerService.triggerHook(
                        ListenerService.CHANGE_NAMES.TOGGLE_NOTIFICATION,
                        notificationConfig
                    );

                    StoreService.updateStoreProperty('loginSuccess', true);
                    StoreService.updateStoreProperty('user', response.data.user);
                });
            }
        });
    }

    remember() {
        if (this.state.isRemembered === "") {
            this.setState({isRemembered: "✓"});

            Utility.setCookie('email', this.state.emailValue, 20);
            Utility.setCookie('password', this.state.password, 20);
            Utility.setCookie('remembered', "true", 20);
        } else {
            this.setState({isRemembered: ""});

            Utility.setCookie('email', "", 1);
            Utility.setCookie('password', "", 1);
            Utility.setCookie('remembered', "false", 1);
        }
    }

    render() {
        const component = this;

        return (
            <div className="log-in-form margin-50">
                {
                    !!this.state.redirectUrl && (<Redirect to={this.state.redirectUrl}/>)
                }

                <TooltipWrapper
                    content={(<input
                        className="normal-text bg-grey-2 input"
                        value={component.state.emailValue}
                        onChange={component.updateEmail}
                        type="email"
                        placeholder="Your E-mail"
                    />)}
                    tooltip={component.state.emailTooltip}
                    position='top'
                    type='important-2'
                    hideTooltip={() => {
                        component.setState({
                            emailTooltip: ''
                        });
                    }}
                />

                <TooltipWrapper
                    content={(<input
                        className="normal-text bg-grey-2 input"
                        value={component.state.password}
                        onChange={component.updatePassword}
                        type="password"
                        placeholder="Your Password"
                    />)}
                    tooltip={component.state.passwordTooltip}
                    position='top'
                    type='important-2'
                    hideTooltip={() => {
                        component.setState({
                            passwordTooltip: ''
                        });
                    }}
                />

                <div className="remember flex capitalise text-center big-text">
                    <span className="normal-text">
                        Remember me
                    </span>
                    <div id="remember-box" className="bg-grey-2 input" onClick={this.remember}>
                        {this.state.isRemembered}
                    </div>
                </div>

                <div id="buttons" className="flex space-around margin-t-200">
                    <Button
                        icon="user-plus"
                        text="Sign Up"
                        backgroundColor="transparent"
                        handleClick={() => {
                            //this.singupAttempt();
                        }}
                    />
                    <Button
                        icon="sign-in-alt"
                        text="Log In"
                        backgroundColor="#00b2ff"
                        handleClick={() => {
                            this.loginAttempt();
                        }}
                    />
                </div>
            </div>
        )
    }
};