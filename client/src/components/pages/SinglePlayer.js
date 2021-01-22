import React, { Component } from "react";
import { get, post } from "../../utilities.js";
import { Link } from "@reach/router";
//import { get, post } from "../../utilities";
import { Redirect } from "react-router-dom";
import SinglePlayerGame from "../modules/SinglePlayerGame.js"
import SinglePlayerGameSidebar from "../modules/SinglePlayerGameSidebar.js"
//import Waldo from "../modules/Waldo.js"

import "./SinglePlayer.css";
import "../../utilities.css";

import Images from "../images/photoIndex.js";

class SinglePlayer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            redirect: "/",
            user: undefined,
            finalTimerTime: 0,
            pictureCounter : 0,
            gameOn: true,
            randomInt: null
        }
    }
    

    componentDidMount() {
      get("/api/whoami").then((user) => {
        if (user._id) {
          // they are registed in the database, and currently logged in.
          this.setState({ user: user});
        }
      });
      this.setState({randomInt: this.getRandomInt(Images.length)}) 
    }


    endGame = () => {
      console.log("Game ended.")
      this.setState({gameOn: false})
    }
    // pictureProgress = () => {
    //     this.setState({
    //       pictureCounter: this.state.pictureCounter +1
    //     });
    //   };

    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    reportTimerTime = (time) => {
      this.setState({finalTimerTime: time})
      let body = {finalTime: time, user: this.state.user}
      post("/api/reportTime", body)
    }

    render() {
      const finalTimerTime  = this.state.finalTimerTime;
      let centiseconds = ("0" + (Math.floor(finalTimerTime / 10) % 100)).slice(-2);
      let seconds = ("0" + (Math.floor(finalTimerTime / 1000) % 60)).slice(-2);
      let minutes = ("0" + (Math.floor(finalTimerTime / 60000) % 60)).slice(-2);
      // <! -- images[randomIntString]-->

      return(
        //console.log;
        <div className="SinglePlayer-container">
          <div className="SinglePlayer-SearchImageContainer">
            <SinglePlayerGame sceneNumber={Images[this.state.randomInt]} pictureCounter={this.state.pictureCounter} user={this.state.user} endGame={this.endGame}/>
          </div>
          <div className="SinglePlayer-SideBarContainer">
            <SinglePlayerGameSidebar pictureCounter={this.state.pictureCounter} user={this.state.user} gameOn={this.state.gameOn} reportTimerTime={this.reportTimerTime}/>
          </div> 
            {/* <div className="Waldo" onClick={() => {this.pictureProgress();}}>
               {this.state.pictureCounter}
            </div> */}
          { (!this.state.gameOn) ? (
          <div> 
            <div className="SinglePlayer-dimBackground"></div>
          <div className="SinglePlayer-GameOver u-flexColumn u-flex-alignCenter u-flex-justifyCenter">
          
            <div> <h2>
              Game over </h2>
            </div>

            <div>
              Your time was {minutes}:{seconds}:{centiseconds}.
            </div>

            <div>
            <Link to="/singleplayergameover">
              <button
                  type="submit"
                  className="u-pointer SinglePlayer-GameOverButton"
                  value="Change"
                  >
                    See the ranklist!
              </button>
            </Link>
            </div>

          </div>

          </div>) : ("")}
        </div>
      )
    }
 }

 export default SinglePlayer;