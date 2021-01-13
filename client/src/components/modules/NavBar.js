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
        return(
            <nav className="NavBar-container">
               <div className="NavBar-title u-inlineBlock">Fancy.App.Name</div>
               <span className="NavBar-linkContainer u-inlineBlock">
                <Link to="/" className="NavBar-link"> Home </Link>
                <Link to="/profile" className="NavBar-link"> Profile </Link>
                <Link to="/howtoplay" className="NavBar-link"> How to play </Link>
                </span>
               <div className="LoginButton u-inlineBlock">
               {this.props.userId ? (
                    <GoogleLogout
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={this.props.handleLogout}
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
        );
    }
}

export default NavBar;