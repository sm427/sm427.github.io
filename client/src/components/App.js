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

    //TODO: get(User) and pass the whole user as a prop instead of calling get(user) in every component

  }

  // componentDidMount() {
  //   get("/api/whoami").then((user) => {
  //     if (user._id) {
  //       // they are registed in the database, and currently logged in.
  //       this.setState({ user:{_id: user._id} });
  //     }}).then(console.log(this.state.user._id))
  //       //get(`/api/user`, { userid: this.state._id })).then((user) => this.setState({ user: user[0] })).then(console.log("logged in"))

  //   //TODO: get(User) and pass the whole user as a prop instead of calling get(user) in every component

  // }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ user: {_id: user._id} });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ user: {_id: undefined }});
    post("/api/logout");
  };

  updateUser = (updatedUser) => { 
    //console.log(updatedUser)
    this.setState({
      user: updatedUser})
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
          <Profile path="/profile/:profileUserId" profileUserId={profileUserId} user={this.state.user} updateUser={this.updateUser}/>
          <HowTo path="/howtoplay" />
          <NotFound default />
        </Router>
        </div>
      </>
    );
  }
}

export default App;
