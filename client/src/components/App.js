import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import NavBar from "./modules/NavBar.js";
import Profile from "./pages/Profile.js";
import SinglePlayerGameOver from "./pages/SinglePlayerGameOver.js";
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
      profileUserId: undefined,
      user: {
        _id: undefined,
        name: undefined,
        googleid: undefined,
        username: undefined,
        imageNames: [],
        playedTimes: [],
      }
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ user: user});
        this.setState({ profileUserId: user._id})
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId && this.props.userId) { 
      get("/api/whoami").then((currentuser) => {

        get(`/api/user`, { userid: currentuser._id}).then((userObj) => {
          this.setState({ user: userObj});

        });
  
      });
  
    }
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

  addTime = (time) => {
    console.log("yep")
    this.setState((prevstate) => ({
      user: {
        playedTimes: prevstate.user.playedTimes.concat(time)
      }
    }))
  }


  render() {
    let profileUserId = this.state.user._id;
    return (
      <>
        <NavBar 
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          user={this.state.user}
        /> 
        <div className="App-container">
        <Router>
          <Home path="/" user={this.state.user} userId={this.state.user._id}/>
          <Profile path="/profile/:profileUserId" profileUserId={profileUserId} userId={this.state.user._id}/>
          <HowTo path="/howtoplay" />
          <SinglePlayer path="/singleplayer" user={this.state.user} addTime={this.addTime}/>
          <SinglePlayerGameOver path="/singleplayergameover" user={this.state.user}/>
          <NotFound default />
        </Router>
        </div>
      </>
    );
  }
}

export default App;
