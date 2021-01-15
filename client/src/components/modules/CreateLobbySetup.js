import React, { Component } from "react";
import "../../utilities.css";
import "../pages/Home.css";
import InputField from "./InputField.js";

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
        }
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
    handleSubmit = (event) => {
      //link to new page
    }

  render() {
    return (
      <div>
        <h4 className="Home-Box-Header">Create a Lobby</h4>
        <div className="Home-Box-contentcontainer">
          <div>
            <p className="u-textCenter">i coded those input fields and didn't realize that the multiplayer won't be a part of the mvp</p>
          </div>

          <div>
            <InputField placeholder={this.state.Lobbyname.placeholder} value={this.state.Lobbyname.value} handleChange={this.handleChangeLobbyname}/>
          </div>

          <div>
            <InputField placeholder={this.state.Lobbycode.placeholder} value={this.state.Lobbycode.value} handleChange={this.handleChangeLobbycode}/>
          </div>

          <div>[add PlayerCount Slider]</div>

          <div>
            <button
             type="submit"
             className="u-pointer App-submit"
             value="Change"
             onClick={this.handleSubmit}
            >
              Useless
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateLobbySetup;
