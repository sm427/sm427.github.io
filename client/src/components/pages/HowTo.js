import React, { Component } from "react";
import { Link } from "@reach/router";
//import { get } from "../../utilities";
import "../../utilities.css";
import "./HowTo.css";


class HowTo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "How To Play";
   //fetch("http://worldclockapi.com/api/json/est/now").then((time)=>console.log(time.json()))
    //get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
    }

  // callTime = async () => {
  //   const response = await fetch("http://worldclockapi.com/api/json/est/now");
  //   const time = await response.json();
  //   await console.log(JSON.stringify(time));
  // }

  render() {
    let noScroll = require('no-scroll'); // no-scroll library {https://github.com/davidtheclark/no-scroll}
    noScroll.off()

    return (
      <div className="HT-container">
        <h1>How to Play Track'nTag</h1>
        <div className="HT-shortHorizontalLine"> </div>

        <p className="HT-text"> Before you start playing, log in with Google. Then, head to your profile via the navigation bar and change your username.</p>

        <h2>Singleplayer</h2>

        <p className="HT-text">Upload a picture to your profile. Only you will be able to see this picture. Make sure to follow the instructions on the profile page on how to crop the photo before uploading to secure that the game works properly.</p>
        <p className="HT-text">Head back to the homepage. If you did successfully log in and upload a picture, you should be able to hit the "Play!" button in the singleplayer setup panel. Prior to clicking the button, select how many rounds you want to play.</p>
        <p className="HT-text">The photo that you've uploaded is hidden in an image of a crowd. Not all features of your face are always conserverd, so look carefully! When you've found your face, click on it.</p>
        <p className="HT-text">When you have played the number of rounds that you set in the beginning, you'll be redirected to a page with ranklists where you can compare your latest time to your best times or the globally best times. Can you become number 1 on the ranklist? </p>

        <h2>Puzzle of the Day</h2>
        <p className="HT-text">Every day, one puzzle gets selected as the puzzle of the day. You only have one attempt to solve it as fast as you can. Are you the fastest Track'nTag player in the world today?</p>

        <Link to="/"> <button className="u-pointer App-submit HT-Button" value="Change" onClick={this.handleSubmit}>
       Go back to the Home Page
     </button></Link>
      </div>
    );
  }
}

export default HowTo;
