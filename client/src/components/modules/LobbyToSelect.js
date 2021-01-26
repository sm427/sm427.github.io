import React, { Component } from "react";
import "../../utilities.css";
import "../pages/Home.css";
import { Link } from "@reach/router";
import { post } from "../../utilities";

class LobbyToSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: {
        _id: undefined,
        creatorname: undefined,
        players: [],
        playerIds: [],
        code: undefined,
      }
    };
  }

  async componentDidMount() {
    let thislobby = await this.props.lobby
    this.setState({lobby: thislobby})
  }

  handleSubmit = () => {
    let query = {lobbyId: this.props.lobby._id}
    post("/api/joinLobby", query).then((updatedLobby) => {this.setState({lobby: updatedLobby})} )
  }


  render() {
    let joinbutton = (<button
      type="submit"
      className="u-pointer App-submit Home-singlePlayerButton"
      value="Change"
      onClick={this.handleSubmit}
     >
       Join!
     </button>);
     
    return (
        <>
        {this.state.lobby ? (<div  className="Home-lobbyBox u-flex u-flex-alignCenter"> 
            <div className="Home-lobbyBoxName u-flex u-flex-alignCenter">
              <div>
                {this.state.lobby.name}
              </div> 
              
            </div>
            <div className="Home-LobbyInfoContainer">
                <div className="u-Bebas Home-LobbyCode">{this.state.lobby.code}</div>
                <div className="u-flex Home-LobbyPlayers">
                    {this.state.lobby.players.length >0 ? this.state.lobby.players.map((user, index) => (
                    <div key={"user"+index.toString()} className="Home-LobbyBoxPlayerNames"> {user} </div>
                    )): ("No Players yet")}
                </div>
                
            </div>
            <div> {joinbutton} </div>
        </div>) : ("Loading")}
        </>
    );
  }
}

export default LobbyToSelect;
