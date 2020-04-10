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
            borderRadius: "8px"
        };
        return (<button
            style={buttonStyle}
            className="uppercase quicksand"
            onClick={() => {
                if (this.props.handleClick) {
                    this.props.handleClick();
                }
            }}
        >
            {this.props.text}
        </button>);
    }
};