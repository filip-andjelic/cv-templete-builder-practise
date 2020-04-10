// External dependencies
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
// Internal dependencies
import LandingScreen from "./LandingScreen";
import Sidebar from './sidebar';
import {Utility} from "../services/utility.service";
import "../style/layout.css";
import "../style/text.css";
import "../style/colors.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isRemembered: Utility.getCookie("remembered"),
            userEmail: Utility.getCookie("email"),
            password: Utility.getCookie("password")
        };
    }

    render() {
        const component = this;
        const messages = {
            mainHeader: 'Hello friend',
            subHeader: 'Ready to impress some HR managers with your astounding online CV'
        };

        return (<div id="App" className="grow-1 flex">
            <Router>
                <Sidebar
                    userEmail={this.state.userEmail}
                    isRemembered={this.state.isRemembered}
                    password = {this.state.password}
                />

                <Switch>
                    <Route exact path="/templates">
                        <div>
                            TEMPLATES SCREEN
                        </div>
                    </Route>
                    <Route exact path="/">
                        <LandingScreen data={messages} test={'test'}/>
                    </Route>
                </Switch>
            </Router>
        </div>);
    }
};