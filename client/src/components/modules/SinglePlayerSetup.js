import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../utilities.css";
import "../pages/Home.css";
import "../App.css";
import PictureCount from "./PictureCount.js";

class SinglePlayerSetup extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      sliderValue: 3,
    };
  }


  handleChange = (event) => {
    this.setState({
        sliderValue: event.target.value,
    })
}

  handleSubmit = (event) => {
    //link to new page
  }

  render() {

    let usernameMessage;
    let profilePictureMessage;
    let startbutton;

  if (!this.props.user.username) {
    usernameMessage = "Please log in or sign up to continue!";
    profilePictureMessage = "";
    startbutton = "";
  }
  else if (!this.props.user.imageNames[0]) {
    usernameMessage = `Logged in as ${this.props.user._id}.`;
    profilePictureMessage =("Please upload a picture in  to continue!");
    startbutton = "";
  }
  else {
    usernameMessage = `Logged in as ${this.props.user.username}.`;
    profilePictureMessage = "You have already uploaded a picture.";
    startbutton = (<button
      type="submit"
      className="u-pointer App-submit Home-singlePlayerButton"
      value="Change"
      onClick={this.handleSubmit}
     >
       Useless
     </button>);

  }

    return (
      <div>
      <h4 className="Home-Box-Header">Singleplayer</h4>
      <div className="u-textCenter Home-singlePlayerContentContainer">
        
        <div><p>{usernameMessage}</p>
        <p>{profilePictureMessage}</p></div>
        <div><h4>Picture Count</h4>
        <p><input list="tickmarks" className="App-slider" type = "range" min="1" max="5" value={this.state.slidervalue} onChange={this.handleChange}/></p>
                {/* <datalist id="tickmarks"><option value="1" label="1"></option><option value="2" label="2"></option><option value="3" label="3"></option><option value="4" label="4"></option><option value="5" label="5"></option></datalist> */}
        <p>You'll play  {this.state.sliderValue} rounds.</p></div>
        {startbutton}
      </div>
      </div>
    );
  }
}

export default SinglePlayerSetup;
