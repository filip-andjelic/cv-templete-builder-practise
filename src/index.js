// External dependencies
import React from "react";
import ReactDOM from "react-dom";
// Internal dependencies
import App from "./components/app";


function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
let isRemembered = getCookie("remembered");
let userEmail = getCookie("email");

ReactDOM.render (
    <App userEmail={userEmail} isRemembered={isRemembered}/> ,
    document.getElementById ( "cv-template-builder" )
);