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
          <div className="SinglePlayer-Timers">
            <Stopwatch />
          </div>
        </div>
      )
      }


}

export default SinglePlayerGameSidebar;