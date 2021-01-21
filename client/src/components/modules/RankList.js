import React, { Component } from "react";
import { get, post } from "../../utilities.js";
import { Link } from "@reach/router";
import "../../utilities.css";
import "../pages/Home.css";
import "../App.css";
import "../pages/SinglePlayerGameOver.css";


class RankList extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
        times : [],
        user: undefined,
    }
  }

  componentDidMount() {
    this.setState({times: this.props.user.playedTimes});
    // this.setState({times: this.props.user.playedTimes[0]});
      // get("/api/whoami").then((user) => {
      //   if (user._id) {
      //     this.setState({ user: user});
      //   }
      // })
      // ;
      // const query = {userId: this}
      // get("/api/getTimes", query).then((user) => {
      //   console.log("user")
      // })
    }

    componentDidUpdate() {
      if(this.props.user.playedTimes !== this.state.times) {
      this.setState({times: this.props.user.playedTimes});
      }

    }

    render() {
    // let variable;
    // if (this.props.user !== undefined) {
    //   let usertimes = this.props.user.playedTimes;
    // }

        // this still nedds some work, is the start to highlight the last time
        let ranklist;
    // let ranklist = this.state.times.slice(0,10).map((time, index) => (
    //   <div key={index} className="SPGO-timeBox" >{index+1} | {("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 10) % 100)).slice(-2)}</div>
    // ));
      
      let lastTime = this.state.times[this.state.times.length-1]
      let sortedTimes = this.state.times.sort((a,b) => a - b);
      let tenBestTimes = sortedTimes.slice(0,10)

      console.log(lastTime);
      console.log(tenBestTimes[tenBestTimes.length-1]);
      
      if (lastTime <= tenBestTimes[tenBestTimes.length-1]) {
        ranklist = sortedTimes.slice(0,10).map((time, index) => (
          <>
         {lastTime === time ?  (
                <div key={"lasttime"+index} className="SPGO-timeBox SPGO-lastTimeBox" >
                  <div className="SPGO-lastTime">Last Time</div>
                  {index+1} | {("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 10) % 100)).slice(-2)}
                </div>
              ) : (
                <div key={"notlasttime"+index} className="SPGO-timeBox" >
                  {index+1} | {("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 10) % 100)).slice(-2)}
                </div>
              )}
          </>
        ));
        
      }
      else {
        ranklist = this.state.times.slice(0,10).map((time, index) => (
          <div key={index} className="SPGO-timeBox" >{index+1} | {("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 10) % 100)).slice(-2)}</div>
        ));
      }

    return (
      // <div>
      // <div className="u-flexColumn u-flex-alignCenter">
      //   <h2 className="textCenter">Your Time</h2>
      //   <div className="SPGO-shortHorizontalLine"> </div>
      // <div className="SPGO-timesContainer">
      //    <Stopwatch/>
      // </div>
      // </div>
      <div className="u-flexColumn u-flex-alignCenter">
        <h2 className="textCenter">Your Best Times</h2>
        <div className="SPGO-shortHorizontalLine"> </div>
      <div className="SPGO-timesContainer">
          {ranklist}
      </div>
      </div>
      // </div>
    );
  }
}

export default RankList;
