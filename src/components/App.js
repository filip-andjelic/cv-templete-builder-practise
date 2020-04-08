// External dependencies
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
// Internal dependencies
import Button from './button';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isComponentVisible: true,
            text: 'Button Text #1'
        };
    }

    handleElementClick(component, e) {
        component.setState({
            text: 'Button TEXT #2'
        });
    }
    buttonHandle() {
        alert('app js handle');
    }

    render() {
        const component = this;
        const nekiState = this.state.nekiState;

        return (<div id="App" onClick={(e) => component.handleElementClick(component, e)}>
            <h1>Neki tekst</h1>
            <h2>{this.props.nekiProperti}</h2>

            {
                !!this.state.isComponentVisible && (<h3>{nekiState}</h3>)
            }

            <Button buttonText={this.state.text} clickCallback={this.buttonHandle} />
        </div>);
    }
};