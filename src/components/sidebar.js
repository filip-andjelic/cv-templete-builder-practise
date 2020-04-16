// External dependencies
import React from "react";
// Internal dependencies
import "../styles/sidebar.css";
import Logo from './logo';
import AppName from "./appName";
import LogInForm from "./logInForm";

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar quicksand column box-shadow-right">
                <Logo/>
                <AppName/>
                <LogInForm
                    userEmail={this.props.userEmail}
                    isRemembered={this.props.isRemembered}
                    password={this.props.password}
                />
            </div>
        )
    }
};