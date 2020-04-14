// External dependencies
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Internal dependencies
import LandingScreen from "./LandingScreen";
import Sidebar from "./sidebar";
import { Utility } from "../services/utility.service";
import "../style/application.scss";
import Notification from "./notification";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRemembered: Utility.getCookie("remembered"),
      userEmail: Utility.getCookie("email"),
      password: Utility.getCookie("password"),
      alertText: "MESSAGE FROM ABOVE",
      notification: "warning"
    };
  }
  colorMeassagePicker(alert) {
    if (alert == "warning") {
      this.setState({
        alertText: "nije to bas najbolje"
        //   alertColor:  "alertColor"
      });
      return "alertColor";
    } else if (alert == "littlewarning") {
      this.setState({
        alertText: "sad je bolje ali nije jos kako treba",
        alertColor: "midAlert"
      });
    } else if (alert == "infowarning") {
      this.setState({
        alertText: "sad je bas kako treba",
        alertColor: "infoAlert"
      });
    }
  }

  render() {
    const component = this;
    const messages = {
      mainHeader: "Hello friend",
      subHeader:
        "Ready to impress some HR managers with your astounding online CV"
    };

    return (
      <div id="App" className="grow-1 flex">
        <Notification
          description={component.state.notification}
          type={() => this.colorMessagePicker(component.state.notification)}
          duration={() => console.log("hi")}
          text={component.state.alertText}
        />
        <Router>
          <Sidebar
            userEmail={this.state.userEmail}
            isRemembered={this.state.isRemembered}
            password={this.state.password}
          />

          <Switch>
            <Route exact path="/templates">
              <div>TEMPLATES SCREEN</div>
            </Route>
            <Route exact path="/">
              <LandingScreen data={messages} test={"test"} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
