// External dependencies
import React from "react";
// Internal dependencies

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
            <div className="appName text-center">
                <h2 className="anton margin-5">{this.state.appDeveloper}</h2>
                <h2 className="uppercase margin-5">{this.state.appName}</h2>
            </div>
        )
    }
};