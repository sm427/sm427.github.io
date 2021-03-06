import React, { Component } from "react";
import { get, post } from "../../utilities.js";
import { Link } from "@reach/router";
//import { get, post } from "../../utilities";
import { Redirect } from "react-router-dom";
import SinglePlayerGame from "../modules/SinglePlayerGame.js"
import SinglePlayerGameSidebar from "../modules/SinglePlayerGameSidebar.js"
//import Waldo from "../modules/Waldo.js"
import { useHistory } from "react-router-dom";

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
            randomInt: null,
            imageCount: 3,
            finalServerTime: 0,
            showGameOver: false,
            loading: 3,
            pauseEndTimes: [],
            pauseTimes: [],
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
              if (user.playedTemplates.length >= Images.length) { //nr of templates
                //console.log(user.playedTemplates);
                post("/api/clearPlayedTemplates").then((updateUser) => {
                  console.log("Cleared record of played templates for " + updateUser.username + " because all templates have been played.");});
                  this.setState({randomInt: this.getRandomInt(Images.length)}) 
                  //console.log("set randomInt")
              }
              else {
                //console.log("else");
                //console.log(user.playedTemplates);
                let unplayedTemplates = [];
                for (let i=0; i < Images.length; i++) {
                  unplayedTemplates=unplayedTemplates.concat(i)
                }
                let difference = unplayedTemplates.filter(x => !user.playedTemplates.includes(x));
                //console.log("unplayed templates: " + JSON.stringify(difference))
                let randomInt = difference[this.getRandomInt(difference.length -1)]
              this.setState({randomInt: randomInt});
              }
            })
      
        this.setState({imageCount: parseInt(this.props.imageCount)})
        
    }

    // componentDidUpdate() {
    //   if (!this.props.userId) {
    //     this.setState({loading: 100})
    //     this.handleLogout
    //   }
    // }

    // handleLogout = () => {
    //   const history = useHistory();

    //     redirect = () => {
    //       history.push("/home")
    //     }
    // }

    endGame = () => {
      let body = {user: this.state.user, templateNr: this.state.randomInt}
      post("/api/reportPlayedTemplate", body).then((userObj) => {console.log("Templates played in this round: " + JSON.stringify(userObj.playedTemplates.slice(userObj.playedTemplates.length - this.state.imageCount)));});

      console.log("Game ended.");
      this.setState({gameOn: false});
      this.setState({ pictureCounter: this.state.pictureCounter +1, });
    }
    
    pictureProgress = () => {
      let body = {user: this.state.user, templateNr: this.state.randomInt}
      // console.log("pictureProgress")
      post("/api/reportPlayedTemplate", body).then((userObj) => { //console.log("Played Templates: " + JSON.stringify(userObj.playedTemplates));
        
      get("/api/user").then((user) => {
        //console.log("Got user for playedTemplates")
        if (user.playedTemplates.length >= Images.length) { //nr of templates
          //console.log(user.playedTemplates);
          post("/api/clearPlayedTemplates").then((updateUser) => {
            console.log("Cleared record of played templates for " + updateUser.username + " because all templates have been played.");});
            this.setState({randomInt: this.getRandomInt(Images.length)}) 
        }
        else {
          //console.log("else");
            let unplayedTemplates = [];
            for (let i=0; i < Images.length; i++) {
              unplayedTemplates=unplayedTemplates.concat(i)
            }
            let difference = unplayedTemplates.filter(x => !user.playedTemplates.includes(x));
            //console.log("unplayed templates: " + JSON.stringify(difference))
            let randomInt = difference[this.getRandomInt(difference.length -1)]
          this.setState({randomInt: randomInt});
        }
      })
      });
      this.setState({ pictureCounter: this.state.pictureCounter +1, });
    }

    // getRandomInt = (max) => {
    //   console.log("get random int")
    //   let randomInt;
    //   console.log(this.props.userId)
    //   get("/api/user", { userid: this.props.userId}).then((user) => {
    //       console.log(user);
    //       if (user.playedTemplates.length >= 4) { //nr of templates
    //         //console.log("if");
    //         post("/api/clearPlayedTemplates").then((updateUser) => {
    //           randomInt = Math.floor(Math.random() * Math.floor(max))}) //.catch(console.log("err2"))
    //           console.log("Cleared played templates for " + updateUser.username);
    //           console.log(randomInt);
              
    //       }
    //       else {
    //         //console.log("else");
    //         randomInt = Math.floor(Math.random() * Math.floor(max))
    //         while (user.playedTemplates.includes(randomInt)) {
    //           randomInt = Math.floor(Math.random() * Math.floor(max))
    //         }
    //         console.log(randomInt);
    //       }
    //     }).catch(console.log("err"))
      
    // }

    getRandomInt = (max) => {
      let randomInt = Math.floor(Math.random() * Math.floor(max));
      //console.log("set randomInt to "+randomInt)
      return randomInt;
    }

    reportTimerTime = (time) => { // timers-demo library {https://github.com/peterdurham/timers-demo}
      post("/api/GameEndTime").then(() => {
        get("/api/user").then((user) => {
          //this.setState({startServerTime: user.currentStartTime, endServerTime: user.currentEndTime})
          //let finalServerTime = user.currentEndTime - user.currentStartTime;
          //console.log(user.currentEndTime)
          //console.log(user.currentStartTime)
          let end = new Date(user.currentEndTime);
          let start = new Date (this.state.pauseEndTimes[0]);
          let allTime = end - start;
          let pause1;
          let pause2;
          let pause3;
          let pause4;

          if (this.state.pauseEndTimes[1]) {
            let pause1start = new Date (this.state.pauseTimes[0]);
            let pause1end = new Date (this.state.pauseEndTimes[1]);
            pause1 = pause1end - pause1start
          }

          if (this.state.pauseEndTimes[2]) {
            let pause2start = new Date (this.state.pauseTimes[1]);
            let pause2end = new Date (this.state.pauseEndTimes[2]);
            pause2 = pause2end - pause2start
          }

          if (this.state.pauseEndTimes[3]) {
            let pause3start = new Date (this.state.pauseTimes[2]);
            let pause3end = new Date (this.state.pauseEndTimes[3]);
            pause3 = pause3end - pause3start
          }

          if (this.state.pauseEndTimes[4]) {
            let pause4start = new Date (this.state.pauseTimes[3]);
            let pause4end = new Date (this.state.pauseEndTimes[4]);
            pause4 = pause4end - pause4start
          }

          let finalServerTime = allTime

          if (pause1) {finalServerTime = finalServerTime - pause1}
          if (pause2) {finalServerTime = finalServerTime - pause2}
          if (pause3) {finalServerTime = finalServerTime - pause3}
          if (pause4) {finalServerTime = finalServerTime - pause4}
          
          //console.log(finalServerTime)
          let seconds = ("0" + (Math.floor(finalServerTime / 1000) % 60)).slice(-2); // timers-demo library {https://github.com/peterdurham/timers-demo}
          let minutes = ("0" +(Math.floor(finalServerTime / 60000) % 60)).slice(-2);
          let centiseconds = ("0" + (Math.floor(finalServerTime / 10) % 100)).slice(-2);
          this.setState({finalServerTime: minutes + ":" + seconds + ":" + centiseconds})
          console.log("Time: " + this.state.finalServerTime)
          let body = {finalTime: finalServerTime, user: this.state.user, imageCount: this.state.imageCount}
          post("/api/reportTime", body);
          post("/api/times", body);
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
      //let sceneNumber = Images[this.state.randomInt];
      let sceneNumber = Images[this.state.randomInt];
      //console.log("Playing Image #" + this.state.randomInt)
      // const finalTimerTime  = this.state.finalTimerTime;
      // let centiseconds = ("0" + (Math.floor(finalTimerTime / 10) % 100)).slice(-2);
      // let seconds = ("0" + (Math.floor(finalTimerTime / 1000) % 60)).slice(-2);
      // let minutes = ("0" + (Math.floor(finalTimerTime / 60000) % 60)).slice(-2);
      // <! -- images[randomIntString]-->
      let noScroll = require('no-scroll'); // no-scroll library {https://github.com/davidtheclark/no-scroll}
      setTimeout(() => {noScroll.on()}, 250);
      //console.log(this.state.loading)
      
      return(
        //console.log;
        <div className="SinglePlayer-container">
          <div className="SinglePlayer-SearchImageContainer">
            <SinglePlayerGame sceneNumber={sceneNumber} randomInt={this.state.randomInt} pictureCounter={this.state.pictureCounter} user={this.state.user} endGame={this.endGame} imageCount={this.state.imageCount} pictureProgress={this.pictureProgress} reportLoading={this.reportLoading}/>
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
              {this.state.showGameOver? (`Your time was ${this.state.finalServerTime} for ${this.state.imageCount=="1" ? this.state.imageCount+ " image.": this.state.imageCount+ " images."}`) : ("Loading the exact time...")}
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

            {/* <button
                  type="submit"
                  className="u-pointer App-submit Home-singlePlayerButton"
                  value="Change"
                  // onClick={}
                >
                  Play Again!
                </button> */}
              
            </div>

          </div>

          </div>) : ("")}
        </div>
      )
    }
 }

 export default SinglePlayer;