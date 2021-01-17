import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../utilities.css";
import "../App.css";
import "./Home.css";

class SinglePlayerGameSidebar extends Component {
    constructor (props) {
        super(props);
    }


    // use props here to update time and picture progress
    render() {
        return (
          <div className="Home-Background">             
            <h2 className="u-textCenter">Description</h2>
          </div>
        );
      }


}

export default SinglePlayerGameSidebar;