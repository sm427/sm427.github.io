import React, { Component } from "react";
//import { Link } from "@reach/router";
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
               <div className="LoginButton">
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