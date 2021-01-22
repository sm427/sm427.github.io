import React, { Component } from "react";
import "../../utilities.css";
import "../pages/Home.css";
import { Link } from "@reach/router";

class LobbyToSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
        <>
        {this.props.lobby ? (<div  className="Home-lobbyBox u-flex u-flex-alignCenter"> 
            <div className="Home-lobbyBoxName u-flex u-flex-alignCenter"><div>{this.props.lobby.name}</div> </div>
            <div className="Home-LobbyInfoContainer">
                <div className="u-Bebas Home-LobbyCode">{this.props.lobby.code}</div>
                <div className="u-flex Home-LobbyPlayers">
                    {this.props.lobby.players.length >0 ? this.props.lobby.players.map((user) => (
                    <div className="Home-LobbyBoxPlayerNames"> {user} </div>
                    )): ("No Players yet")}
                </div>
            </div>
        </div>) : ("Loading")}
        </>
    );
  }
}

export default LobbyToSelect;
