import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../utilities.css";
import "../App.css";
import "../pages/Home.css";

class SinglePlayerGameSidebar extends Component {
    constructor (props) {
        super(props);
    }


    // use props here to update time and picture progress
    render() {
        return (
          <div>             
            <h2 className="u-textCenter">Description</h2>
            <p>here goes info like the time</p>
          </div>
        );
      }


}

export default SinglePlayerGameSidebar;