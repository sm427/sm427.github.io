import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./NavBar.css";

class NavBar extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return(
            <nav className="NavBar-container">
                <div className="NavBar-title u-inlineBlock">Fancy.App.Name</div>
            </nav>
        );
    }
}

export default NavBar;