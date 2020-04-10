// External dependencies
import React from "react";
import {
    BrowserRouter as Router ,
    Switch ,
    Route ,
} from "react-router-dom";
// Internal dependencies
import Button from './button';
import Sidebar from './sidebar';


export default class App extends React.Component {
    constructor(props) {
        super ( props );

        this.state = {};

    }

    render() {
        return (<div style={{background: "url('assets/image/blue-ice.jpg')", backgroundSize: "cover"}}>
                <Sidebar userEmail={this.props.userEmail} isRemembered={this.props.isRemembered}/>
            </div>
        )
    }
};