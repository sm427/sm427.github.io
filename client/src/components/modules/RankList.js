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

    get("/api/whoami").then((currentuser) => {
      get(`/api/user`, { userid: currentuser._id}).then((userObj) => {
        this.setState({ user: userObj});
        this.setState({times: userObj.playedTimes})
        //console.log(userObj)
      });
    })

    // });
    // let imageCountProp = await this.props.imageCount;
    // let user = await this.props.user;
    // let userId = await user._id;
    // let query = {userid: userId, imageCount: imageCountProp}
    //   get("api/getUserTimes", query).then((timesObj) =>{
    //       for (let i=0; i<timesObj.length; i++) {
    //         this.setState({times: this.state.times.concat(timesObj.playedTimes[i])})
    //       }
    //   });

    //this.setState({times: this.props.user.playedTimes});
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
      // if(this.props.user.playedTimes !== this.state.times) {
      // this.setState({times: this.props.user.playedTimes});
      // }

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
    console.log(this.props.imageCount)
      let relevantTimeObjs = this.state.times.filter((x) => {return x[1] === this.props.imageCount} )
      let relevantTimes = []
      for (let i=0; i<relevantTimeObjs.length; i++) {
        relevantTimes = relevantTimes.concat(relevantTimeObjs[i][0])
      }
      let lastTime = relevantTimes[relevantTimes.length-1]
      let sortedTimes = relevantTimes.sort((a,b) => a - b);
      let tenBestTimes = sortedTimes.slice(0,10)

      //console.log(lastTime);
      //console.log(tenBestTimes[tenBestTimes.length-1]);
      
      if (lastTime - tenBestTimes[tenBestTimes.length-1] <= 0 ) {

        ranklist = sortedTimes.slice(0,10).map((time, index) => (
          <div key={index+"_"+time} className="SPGO-timeBox">
         {lastTime === time ?  (
                <div className="SPGO-lastTimeBox" >
                  <div className="SPGO-lastTime">Last Time</div>
                  {index+1} | {("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 10) % 100)).slice(-2)}
                </div>
              ) : (
                <div>
                  {index+1} | {("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 10) % 100)).slice(-2)}
                </div>
              )}
          </div>
        ));
        
      }
      else if(relevantTimes.length === 0) {ranklist = "No games played."}
      else {
        ranklist = sortedTimes.map((time, index) => (
          <>
         {index < 8 ?  (
                <div key={"notlasttime"+index+"_"+time} className="SPGO-timeBox">
                  {index+1} | {("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 10) % 100)).slice(-2)}
                </div>
              ) : ( <> {lastTime===time? (
                    <div key={"lasttime"+index+"_"+time} className="SPGO-timeBox" >
                      <div className="SPGO-lastTime">Last Time</div>
                      {index+1} | {("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 10) % 100)).slice(-2)}
                    </div>
                  ):( 
                    <> 
                      {index===8?(<div key={"placeholder"+index+"_"+time} className="SPGO-placeholderTime"></div>):(<div key={"notshown"+index+"_"+time}></div>)}                
                    </>
                  )}
                </>
              )}
          </>
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
        <h2 className="textCenter">Your Best Times for {this.props.imageCount === "1" ? this.props.imageCount + " round" : this.props.imageCount + " rounds"}</h2>
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
