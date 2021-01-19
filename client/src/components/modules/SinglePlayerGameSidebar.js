import React, { Component } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities.js";
import "../../utilities.css";
import "../App.css";
import "../pages/SinglePlayer.css"
import Stopwatch from "./GameStopwatch.js"

class SinglePlayerGameSidebar extends Component {
    constructor (props) {
        super(props);
        this.state = {
          images: [],
          timerOn: false,
          timerStart: 0,
          timerTime: 0
        }
    }
   

    componentDidMount() {
      get("/api/getImages").then(images => {
        this.setState({ images: images });
      });
      this.startTimer();
      }

    componentDidUpdate() {
      if (this.state.timerOn) {
      if (!this.props.gameOn) {
        this.stopTimer()
      }}
    }
    
      startTimer = () => {
        this.setState({
          timerOn: true,
          timerTime: this.state.timerTime,
          timerStart: Date.now() - this.state.timerTime
        });
        this.timer = setInterval(() => {
          this.setState({
            timerTime: Date.now() - this.state.timerStart
          });
        }, 10);
      };
    
      stopTimer = () => {
        this.setState({ timerOn: false });
        clearInterval(this.timer);
      };
    
      resetTimer = () => {
        this.setState({
          timerStart: 0,
          timerTime: 0
        });
      };

    // use props here to update time and picture progress
    render() {
      let username;
      (this.props.user) ? (username = this.props.user.username) : (username="Username is loading...");

      const { timerTime } = this.state;
      let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
      let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
      let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
      let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

      //console.log(this.props.user);
      //console.log(username);
      return (
        <div className="u-flexColumn u-flex-alignCenter u-textCenter">
          <h2>Tag yourself!</h2>
          <p className="SinglePlayer-ImageCredit">Photo by CHUTTERSNAP on Unsplash.</p>
          <p>Game on, {username}! Use the bottons to move the image. Find and click on yourself! Currently optimized for laptop screens.</p>
          <div className="SinglePlayer-Timers">
            
            <div className="Stopwatch">
              <div className="Stopwatch-header"></div>
              <div className="Stopwatch-display u-Bebas u-fontsize30">
                {/* {hours} : */} {minutes} : {seconds} : {centiseconds} 
              </div>
              {/* {this.state.timerOn === false && this.state.timerTime === 0 && (
                <button className="SinglePlayer-button" onClick={this.startTimer}>Start</button>
              )}
              {this.state.timerOn === true && (
                <button className="SinglePlayer-button" onClick={this.stopTimer}>Stop</button>
              )}
              {this.state.timerOn === false && this.state.timerTime > 0 && (
                <button className="SinglePlayer-button" onClick={this.startTimer}>Resume</button>
              )}
              {this.state.timerOn === false && this.state.timerTime > 0 && (
                <button className="SinglePlayer-button" onClick={this.resetTimer}>Reset</button>
              )} */}
            </div>

          </div>
          <div className="SinglePlayer-SideBarPictureContainer">
          <img src={this.state.images[0]} className="SinglePlayer-SideBarPicture"/>
          {/* {
            this.state.images.map((image, index) => (
            <img src={image} key={index} className="SinglePlayer-SideBarPicture"/>
            ))
         } */}
          </div>
        </div>
      )
      }


}

export default SinglePlayerGameSidebar;