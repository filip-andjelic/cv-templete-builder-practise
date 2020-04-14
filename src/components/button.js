// External dependencies
import React from "react";
// Internal dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const buttonStyle = {
            backgroundColor: this.props.backgroundColor,
            padding: "10px",
            borderRadius: "8px",
            padding: "15px",
            border: "none"
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
            <FontAwesomeIcon icon={this.props.icon} style={{marginRight: "5px"}}/>
            {this.props.text}            
        </button>);
    }
};