import React, { Component } from "react";

class Notification extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      !!this.props.description && (
        <div
          className={"notification-wrapper" + " " + this.props.type}
          onClick={this.props.duration}
        >
          <i className="fas fa-engine-warning"></i>
          <div>{this.props.description}</div>
          {!!this.props.text && <div> {this.props.text} </div>}
        </div>
      )
    );
  }
}

export default Notification;
