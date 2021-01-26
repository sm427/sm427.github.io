import React, { Component } from "react";
import { get, post } from "../../utilities.js";
import { Link } from "@reach/router";
import MultiplayerGame from "../modules/MultiplayerGame.js"
import MultiplayerGameSidebar from "../modules/MultiplayerGameSidebar.js"

import "./SinglePlayer.css";
import "../../utilities.css";

import Images from "../images/photoIndex.js";

class Multiplayer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            redirect: "/",
            user: undefined,
            finalTimerTime: 0,
            pictureCounter : 0,
            gameOn: true,
            randomInt: null,
            imageCount: 3,
            finalServerTime: 0,
            showGameOver: false,
        }
    }

    async componentDidMount() {
      window.scrollTo(0, 0);
      
      this.setState({finalServerTime: 0})
      let userId = await this.props.userId;
      get("/api/whoami").then((currentuser) => {
        get(`/api/user`, { userid: currentuser._id}).then((userObj) => {
          this.setState({ user: userObj});
        });
      });

      //run randomint on server-side to get the same templates for all users, then get the random ints here
      this.setState({randomInt: this.getRandomInt(19)})
      
        this.setState({imageCount: parseInt(this.props.imageCount)})
        
    }

    endGame = () => {
      console.log("Game ended.");
      this.setState({gameOn: false});
      //notify other users that this user finished the game
      this.setState({ pictureCounter: this.state.pictureCounter +1, });
    }
    
    pictureProgress = () => {
      let body = {user: this.state.user, templateNr: this.state.randomInt}
     

      this.setState({randomInt: this.getRandomInt(19)})
        //get template for all users like in component did mount

      this.setState({ pictureCounter: this.state.pictureCounter +1, });
    }


    getRandomInt = (max) => {
      let randomInt = Math.floor(Math.random() * Math.floor(max));
      return randomInt;
    }

    reportTimerTime = (time) => {
      post("/api/GameEndTimeMultiplayer").then(() => {  //=player finished
        get("/api/user").then((user) => {
          let end = new Date(user.currentEndTimeMultiplayer);
          let start = new Date (user.currentStartTimeMultiplayer);
          let finalServerTime = end - start;
          //console.log(finalServerTime)
          let seconds = ("0" + (Math.floor(finalServerTime / 1000) % 60)).slice(-2);
          let minutes = ("0" +(Math.floor(finalServerTime / 60000) % 60)).slice(-2);
          let centiseconds = ("0" + (Math.floor(finalServerTime / 10) % 100)).slice(-2);
          this.setState({finalServerTime: minutes + ":" + seconds + ":" + centiseconds})
          console.log("Time: " + this.state.finalServerTime)
        
          //send finalServerTime to other users

          this.setState({showGameOver: true})
        })
      })
      this.setState({finalTimerTime: time})
    }

    render() {
      let sceneNumber = Images[this.state.randomInt];
 
      let noScroll = require('no-scroll');
      setTimeout(() => {noScroll.on()}, 250);
      
      return(
        //console.log;
        <div className="SinglePlayer-container">
          <div className="SinglePlayer-SearchImageContainer">
            <MultiplayerGame sceneNumber={sceneNumber} randomInt={this.state.randomInt} pictureCounter={this.state.pictureCounter} user={this.state.user} endGame={this.endGame} imageCount={this.state.imageCount} pictureProgress={this.pictureProgress}/>
          </div>
          <div className="SinglePlayer-SideBarContainer">
            <MultiplayerGameSidebar finalServerTime={this.state.finalServerTime} pictureCounter={this.state.pictureCounter} user={this.state.user} gameOn={this.state.gameOn} reportTimerTime={this.reportTimerTime} randomInt={this.state.randomInt}/>
          </div> 
            
          { (!this.state.gameOn) ? (
          <div> 
            <div className="SinglePlayer-dimBackground"></div>
          <div className="SinglePlayer-GameOver u-flexColumn u-flex-alignCenter u-flex-justifyCenter">
          
            <div> <h2>
              Game over </h2>
            </div>

            <div>
              {this.state.showGameOver? (`Your time was ${this.state.finalServerTime} for ${this.state.imageCount=="1" ? this.state.imageCount+ " image.": this.state.imageCount+ " images."}`) : ("Loading the exact time...")}
            </div>

                {/* add multiplayer-specific info */}

            <div>
            <Link to="/multiplayergameover">
              <button
                  type="submit"
                  className="u-pointer SinglePlayer-GameOverButton"
                  value="Change"
                  >
                    {/* multiplayer specific text */}
              </button>
            </Link>
              
            </div>

          </div>

          </div>) : ("")}
        </div>
      )
    }
 }

 export default Multiplayer;