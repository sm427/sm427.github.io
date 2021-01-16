import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../utilities.css";
import "../pages/Home.css";
import "../App.css";

class SinglePlayerSetup extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      value: ""
    };
  }


  handleChange = (event) => {
    this.setState({
        value: event.target.value,
    })
}

  handleSubmit = (event) => {
    //link to new page
  }

  render() {

    let usernameMessage;
    let profilePictureMessage;
    
  if (!this.props.user.username) {
    usernameMessage = "Please log in or sign up to continue!";
    profilePictureMessage = "";
  }
  else if (!this.props.user.imageNames[0]) {
    usernameMessage = `Logged in as ${this.props.user._id}.`;
    profilePictureMessage =("Please upload a picture in  to continue!");
  }
  else {
    usernameMessage = `Logged in as ${this.props.user.username}.`;
    profilePictureMessage = "Profilepic uploaded";
  }

    return (
      <>
        <h4 className="Home-Box-Header">Singleplayer</h4>
        <p className="u-textCenter">{usernameMessage}</p>
        <p className="u-textCenter">{profilePictureMessage}</p>
        
      </>
    );
  }
}

export default SinglePlayerSetup;
