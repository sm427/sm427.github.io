import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../utilities.css";
import "../App.css";
import "../pages/SinglePlayer.css"
import Stopwatch from "./GameStopwatch.js"

class SinglePlayerGameSidebar extends Component {
    constructor (props) {
        super(props);
    }

    // use props here to update time and picture progress
    render() {
      return (
        <div className="u-flexColumn u-flex-alignCenter u-textCenter">
          <h2>Tag yourself!</h2>
          <p>Use the bottons to move the image to the left or to the right. Find and click on yourself!</p>
          <div className="SinglePlayer-Timers">
            <Stopwatch />
          </div>
        </div>
      )
      }


}

export default SinglePlayerGameSidebar;