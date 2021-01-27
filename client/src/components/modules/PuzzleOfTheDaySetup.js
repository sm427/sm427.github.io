import React, { Component } from "react";
import "../../utilities.css";
import "../pages/Home.css";
import InputField from "./InputField.js";
import { Link } from "@reach/router";
import { get, post } from "../../utilities";
import Images from "../images/photoIndex.js";

class PuzzleOfTheDaySetup extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      templates: [],
      selectedImage: 0,
      photographer: [
        "CHUTTERSNAP | Unsplash",
        "CHUTTERSNAP | Unsplash",
        "CHUTTERSNAP | Unsplash",
        "JohnDarrochNZ | Wikimedia",
        "Visit El Paso | Flickr",
        "Visit El Paso | Flickr",
        "Visit El Paso | Flickr",
        "Hanson Lu | Unsplash",
        "Hanson Lu | Unsplash",
        "Keith Johnston | Pixabay",
        "Keith Johnston | Pixabay",
        "Keith Johnston | Pixabay",
        "Keith Johnston | Pixabay",
        "Ben Kerckx | Pixabay",
        "Ben Kerckx | Pixabay",
        "Ben Kerckx | Pixabay",
        "Keith Johnston | Pixabay",
        "Keith Johnston | Pixabay",
        "Keith Johnston | Pixabay",
        "Keith Johnston | Pixabay"
      ]
    };
  }

  componentDidMount() {
    let templates = []
    for (let i=0; i<Images.length; i++) {
      templates = templates.concat(i)
    }
    this.setState({templates: templates})
    fetch("http://worldclockapi.com/api/json/est/now").then((response) => {return response.json(); }).then((data) => {
      let day = data.currentDateTime.slice(8,10)
      let month = data.currentDateTime.slice(5,7)
      let selectedImage = (parseInt(day) + parseInt(month) - 8 + Images.length)%Images.length
      this.setState({date: data.currentDateTime})
      this.setState({selectedImage: selectedImage})
    })

  }

  render() {

    let usernameMessage;
    let profilePictureMessage;
    let startbutton;

  if (!this.props.user) {
    usernameMessage = "Please log in to continue. Click the Google Login Button in the top right corner.";
    profilePictureMessage = "";
    startbutton = (<div className="SinglePlayer-notLoggedInText">Log in before playing.</div>);
  }
  else if (!this.props.user.imageNames[0]) {
    usernameMessage = `Logged in as ${this.props.user.username}.`;
    profilePictureMessage =("Please upload a picture in Profile to continue!");
    startbutton = (<div className="SinglePlayer-notLoggedInText">Upload a picture before playing.</div>) //bug, I have a profile picture and it is not letting me hit the button
  }
  else if (this.props.user.playedPOTD && this.state.date) {
    if (this.props.user.playedPOTD.includes(this.state.date.slice(0,10))) {
    usernameMessage = `You have already played today. Come back tomorrow.`;
    profilePictureMessage =("");
    startbutton = (<Link to="/puzzleofthedaygameover"> <button
    type="submit"
    className="u-pointer App-submit Home-singlePlayerButton"
   >
     Ranklist
   </button></Link>)
    }
    else {
    usernameMessage = `Logged in as ${this.props.user.username}.`;
    profilePictureMessage = "You have already uploaded a picture.";
    startbutton = (<Link to="/puzzleoftheday"> <button
      type="submit"
      className="u-pointer App-submit Home-singlePlayerButton"
     >
       Play!
     </button></Link>);
}}
else {
  usernameMessage = `Logged in as ${this.props.user.username}.`;
  profilePictureMessage = "You have already uploaded a picture.";
  startbutton = (<Link to="/puzzleoftheday"> <button
    type="submit"
    className="u-pointer App-submit Home-singlePlayerButton"
   >
     Play!
   </button></Link>);}
  

    return (
      <div className="Home-singleBoxContent">
        <h4 className="Home-Box-Header">Puzzle of the Day</h4>
        <div className="Home-singlePlayerContentContainer u-textCenter">
          <div><div>
            <p>{usernameMessage}</p>
            <p>{profilePictureMessage}</p>
          </div>

          <div className="u-flexColumn u-flex-alignCenter">
                <h4>Today's puzzle of the day is</h4>
                {/* <div className="Home-POTDname"> Image #{this.state.selectedImage}</div> */}
                <h2 className="Home-POTDname"> Image #{this.state.selectedImage}</h2>
                <p>by {this.state.photographer[this.state.selectedImage]}</p>
          </div></div>
               

          <div>
            {startbutton}
          </div>
        
      </div>
      </div>
    );
  }
}

export default PuzzleOfTheDaySetup;
