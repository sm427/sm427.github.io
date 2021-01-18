import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../utilities.css";
import "../App.css";
import "../pages/Home.css";
import Stopwatch from "./GameStopwatch.js"

class SinglePlayerGameSidebar extends Component {
    constructor (props) {
        super(props);
    }

    // use props here to update time and picture progress
    render() {
      return (
        <div className="App">
          <div className="Timers">
            <Stopwatch />
          </div>
        </div>
      )
      }


}

export default SinglePlayerGameSidebar;