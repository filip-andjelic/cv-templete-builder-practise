// External dependencies
import React from "react";
// Internal dependencies

export default class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (<button onClick={(e) => {
            if (this.props.clickCallback) {
                this.props.clickCallback();
            }
        }}>
            {this.props.buttonText}
        </button>);
    }
};