import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import NavBar from "./modules/NavBar.js";
import Profile from "./pages/Profile.js";
import SinglePlayerGameOver from "./pages/SinglePlayerGameOver.js";
import PuzzleOfTheDay from "./pages/PuzzleOfTheDay.js"
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
        roomId: "testid",
      },
      SinglePlayerImageCount: 3,
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

 
  // componentDidUpdate(prevProps) {
  //   if (prevProps.userId !== this.props.userId && this.props.userId) { 
  //     get("/api/whoami").then((currentuser) => {

  //       get(`/api/user`, { userid: currentuser._id}).then((userObj) => {
  //         this.setState({ user: userObj});

  //       });
  
  //     });
  
  //   }
  // }


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

  reportSinglePlayerImageCount = (count) => {
    this.setState({
      SinglePlayerImageCount: count,
    })
    console.log(this.state.SinglePlayerImageCount + " rounds")
  }

  render() {
    let profileUserId = this.state.user._id;
    let roomid = this.state.roomId;
    return (
      <>
        <NavBar 
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          user={this.state.user}
        /> 
        <div className="App-container">
        <Router>
          <Home path="/" user={this.state.user} userId={this.state.user._id} reportSinglePlayerImageCount={this.reportSinglePlayerImageCount}/>
          <Profile path="/profile/:profileUserId" profileUserId={profileUserId} userId={this.state.user._id}/>
          <HowTo path="/howtoplay" />
          <SinglePlayer path="/singleplayer" userId={this.state.user._id} addTime={this.addTime} imageCount={this.state.SinglePlayerImageCount}/>
          <SinglePlayerGameOver path="/singleplayergameover" user={this.state.user} imageCount={this.state.SinglePlayerImageCount}/>
          <PuzzleOfTheDay path="/puzzleoftheday" />
          <NotFound default />
        </Router>
        </div>
      </>
    );
  }
}

export default App;
