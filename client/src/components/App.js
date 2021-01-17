import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import NavBar from "./modules/NavBar.js";
import Profile from "./pages/Profile.js";
//import GoogleLogin, { GoogleLogout } from "react-google-login";
import "../utilities.css";
import "./App.js";
import HowTo from "./pages/HowTo.js";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import SinglePlayer from "./pages/SinglePlayer.js";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      user: {
        _id: undefined,
        name: undefined,
        googleid: undefined,
        username: undefined,
        imageNames: [],
      }
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ user: user});
      }
    })
    ;
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ user: user });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ user: {_id: undefined, name: undefined, googleid: undefined, username: undefined, imageNames: [], }});
    post("/api/logout");
  };

  updateUserVariable = (updatedUser) => { 
    console.log("run");
    this.setState({
      user: updatedUser})
  }

  updateUserServer = () => {
    console.log("run");
    get("/api/whoami").then((user) => {
      if (user._id) {
        this.setState({ user: user});
      }
    });
  }

  render() {

    let profileUserId = this.state.user._id

    return (
      <>
        <NavBar 
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          user={this.state.user}
        /> 
        <div className="App-container">
        <Router>
          <Home path="/" user={this.state.user}/>
          <Profile path="/profile/:profileUserId" profileUserId={profileUserId} user={this.state.user} updateUserVariable={this.updateUserVariable} updateUserServer={this.updateUserServer}/>
          <HowTo path="/howtoplay" />
          <SinglePlayer path="/singleplayer" />
          <NotFound default />
        </Router>
        </div>
      </>
    );
  }
}

export default App;
