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
      description: "THIS IS MESSAGE FROM OUR TEAM",
      tittle: "warning",
      type: "alertColor"
    };
  }
  colorMeassagePicker(alert) {
    if (alert == "warning") {
      this.setState({
        descripton: "nije to bas najbolje",
        type: "alertColor"
      });
      return "alertColor";
    } else if (alert == "littlewarning") {
      this.setState({
        descripton: "sad je bolje ali nije jos kako treba",
        type: "midAlert"
      });
    } else if (alert == "infowarning") {
      this.setState({
        descripton: "sad je bas kako treba",
        type: "infoAlert"
      });
    }
  }
  removeNotification() {
    this.setState({ type: "" });
  }

  render() {
    const component = this;
    //  RESTRUKRUIRANUE STEJTA (state)
    const { description, type, tittle } = component.state;
    const messages = {
      mainHeader: "Hello friend",
      subHeader:
        "Ready to impress some HR managers with your astounding online CV"
    };

    return (
      <div id="App" className="grow-1 flex">
        <Notification
          tittle={tittle}
          type={type}
          duration={() => this.removeNotification()}
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
