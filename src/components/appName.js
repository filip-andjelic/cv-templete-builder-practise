// External dependencies
import React from "react";
// Internal dependencies
import "../styles/appName.css";
import Logo from './logo';
export default class AppName extends React.Component {
    constructor(props) {
        super ( props );

        this.state = {
            appDeveloper : "Oykos Development",
            appName : "cv builder"
        };
    }

    render() {

        return (
            <div className="appName">
                <h2>{this.state.appDeveloper}</h2>
                <h2>{this.state.appName}</h2>
            </div>


        )
    }
};