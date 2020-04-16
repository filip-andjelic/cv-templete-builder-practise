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
import {StoreService} from "../services/store.service";
import {ListenerService} from "../services/listener.service";

library.add(fas);

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isRemembered: Utility.getCookie("remembered"),
            userEmail: Utility.getCookie("email"),
            password: Utility.getCookie("password"),
            description: "",
            title: "",
            type: "",
            icon: "",
            showNotification: false
        };

        StoreService.initialize();
        this.listener(this);
    }

    listener(component) {
        ListenerService.hookOnChange(
            ListenerService.CHANGE_NAMES.TOGGLE_NOTIFICATION,
            'App.js',
            (config) => {
                let state = {};

                if (config) {
                    state = {
                        showNotification: true,
                        icon: config.icon,
                        title: config.title,
                        description: config.description,
                        type: config.type
                    };
                } else {
                    state = {
                        showNotification: false
                    };
                }

                component.setState(state);
            });
    }

    render() {
        const component = this;
        const {description, type, title, icon} = component.state;

        const messages = {
            mainHeader: "Hello friend",
            subHeader:
                "Ready to impress some HR managers with your astounding online CV",
        };

        return (<div id="App" className="grow-1 flex">
            {
                !!this.state.showNotification && (<Notification
                    icon={icon}
                    title={title}
                    type={type}
                    hideHandle={() => this.setState({showNotification: false})}
                    description={description}
                />)
            }

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