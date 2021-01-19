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
       Play Again!
     </button></Link>);

    return (
    <div className="u-flexColumn u-flex-alignCenter">
      <div>
      <h4>What do you want to do next?</h4>
    </div>
    <div>
        {homeButton} 
        {replayButton}
      </div>
      <p className="u-Quantico">Note: Play again doesn't really make sense in the MVP because there is only one playable image. This will be changed in the final product.</p>
    </div>
    );

  }
}

export default NavOut;
