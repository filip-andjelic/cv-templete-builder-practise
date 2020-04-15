// External dependencies
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// Internal dependencies
import "../style/application.scss";
import LandingScreen from "./LandingScreen";
import Sidebar from './sidebar';
import {Utility} from "../services/utility.service";
import UserData from "./userData";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import Notification from "./notification";

library.add(fas);

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isRemembered: Utility.getCookie("remembered"),
            userEmail: Utility.getCookie("email"),
            password: Utility.getCookie("password"),
            description: "This is message to our team. Don't give up!!!",
            title: "IMPORTANT",
            type: "alertColor"
        };
    }

    // changeMessage = () => {
    //   const alert = ["IMPORTANT", "HONEST", "RELAX"];
    //   const a = Math.floor(Math.random() * 3);

    //   this.colorMeassagePicker(alert[a]);
    // };
    // colorMeassagePicker(alert) {
    //   if (alert == "IMPORTANT") {
    //     this.setState({
    //       tittle: alert,
    //       description: "This is message to our team. Don't give up!!!",
    //       type: "alertColor",
    //     });
    //   } else if (alert == "HONEST") {
    //     this.setState({
    //       description:
    //         "Team, you are on the right way!!! Little more and you gona make some awesome things!!!",
    //       type: "midAlert",
    //       tittle: alert,
    //     });
    //   } else if (alert == "RELAX") {
    //     this.setState({
    //       description: "YOU ARE ALMOST DONE!!! CONGRATULATION!!!",
    //       type: "infoAlert",
    //       tittle: alert,
    //     });
    //   }
    // }

    render() {
        const component = this;
        const {description, type, title} = component.state;

        const messages = {
            mainHeader: "Hello friend",
            subHeader:
                "Ready to impress some HR managers with your astounding online CV",
        };

        return (
            <div id="App" className="grow-1 flex">
                <Notification
                    icon="fa fa-cloud"
                    title={title}
                    type={type}
                    duration={() => this.setState({type: ""})}
                    description={description}
                />
                <Router>
                    <Sidebar
                        userEmail={this.state.userEmail}
                        isRemembered={this.state.isRemembered}
                        password={this.state.password}
                    />
                    <Switch>
                        <Route exact path="/templates">
                            <div>
                                TEMPLATES SCREEN
                            </div>
                        </Route>
                        <Route exact path="/user-data">
                            <UserData/>
                        </Route>
                        <Route exact path="/">
                            <LandingScreen
                                data={messages}
                                test={"test"}
                                changeMessage={this.changeMessage}
                            />
                        </Route>
                    </Switch>
                </Router>
            </div>);
    }
};