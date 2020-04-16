// External dependencies
import React from "react";
// Internal dependencies
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const buttonStyle = {
            backgroundColor: this.props.backgroundColor,
            color: this.props.color,
            borderRadius: "8px",
            padding: "15px",
            border: "none"
        };

        return (<button
            style={buttonStyle}
            className={!!this.props.className? this.props.className+ " uppercase quicksand flex center pointer" : "uppercase quicksand flex center pointer" }
            onClick={() => {
                if (this.props.handleClick) {
                    this.props.handleClick();
                }
            }}
        >
            {
                !!this.props.icon && (<FontAwesomeIcon
                    icon={this.props.icon}
                    style={{
                        marginRight: "10px",
                        fontSize: '20px'
                    }}
                />)
            }
            <strong>{this.props.text}</strong>
        </button>);
    }
};