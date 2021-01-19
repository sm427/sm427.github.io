import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../utilities.css";
import "../pages/Home.css";
import "../App.css";
//import PictureCount from "./PictureCount.js";
//import { browserHistory } from "react-router";

class NavOut extends Component {
  constructor(props) {
    super(props);
    };
  

  render() {

    let homeButton;
    let replayButton;

    homeButton = (<Link to="/"><button
      type="submit"
      className="u-pointer App-submit Home-singlePlayerButton"
      value="Change"
      >
       Home
     </button></Link>);

    replayButton = (<Link to="/singleplayer"><button
      type="submit"
      className="u-pointer App-submit Home-singlePlayerButton"
      value="Change"
      onClick={this.handleSubmit}
     >
       Play!
     </button></Link>);

    return (
    <div>
      <div>
      <h4>Next?</h4>
    </div>
    <div>
        {homeButton} 
        {replayButton}
      </div>
    </div>
    );

  }
}

export default NavOut;
