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
      description: "This is message to our team. Don't give up!!!",
      tittle: "IMPORTANT",
      type: "infoAlert"
    };
  }
  colorMeassagePicker(alert) {
    if (alert == "IMPORTANT") {
      this.setState({
        descripton: "This is message to our team. Don't give up!!!",
        type: "alertColor"
      });
    } else if (alert == "HONEST") {
      this.setState({
        descripton:
          "Team, you are on the right way!!! Little more and you gona make some awesome things!!!",
        type: "midAlert"
      });
    } else if (alert == "RELAX") {
      this.setState({
        descripton: "YOU ARE ALMOST DONE!!!CONGRATULATION!!!",
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
          icon="fa fa-cloud"
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
