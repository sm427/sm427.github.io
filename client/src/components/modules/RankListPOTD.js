import React, { Component } from "react";
import { get, post } from "../../utilities.js";
import "../../utilities.css";
import "../pages/Home.css";
import "../App.css";
import "../pages/SinglePlayerGameOver.css";


class RankListPOTD extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
        times : [],
        user: undefined,
        lastTime: 0,
        date: undefined,
    }
  }

  async componentDidMount() {
      let imageCountProp = await this.props.imageCount
      this.setState({initialImageCount: this.props.imageCount})
      let datewrong = new Date();
      let date=datewrong.toISOString();
        this.setState({date: date}) 
        // let query = 
        // console.log(query)
        get("api/getPOTDtimes", {playedDate: date.slice(0,10)}).then((timesObj) =>{
            //console.log(timesObj)
            for (let i=0; i<timesObj.length; i++) {
              this.setState({times: this.state.times.concat(timesObj[i])})
            }
            //console.log(timesObj[timesObj.length-1].time)
            // if (timesObj.length !== 0) {this.setState({lastTime: timesObj[timesObj.length-1].time})}
        });
        
    }

    // componentDidUpdate() {
    //   if(this.props.user.playedTimes !== this.state.times) {
    //   this.setState({times: this.props.user.playedTimes});
    //   }

    // }


    render() {
      //console.log(this.props.imageCount)
        let ranklist;
        // let lastTimeObjArr;
      if (this.state.times.length > 0) {
          
    //let lastTime = this.state.times[this.state.times.length-1].time
    let sortedTimes = this.state.times.sort((a,b) => a.time - b.time);
    let tenBestTimes = sortedTimes.slice(0,10)
    //console.log(this.state.lastTime)
    //console.log(tenBestTimes[tenBestTimes.length-1].time)
    //console.log(this.state.times.userId);
    //console.log(this.props.user._id)
      
      if (this.state.lastTime - tenBestTimes[tenBestTimes.length-1].time <= 0 || this.props.imageCount != this.state.initialImageCount) {
        // console.log("good");
        ranklist = tenBestTimes.map((timeObj, index) => (
          <>
          {/* <div key={index} className="SPGO-timeBox">
                  {index+1} | {("0" + (Math.floor(timeObj.time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 10) % 100)).slice(-2)} | {timeObj.username}
                </div>
          {console.log(timeObj.time)} */}
         {this.state.lastTime === timeObj.time && !this.props.inProfile ?  (
                <div key={"lasttime"+index} className="SPGO-timeBox SPGO-lastTimeBox" >
                  <div className="SPGO-lastTime">Last Time</div>
                  {index+1} | {("0" + (Math.floor(timeObj.time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 10) % 100)).slice(-2)} 
                  <div className="SPGO-usernameBox">{timeObj.username}</div>
                </div>
              ) : (
                <div key={"notlasttime"+index} className="SPGO-timeBox" >
                  {index+1} | {("0" + (Math.floor(timeObj.time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 10) % 100)).slice(-2)}
                  {timeObj.userId===this.props.user._id ? (<div className="SPGO-usernameBox">{timeObj.username}</div>):(<div className="SPGO-usernameBoxElse">{timeObj.username}</div>)} 
                </div>
              )} 
          </>
        ));
        
      }
      else {
        // console.log(this.state.lastTime)
        // console.log(sortedTimes[10])
        // console.log(sortedTimes.indexOf(this.state.lastTime));
        // console.log(sortedTimes.filter((x)=>{return x.time === this.state.lastTime}))
        ranklist = sortedTimes.map((timeObj, index) => (
          <>
         {index < 8 ?  (
                <div key={"notlasttime"+index} className="SPGO-timeBox" >
                    {index+1} | {("0" + (Math.floor(timeObj.time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 10) % 100)).slice(-2)}
                    {this.state.times.userId===this.props.user._id ? (<div className="SPGO-usernameBox">{timeObj.username}</div>):(<div className="SPGO-usernameBoxElse">{timeObj.username}</div>)} 
                </div>
              ) : ( <> {this.state.lastTime===timeObj.time && !this.props.inProfile ? (
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

        // ranklist = sortedTimes.slice(0,8).map((timeObj, index) => (
        //   <div key={"notlasttime"+index} className="SPGO-timeBox" >
        //       {index+1} | {("0" + (Math.floor(timeObj.time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(timeObj.time / 10) % 100)).slice(-2)}
        //       {this.state.times.userId===this.props.user._id ? (<div className="SPGO-usernameBox">{timeObj.username}</div>):(<div className="SPGO-usernameBoxElse">{timeObj.username}</div>)} 
        //   </div>
        // ))

        // lastTimeObjArr = sortedTimes.filter((x)=>{return x.time === this.state.lastTime})
        // let lastTimeObj = lastTimeObjArr[0]
        // let lastTimeRank = sortedTimes.indexOf(lastTimeObj)
        
              
        
      }}
    else {
      ranklist = "No games played."
    }

    return (
      <div className="u-flexColumn u-flex-alignCenter">
        <h2 className="textCenter">{this.state.date? (`Puzzle of the Day Leaderboard ${this.state.date.slice(5,7)}/${this.state.date.slice(8,10)}/${this.state.date.slice(2,4)}`):("")} </h2>
        <div className="SPGO-shortHorizontalLine"> </div>
      <div className="SPGO-timesContainer">
          {ranklist}
          {/* {lastTimeObjArr?(<div className="SPGO-timeBox SPGO-lastTimeBox" >
                  <div className="SPGO-lastTime">Last Time</div>
                  {lastTimeRank+1} | {("0" + (Math.floor(sortedTimes[lastTimeRank].time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor( sortedTimes[lastTimeRank].time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor( sortedTimes[lastTimeRank].time / 10) % 100)).slice(-2)} 
                  <div className="SPGO-usernameBox">{ sortedTimes[lastTimeRank].username}</div>
              </div>):("")} */}
      </div>
      </div>
    );
  }
}

export default RankListPOTD;
