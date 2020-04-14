import React, { Component } from "react";

class Notification extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // RESTRUKTUIRANJE PROPS-A
    const { description, type, tittle, icon, duration } = this.props;
    const widthOpacity = type ? type : "gone";
    return (
      !!description && (
        <div
          className={"notification-wrapper" + " " + widthOpacity}
          onClick={duration}
        >
          <div className="tittle-wraper">
            <div className="description">{tittle}</div>
            <i className={icon}></i>
          </div>
          {!!description && <div> {description} </div>}
        </div>
      )
    );
  }
}

export default Notification;
