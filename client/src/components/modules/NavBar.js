import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./NavBar.css";

const GOOGLE_CLIENT_ID = "329222096011-addofgttos0gm3hndt83qnme9su2jq75.apps.googleusercontent.com";

class NavBar extends Component {
    constructor (props) {
        super(props);
    }

    render() {

        let profileLink = "/profile/" + this.props.user._id

        return(
            <>
            <nav className="NavBar-container u-flex">
               <Link to="/" className="NavBar-title u-inlineBlock u-link">track'ntag</Link>
               <span className="NavBar-linkContainer u-inlineBlock">
                <Link to="/" className="NavBar-link"> Home </Link>
                {this.props.user._id ? (
                    <Link to={profileLink} className="NavBar-link"> Profile </Link>
                ):("")}
                <Link to="/howtoplay" className="NavBar-link"> How to play </Link>
                </span>
                {/* <div className="u-inlineBlock NavBar-link"> logged in as: </div> */}
               <div className="LoginButton u-inlineBlock">
               {this.props.user._id ? (
                    <GoogleLogout
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={this.props.handleLogout} // possibly remove the props since i dont think handleLogout is a prop in App.js, it's a function
                        onFailure={(err) => console.log(err)}
                    />
                ) : (
                    <GoogleLogin
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.props.handleLogin}
                        onFailure={(err) => console.log(err)}
                    />
                )}
                </div>
            </nav>
            </>
        );
    }
}

export default NavBar;