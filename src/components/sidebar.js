// External dependencies
import React from "react";
// Internal dependencies
import Logo from './logo';
import AppName from "./appName";
import LogInForm from "./logInForm";
import {StoreService} from "../services/store.service";

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        const loggedIn = StoreService.getStoreProperty('loginSuccess');
        const component = this;

        StoreService.hookOnStoreUpdate('sidebar.js', () => {
            const loggedIn = StoreService.getStoreProperty('loginSuccess');

            component.setState({
                loggedIn: !!loggedIn
            });
        });

        this.state = {
            loggedIn: loggedIn
        };
    }

    render() {
        const classes = this.state.loggedIn ? "tiny" : "";

        return (
            <div className={"sidebar quicksand column box-shadow-right " + classes}>
                {
                    !!this.state.loggedIn && <div>
                        NAVBAR
                    </div>
                }

                {
                    !this.state.loggedIn && <Logo/>
                }

                {
                    !this.state.loggedIn && <AppName/>
                }

                {
                    !this.state.loggedIn && <LogInForm
                        userEmail={this.props.userEmail}
                        isRemembered={this.props.isRemembered}
                        password={this.props.password}
                    />
                }
            </div>
        )
    }
};