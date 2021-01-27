import React, { Component } from "react";
import { get, post } from "../../utilities.js";
import { Link } from "@reach/router";
//import { get, post } from "../../utilities";
import { Redirect } from "react-router-dom";
import SinglePlayerGame from "../modules/SinglePlayerGame.js"
import PuzzleOfTheDayGame from "../modules/SinglePlayerGame.js"
import SinglePlayerGameSidebar from "../modules/SinglePlayerGameSidebar.js"
//import Waldo from "../modules/Waldo.js"
import { useHistory } from "react-router-dom";

import "./SinglePlayer.css";
import "../../utilities.css";

import Images from "../images/photoIndex.js";

class PuzzleOfTheDay extends Component {
    constructor (props) {
        super(props);
        this.state = {
            redirect: "/",
            user: undefined,
            finalTimerTime: 0,
            pictureCounter : 0,
            gameOn: true,
            randomInt: null,
            imageCount: 1,
            finalServerTime: 0,
            showGameOver: false,
            loading: 3,
            pauseEndTimes: [],
            pauseTimes: [],
            date: undefined,
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
      get("/api/user", { userid: this.props.userId}).then((user) => {
            fetch("http://worldclockapi.com/api/json/est/now").then((response) => {return response.json(); }).then((data) => {
                this.setState({date: data.currentDateTime})
                let day = data.currentDateTime.slice(8,10)
                console.log(data.currentDateTime)
                let month = data.currentDateTime.slice(5,7)
                let selectedImage = (parseInt(day) + parseInt(month) - 8 + Images.length)%Images.length
              this.setState({randomInt:  (parseInt(day) + parseInt(month) - 8 + Images.length)%Images.length});
              
            })
      })
    }
    

    endGame = () => {
      console.log("Game ended.");
      this.setState({gameOn: false});
      this.setState({ pictureCounter: this.state.pictureCounter +1, });
    }
    
    pictureProgress = () => {
      this.setState({ pictureCounter: this.state.pictureCounter +1, });
    }

    reportTimerTime = (time) => {
      post("/api/GameEndTime").then(() => {
        get("/api/user").then((user) => {
          //this.setState({startServerTime: user.currentStartTime, endServerTime: user.currentEndTime})
          //let finalServerTime = user.currentEndTime - user.currentStartTime;
          //console.log(user.currentEndTime)
          //console.log(user.currentStartTime)
          let end = new Date(user.currentEndTime);
          let start = new Date (this.state.pauseEndTimes[0]);
          let allTime = end - start;

          //console.log(end)
          //console.log(start)
            //console.log(allTime)
          let finalServerTime = allTime
          
          //console.log(finalServerTime)
          let seconds = ("0" + (Math.floor(finalServerTime / 1000) % 60)).slice(-2); // timers-demo library {https://github.com/peterdurham/timers-demo}
          let minutes = ("0" +(Math.floor(finalServerTime / 60000) % 60)).slice(-2);
          let centiseconds = ("0" + (Math.floor(finalServerTime / 10) % 100)).slice(-2);
          this.setState({finalServerTime: minutes + ":" + seconds + ":" + centiseconds})
          console.log("Time: " + this.state.finalServerTime)
          let body = {finalTime: finalServerTime, user: this.state.user, date: this.state.date.slice(0,10)}
          //console.log(body);
          post("/api/podttimes", body);
          post("/api/podtplayed", body);
          //post("/api/times", body);
          this.setState({showGameOver: true})
        })
      })
      this.setState({finalTimerTime: time})
    }

    reportLoading = (x) => {
      this.setState({loading: this.state.loading + x})
    }

    reportPauseEndTimes = (times) => {
      this.setState({pauseEndTimes: times})
    }

    reportPauseTimes = (times) => {
      this.setState({pauseTimes: times})
    }

    render() {
      let sceneNumber = Images[this.state.randomInt];
      let noScroll = require('no-scroll'); // no-scroll library {https://github.com/davidtheclark/no-scroll}
      setTimeout(() => {noScroll.on()}, 250);
      //console.log(this.state.loading)

      let anticheat = ""
        if (this.state.user && this.state.date) {
            //console.log(this.state.user.playedPOTD);
           //console.log(this.state.date.slice(0,10));
       if (this.state.user.playedPOTD.includes(this.state.date.slice(0,10))) {
           
       anticheat = (<div> 
          <div className="SinglePlayer-dimBackground"></div>
        <div className="SinglePlayer-GameOver u-flexColumn u-flex-alignCenter u-flex-justifyCenter">
        
          <div> <h2>
            You have already played today! </h2>
          </div>

          <div className="SinglePlayer-longGameOverText">
            You aren't allowed to play the puzzle of the day multiple times. Come back tomorrow.
          </div>
          

          <div>
          <Link to="/puzzleofthedaygameover">
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

        </div>)}}
        
      
      return(
        //console.log;
        <div className="SinglePlayer-container">
          <div className="SinglePlayer-SearchImageContainer">
            <PuzzleOfTheDayGame sceneNumber={sceneNumber} randomInt={this.state.randomInt} pictureCounter={this.state.pictureCounter} user={this.state.user} endGame={this.endGame} imageCount={this.state.imageCount} pictureProgress={this.pictureProgress} reportLoading={this.reportLoading}/>
          </div>
          <div className="SinglePlayer-SideBarContainer">
            <SinglePlayerGameSidebar finalServerTime={this.state.finalServerTime} pictureCounter={this.state.pictureCounter} user={this.state.user} gameOn={this.state.gameOn} reportTimerTime={this.reportTimerTime} randomInt={this.state.randomInt} loading={this.state.loading} reportPauseTimes={this.reportPauseTimes} reportPauseEndTimes={this.reportPauseEndTimes}/>
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
              {this.state.showGameOver? (`You solved the puzzle of the day in ${this.state.finalServerTime}!`):("")}
            </div>
            <div className="SinglePlayer-gameOverShortLine"/>
            <div className="SinglePlayer-longGameOverText">
                Was this fast enough to be number 1 on the puzzle of the day ranklist or do you have to chance your luck tomorrow?
            </div>

            <div>
            <Link to="/puzzleofthedaygameover">
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

          {anticheat}
        </div>
      )
    }
 }

 export default PuzzleOfTheDay;