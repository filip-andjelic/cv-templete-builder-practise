// External dependencies
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
// Internal dependencies
import Button from './button';
import Sidebar from './sidebar';
import {Utility} from "../services/utility.service";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isRemembered: Utility.getCookie("remembered"),
            userEmail: Utility.getCookie("email")
        };
    }

    render() {
        return (<div style={{background: "url('assets/image/blue-ice.jpg')", backgroundSize: "cover"}}>
                <Sidebar
                    userEmail={this.state.userEmail}
                    isRemembered={this.state.isRemembered}
                />
            </div>
        )
    }
};