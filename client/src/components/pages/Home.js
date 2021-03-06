import React, { Component } from "react";
import SinglePlayerSetup from "../modules/SinglePlayerSetup.js";
import PuzzleOfTheDaySetup from "../modules/PuzzleOfTheDaySetup.js"
//import JoinLobbySetup from "../modules/JoinLobbySetup.js";
//import CreateLobbySetup from "../modules/CreateLobbySetup.js";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    if(this.props.userId) {
    get("/api/whoami").then((currentuser) => {

      get(`/api/user`, { userid: currentuser._id}).then((userObj) => {
        this.setState({ user: userObj});
      });

    });
  }
    document.title = "Track'nTag";
    // remember -- api calls go here!
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId && this.props.userId) { 
      get("/api/whoami").then((currentuser) => {

        get(`/api/user`, { userid: currentuser._id}).then((userObj) => {
          this.setState({ user: userObj});

        });
  
      });
  
    }
    else if (prevProps.userId !== this.props.userId) {
      this.setState({user: undefined})
    }
    
  }

  reportSinglePlayerImageCount = (count) => {
    this.props.reportSinglePlayerImageCount(count);
  }

  

  render() {
    let noScroll = require('no-scroll'); // no-scroll library {https://github.com/davidtheclark/no-scroll}
    noScroll.off()
    
    return (
      <div className="Home-Background">
        <h1 className="Home-Header u-textCenter">Welcome to Track'nTag</h1>
        <div className="Home-shortHorizontalLine" />
        <h2 className="u-textCenter">Find yourself in the crowd!</h2>
        <div className="Home-Container"> 
          <div className="Home-singleContainer">
            <div className="Home-singleBox"><SinglePlayerSetup user={this.state.user} userId={this.props.userId} reportSinglePlayerImageCount={this.reportSinglePlayerImageCount}/></div>
            <div className="Home-singleBox"><PuzzleOfTheDaySetup user={this.state.user} userId={this.props.userId}/></div>
            {/* <div className="Home-singleBox"><CreateLobbySetup user={this.state.user} userId={this.props.userId}/></div> */}
          </div>
          {/* <div className="Home-doubleBox"><JoinLobbySetup/></div> */}
        </div>
      </div>
    );
  }
}

export default Home;
