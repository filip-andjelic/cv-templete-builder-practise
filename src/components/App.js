// External dependencies
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
// Internal dependencies
import Button from './button';
import "../styles/main.css"

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (<div>
            <Button
                text="Log in"
                backgroundColor="blue"
                handleClick={() => {
                    alert('clicked');
                }}
            />
            <Button text="Sign up" backgroundColor="grey"/>
            <Button text="Quit" backgroundColor="yellow"/>
        </div>);
    }
};