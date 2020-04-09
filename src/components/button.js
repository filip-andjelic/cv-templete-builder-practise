// External dependencies
import React from "react";
// Internal dependencies

export default class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    

    render() {
        const buttonStyle = {
            backgroundColor: this.props.backgroundColor,
            padding: "10px",
            borderRadius: "20%"
        };
        return (<button style={buttonStyle}>
            {this.props.text}
        </button>);
    }
};