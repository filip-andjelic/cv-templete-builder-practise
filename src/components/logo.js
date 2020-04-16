// External dependencies
import React from "react";
// Internal dependencies

export default class Logo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            src: "../assets/image/oykos logo.png"
        };
    }

    render() {
        return (
            <img id="logo" src={this.state.src}/>
        )
    }
};