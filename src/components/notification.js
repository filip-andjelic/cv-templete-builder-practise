import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Notification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {description, type, title, icon, hideHandle} = this.props;
        const typeClass = type ? "bg-" + type : "";

        return (
            <div
                className={"notification-wrapper pointer flex overflow-hidden " + typeClass}
                onClick={(e) => {
                    if (hideHandle) hideHandle(e);
                }}
            >
                <div className="flex center notification-icon-wrapper">
                    {
                        !!icon && (<FontAwesomeIcon
                            icon={icon}
                            style={{
                                margin: "10px",
                                fontSize: '45px'
                            }}
                        />)
                    }
                </div>
                <div className="notification-text-wrapper grow-1 stretch column">
                    <h3 className="notification-title stretch description">{title}</h3>
                    <span className="stretch margin-b-5"> {description} </span>
                </div>
            </div>
        );
    }
}

export default Notification;
