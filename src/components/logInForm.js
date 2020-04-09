// External dependencies
import React from "react";
// Internal dependencies
import "../styles/logInForm.css";

export default class LogInForm extends React.Component {
    constructor(props) {
        super ( props );

        this.state = {
            isRemembered: (this.props.isRemembered==="false"? "":"✓"),
            emailValue: (this.props.isRemembered==="false"? "":this.props.userEmail)
        };
        this.updateEmail = this.updateEmail.bind(this);
        this.remember = this.remember.bind(this);

    }
    updateEmail(e) {
        this.setState({
            emailValue: e.target.value
        });
    }
remember(){
        if(this.state.isRemembered===""){
            this.setState({isRemembered : "✓"})
            document.cookie="email="+this.state.emailValue+";"
            document.cookie="remembered=true"
        }else {
            this.setState({isRemembered : ""})
            document.cookie="email=; "
            document.cookie="remembered=false;"
        }

    }

    render() {

        return (
            <div className="log-in-form">
                <input value={this.state.emailValue} onChange={this.updateEmail} type="email" placeholder="Your E-mail" />
                <input type="password" placeholder="Your Password"/>
                <div className="remember">
                    <span>Remember me</span>
                    <div id="remember-box" onClick={this.remember}>{this.state.isRemembered}</div>
                </div>
            </div>
        )
    }
};