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
        this.setCookie = this.setCookie.bind(this);

    }
    updateEmail(e) {
        this.setState({
            emailValue: e.target.value
        });
    }
    setCookie = (cname, cvalue, exdays)=> {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };
remember(){
        if(this.state.isRemembered===""){
            this.setState({isRemembered : "✓"})
           // document.cookie="email="+this.state.emailValue+";"
            this.setCookie('email', this.state.emailValue, 20)
            this.setCookie('remembered', "true", 20)
        }else {
            this.setState({isRemembered : ""})
            this.setCookie('email', "", 1)
            this.setCookie('remembered', "false", 1)
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