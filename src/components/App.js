// External dependencies
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
// Internal dependencies
import LandingScreen from "./LandingScreen";
import "../style/layout.css";
import "../style/text.css";
import "../style/colors.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        const component = this;
        const messages = {
            mainHeader: 'Hello friend',
            subHeader: 'Ready to impress some HR managers with your astounding online CV'
        };

        return (<div id="App" className="grow-1 flex">

            <LandingScreen data={messages} test={'test'}/>
        </div>);
    }
};