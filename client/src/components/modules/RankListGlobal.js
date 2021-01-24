import React, { Component } from "react";
import { get, post } from "../../utilities.js";
import { Link } from "@reach/router";
import "../../utilities.css";
import "../pages/Home.css";
import "../App.css";
import "../pages/SinglePlayerGameOver.css";


class RankListGlobal extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
        times : [],
        user: undefined,
    }
  }

  async componentDidMount() {
      let imageCountProp = await this.props.imageCount
      let query = {imageCount: imageCountProp}
        get("api/getGlobalTimes", query).then((timesObj) =>{
            for (let i=0; i<timesObj.length; i++) {
              this.setState({times: this.state.times.concat(timesObj[i])})
            }
        });
    }

    // componentDidUpdate() {
    //   if(this.props.user.playedTimes !== this.state.times) {
    //   this.setState({times: this.props.user.playedTimes});
    //   }

    // }

    render() {

        let ranklist;
      if (this.state.times.length > 0) {
          
    let lastTime = this.state.times[this.state.times.length-1].time
    let sortedTimes = this.state.times.sort((a,b) => a.time - b.time);
    let tenBestTimes = sortedTimes.slice(0,10)
      
      if (lastTime - tenBestTimes[tenBestTimes.length-1].time <= 0 ) {
        // console.log("good");
        ranklist = tenBestTimes.map((timeObj, index) => (
          <>
          {/* <div key={index} className="SPGO-timeBox">
                  {index+1} | {("0" + (Math.floor(timeObj.time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 10) % 100)).slice(-2)} | {timeObj.username}
                </div>
          {console.log(timeObj.time)} */}
         {lastTime === timeObj.time ?  (
                <div key={"lasttime"+index} className="SPGO-timeBox SPGO-lastTimeBox" >
                  <div className="SPGO-lastTime">Last Time</div>
                  {index+1} | {("0" + (Math.floor(timeObj.time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 10) % 100)).slice(-2)} 
                  <div className="SPGO-usernameBox">{timeObj.username}</div>
                </div>
              ) : (
                <div key={"notlasttime"+index} className="SPGO-timeBox" >
                  {index+1} | {("0" + (Math.floor(timeObj.time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 10) % 100)).slice(-2)}
                  <div className="SPGO-usernameBox">{timeObj.username}</div>
                </div>
              )} 
          </>
        ));
        
      }
      else {
        // console.log("bad");
        ranklist = sortedTimes.map((timeObj, index) => (
          <>
         {index < 8 ?  (
                <div key={"notlasttime"+index} className="SPGO-timeBox" >
                    {index+1} | {("0" + (Math.floor(timeObj.time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 10) % 100)).slice(-2)}
                    <div className="SPGO-usernameBox">{timeObj.username}</div>
                </div>
              ) : ( <> {lastTime===timeObj.time? (
                    <div key={"lasttime"+index} className="SPGO-timeBox SPGO-lastTimeBox" >
                        <div className="SPGO-lastTime">Last Time</div>
                        {index+1} | {("0" + (Math.floor(timeObj.time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 10) % 100)).slice(-2)} 
                        <div className="SPGO-usernameBox">{timeObj.username}</div>
                    </div>
                  ):( 
                    <> 
                      {index===8?(<div key={"placeholder"+index} className="SPGO-placeholderTime"></div>):(<div key={"notshown"+index}></div>)}                
                    </>
                  )}
                </>
              )}
          </>
        ));
        
      }}

    return (
      <div className="u-flexColumn u-flex-alignCenter">
        <h2 className="textCenter">Global Leaderboard for {this.props.imageCount === "1" ? this.props.imageCount + " round" : this.props.imageCount + " rounds"} </h2>
        <div className="SPGO-shortHorizontalLine"> </div>
      <div className="SPGO-timesContainer">
          {ranklist}
      </div>
      </div>
    );
  }
}

export default RankListGlobal;
