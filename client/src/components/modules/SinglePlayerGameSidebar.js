import React, { Component } from "react";
import { Link } from "@reach/router";
import { get, post } from "../../utilities.js";
import "../../utilities.css";
import "../App.css";
import "../pages/SinglePlayer.css"

class SinglePlayerGameSidebar extends Component {
    constructor (props) {
        super(props);
        this.state = {
          images: [],
          timerOn: false,
          timerStart: 0,
          timerTime: 0,
          imageCredits: [
            (<>Photo by <a href="https://unsplash.com/@chuttersnap?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">CHUTTERSNAP</a> on <a href="https://unsplash.com/s/photos/crowd?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>, altered.</>),
            (<>Photo by <a href="https://unsplash.com/@chuttersnap?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">CHUTTERSNAP</a> on <a href="https://unsplash.com/s/photos/crowd?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>, altered.</>),
            (<>Photo by <a href="https://unsplash.com/@chuttersnap?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">CHUTTERSNAP</a> on <a href="https://unsplash.com/s/photos/crowd?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>, altered.</>),
            (<>Photo by JohnDarrochNZ on <a href="https://commons.wikimedia.org/wiki/File:Crowd_listening_to_speakers.jpg">Wikimedia</a>, altered.</>),
            (<>Photo by Visit El Paso on <a href="https://flickr.com/photos/72649499@N02/16097570266">Flickr</a>, altered.</>),
            (<>Photo by Visit El Paso on <a href="https://flickr.com/photos/72649499@N02/16097570266">Flickr</a>, altered.</>),
            (<>Photo by Visit El Paso on <a href="https://flickr.com/photos/72649499@N02/16097570266">Flickr</a>, altered.</>),
            (<>Photo by <a href="https://unsplash.com/@hansonluu?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Hanson Lu</a> on <a href="https://unsplash.com/s/photos/crowd?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>, altered.</>),
            (<>Photo by <a href="https://unsplash.com/@hansonluu?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Hanson Lu</a> on <a href="https://unsplash.com/s/photos/crowd?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>, altered.</>), //8, t10
            (<>Photo by <a href="https://pixabay.com/de/users/keithjj-2328014/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Keith Johnston</a> on <a href="https://pixabay.com/de/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Pixabay</a>, altered.</>),
            (<>Photo by <a href="https://pixabay.com/de/users/keithjj-2328014/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Keith Johnston</a> on <a href="https://pixabay.com/de/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Pixabay</a>, altered.</>),
            (<>Photo by <a href="https://pixabay.com/de/users/keithjj-2328014/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Keith Johnston</a> on <a href="https://pixabay.com/de/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Pixabay</a>, altered.</>),
            (<>Photo by <a href="https://pixabay.com/de/users/keithjj-2328014/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Keith Johnston</a> on <a href="https://pixabay.com/de/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Pixabay</a>, altered.</>), //12, t14
            (<>Photo by <a href="https://pixabay.com/de/users/ben_kerckx-69781/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1355493">Ben Kerckx</a> on <a href="https://pixabay.com/de/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1355493">Pixabay</a>, altered.</>),
            (<>Photo by <a href="https://pixabay.com/de/users/ben_kerckx-69781/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1355493">Ben Kerckx</a> on <a href="https://pixabay.com/de/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1355493">Pixabay</a>, altered.</>),
            (<>Photo by <a href="https://pixabay.com/de/users/ben_kerckx-69781/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1355493">Ben Kerckx</a> on <a href="https://pixabay.com/de/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1355493">Pixabay</a>, altered.</>),
            (<>Photo by <a href="https://pixabay.com/de/users/keithjj-2328014/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Keith Johnston</a> on <a href="https://pixabay.com/de/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Pixabay</a>, altered.</>), //16, t18
            (<>Photo by <a href="https://pixabay.com/de/users/keithjj-2328014/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Keith Johnston</a> on <a href="https://pixabay.com/de/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Pixabay</a>, altered.</>),
            (<>Photo by <a href="https://pixabay.com/de/users/keithjj-2328014/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Keith Johnston</a> on <a href="https://pixabay.com/de/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Pixabay</a>, altered.</>),
            (<>Photo by <a href="https://pixabay.com/de/users/keithjj-2328014/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Keith Johnston</a> on <a href="https://pixabay.com/de/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1573901">Pixabay</a>, altered.</>), //19, t21
        ],
        currentPauseTimes: [],
        currentPauseEndTimes: [],
        }
    }
   

    componentDidMount() {
      get("/api/getImages").then(images => {
        this.setState({ images: images });
      });
      //post("/api/GameStartTime");
      }

    componentDidUpdate() {
      if (this.state.timerOn) {
      if (!this.props.gameOn) {
        console.log(this.props.finalServerTime)
        this.stopTimer();
        
        this.props.reportTimerTime(this.state.timerTime);
        this.props.reportPauseTimes(this.state.currentPauseTimes);
        this.props.reportPauseEndTimes(this.state.currentPauseEndTimes);
      }}

      if (this.props.gameOn) {
        if (this.state.timerOn) {
          if (this.props.loading) {
            console.log("The clock has been stopped because the image is loading.")
            this.stopTimer();
            post("/api/GamePauseTime").then((user) => this.setState({currentPauseTimes: this.state.currentPauseTimes.concat(user.currentPauseTime)}));
            //console.log(this.state)
          }}
          
        else {
          if (this.props.loading==0) {
            console.log("The clock has started because the image loaded.")
            this.startTimer();
            post("/api/GamePauseEndTime").then((user) => this.setState({currentPauseEndTimes: this.state.currentPauseEndTimes.concat(user.currentPauseEndTime)}));
            //console.log(this.state)
          }
        }
      }
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
      let time= this.props.finalServerTime === 0 ? minutes + ":" + seconds + ":" + centiseconds : this.props.finalServerTime;

      //console.log(this.props.user);
      //console.log(username);
      return (
        <div className="u-flexColumn u-flex-alignCenter u-textCenter">
          <h2>Tag yourself!</h2>
          <p className="SinglePlayer-ImageCredit">{this.props.randomInt || this.props.randomInt === 0 ? this.state.imageCredits[this.props.randomInt] : "Loading image Credits..."}</p>
          <p>Game on, {username}! {window.innerWidth >= 585 ?("Use the buttons to move and zoom the image."):("")}  {window.innerWidth >= 728 ?("Find and click on yourself!"):("")}</p>
          <div className="SinglePlayer-Timers">
            
            <div className="Stopwatch">
              <div className="Stopwatch-header"></div>
              <div className="Stopwatch-display u-Bebas u-fontsize30">
                {/* {minutes} : {seconds} : {centiseconds}  */}
                {time}
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