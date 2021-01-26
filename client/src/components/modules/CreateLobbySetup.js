import React, { Component } from "react";
import "../../utilities.css";
import "../pages/Home.css";
import InputField from "./InputField.js";
import { Link } from "@reach/router";
import { get, post } from "../../utilities";

class CreateLobbySetup extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      Lobbyname: {
      value: "",
      placeholder: "Name your Lobby"
      },
      Lobbycode: {
        value: "",
        placeholder: "Lobby Code"
        },
      slidervalue: 3,
    };
  }

  handleChangeLobbyname = (event) => {
    this.setState({
        Lobbyname: {value: event.target.value,}
    })
  }

  handleChangeLobbycode = (event) => {
    this.setState({
        Lobbycode: {value: event.target.value,}
    })
  }

  handleChangeSlider = (event) => {
    this.setState({
        slidervalue: event.target.value,
    })
  }

    handleSubmit = (event) => {
      let body = {creatorname: this.props.user.username ,name: this.state.Lobbyname.value, code: this.state.Lobbycode.value, playerCount: this.state.slidervalue}
      post("/api/createLobby", body).then((lobbyObj) => {console.log(lobbyObj)})
    }

  render() {

    let usernameMessage;
    let startbutton;

    if (!this.props.user) {
      usernameMessage = "Please log in to continue. Click the Google Login Button in the top right corner.";
      startbutton = (<div className="SinglePlayer-notLoggedInText">Log in before playing.</div>);
    }

    else {
      usernameMessage = `Logged in as ${this.props.user.username}.`;
      startbutton = (<button
        type="submit"
        className="u-pointer App-submit Home-singlePlayerButton"
        value="Change"
        onClick={this.handleSubmit}
       >
         Create!
       </button>);
  
    }

    return (
      <div className="Home-singleBoxContent">
        <h4 className="Home-Box-Header">Create a Lobby</h4>
        <div className="Home-singlePlayerContentContainer u-textCenter">
          <div>
            <p>{usernameMessage}</p>
            {/* <p className="u-textCenter u-Quantico">
              Note: Working on it.
              {/* i coded those input fields and didn't realize that the multiplayer won't be a part of the mvp 
              </p> */}
          </div>

          <div className="u-width100">
            <InputField placeholder={this.state.Lobbyname.placeholder} value={this.state.Lobbyname.value} handleChange={this.handleChangeLobbyname}/>
          </div>      

          <div className="u-width100">            
            <InputField placeholder={this.state.Lobbycode.placeholder} value={this.state.Lobbycode.value} handleChange={this.handleChangeLobbycode}/>
          </div> 

          <div><h4>Player Count</h4>
          <p><input list="tickmarks" className="App-slider" type = "range" min="2" max="4" value={this.state.slidervalue} onChange={this.handleChangeSlider}/></p>
               
          <p>You'll play with {this.state.slidervalue} people.</p></div>

          <div>
            {startbutton}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateLobbySetup;
