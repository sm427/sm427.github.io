import React, { Component } from "react";
import "../../utilities.css";
import "../pages/Home.css";
import { Link } from "@reach/router";
import { get, post } from "../../utilities";
import LobbyToSelect from "./LobbyToSelect.js"

class JoinLobbySetup extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      lobbies: undefined,
    };
  }

  componentDidMount() {
    get("/api/getLobbies").then((lobbiesObj) => {this.setState({lobbies: lobbiesObj})})
  }

  render() {
    let lobbies;
    if (this.state.lobbies) {
      lobbies = this.state.lobbies.map((lobby,index) => (
        <LobbyToSelect key={"lobby"+JSON.stringify(index)} lobby={lobby} />
      ))
    }
    return (
      <div>
        <h4 className="Home-Box-Header">Join a Lobby</h4>
        
        <div className="Home-lobbyContainer">
          <p className="u-textCenter u-Quantico">
              Note: Lobbies/multiplayer are not a part of the MVP, they will be added in the final product.
          </p>

          {lobbies}
          
        </div>
      </div>
    );
  }
}

export default JoinLobbySetup;
