// External dependencies
import React from "react";
// Internal dependencies

export default class Button extends React.Component {
    constructor(props) {
        super ( props );

        this.state = {
            class : "",
            href : "www.google.me"
        };
    }

    click = () => {
        (e) => {
            if (this.props.clickCallback) {
                this.props.clickCallback ();
            }
        }
            this.setState({class : "clicked"});

    }

    render() {
        return (<button onClick={this.click} className={this.state.class}>
            {this.props.buttonText}
        </button>);
    }
};