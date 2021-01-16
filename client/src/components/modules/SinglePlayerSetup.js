import React, { Component } from "react";
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
    let usernameMessage = this.props.user.username ? (`Logged in as ${this.props.user._id}.`) : ("Please log in or sign up!");
    let profilePictureMessage = this.props.user.imageNames[0] ? ("Profilepic uploaded"):("Please Upload Profile Pic");

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
