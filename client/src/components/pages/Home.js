import React, { Component } from "react";

import "../../utilities.css";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <div className="Home-Background">
        <h1 className="Home-Header u-textCenter">Welcome to Track'nTag</h1>
        <h2 className="u-textCenter">Description</h2>
        <div className="Home-Container"> 
          <div>Singleplay</div>
          <div>Join Lobby</div>
          <div>Create Lobby</div>
        </div>
      </div>
    );
  }
}

export default Home;
