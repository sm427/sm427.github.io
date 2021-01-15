import React, { Component } from "react";
import SinglePlayerSetup from "../modules/SinglePlayerSetup.js";
import JoinLobbySetup from "../modules/JoinLobbySetup.js";
import CreateLobbySetup from "../modules/CreateLobbySetup.js";

import "../../utilities.css";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    document.title = "Track'nTag";
    // remember -- api calls go here!
  }

  render() {
    return (
      <div className="Home-Background">
        <h1 className="Home-Header u-textCenter">Welcome to Track'nTag</h1>
        <h2 className="u-textCenter">Description</h2>
        <div className="Home-Container"> 
          <div className="Home-singleBox"><SinglePlayerSetup user={this.props.user}/></div>
          <div className="Home-singleBox"><CreateLobbySetup user={this.props.user}/></div>
          <div className="Home-doubleBox"><JoinLobbySetup user={this.props.user}/></div>
        </div>
      </div>
    );
  }
}

export default Home;
