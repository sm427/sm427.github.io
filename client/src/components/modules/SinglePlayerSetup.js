import React, { Component } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";
import "../../utilities.css";
import "../pages/Home.css";
import "../App.css";
//import PictureCount from "./PictureCount.js";
//import { browserHistory } from "react-router";

class SinglePlayerSetup extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      user: undefined,
      sliderValue: 3,
    };
  }

  handleChange = (event) => {
    this.setState({
        sliderValue: event.target.value,
    })
}


  handleSubmit = (event) => {
    this.props.reportSinglePlayerImageCount(this.state.sliderValue)
    //pass sliderValue to App.js (and then from there to SinglePlayer.js)
    //timer will start here too
  }

  render() {

    let usernameMessage;
    let profilePictureMessage;
    let startbutton;

  if (!this.props.user) {
    usernameMessage = "Please log in to continue. Click the Google Login Button in the top right corner.";
    profilePictureMessage = "";
    startbutton = "Log in before playing.";
  }
  else if (!this.props.user.imageNames[0]) {
    usernameMessage = `Logged in as ${this.props.user.username}.`;
    profilePictureMessage =("Please upload a picture in Profile to continue!");
    startbutton = "Upload a picture before playing."; //bug, I have a profile picture and it is not letting me hit the button
  }
  else {
    usernameMessage = `Logged in as ${this.props.user.username}.`;
    profilePictureMessage = "You have already uploaded a picture.";
    startbutton = (<Link to="/singleplayer"> <button
      type="submit"
      className="u-pointer App-submit Home-singlePlayerButton"
      value="Change"
      onClick={this.handleSubmit}
     >
       Play!
     </button></Link>);

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
        <p>You'll play  {this.state.sliderValue} rounds.</p><p className="u-Quantico">Note: Picture Count is not working because there is only one playable picture in the MVP. The number of playable pictures will be significantly increased for the final product. The final product will only let users start the game when they have uploaded a picture.</p></div>
         {startbutton} 
      </div>
      </div>
    );
  }
}

export default SinglePlayerSetup;
