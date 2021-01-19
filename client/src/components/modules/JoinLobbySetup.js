import React, { Component } from "react";
import "../../utilities.css";
import "../pages/Home.css";

class JoinLobbySetup extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  render() {
    return (
      <div>
        <h4 className="Home-Box-Header">Join a Lobby</h4>
        <p className="u-textCenter u-Quantico">
              Note: Lobbies/multiplayer are not a part of the MVP, they will be added in the final product.
              </p>
      </div>
    );
  }
}

export default JoinLobbySetup;
