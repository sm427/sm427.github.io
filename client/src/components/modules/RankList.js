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
    // this.setState({times: this.props.user.playedTimes[0]});
      get("/api/whoami").then((user) => {
        if (user._id) {
          this.setState({ user: user});
        }
      })
      ;
      // const query = {userId: this}
      // get("/api/getTimes", query).then((user) => {
      //   console.log("user")
      // })
    }

    componentDidUpdate() {
      if(this.props.user.playedTimes.sort((a,b) => a - b) !== this.state.times) {
      this.setState({times: this.props.user.playedTimes.sort((a,b) => a - b)});
      }

    }

    render() {
    // let variable;
    if (this.props.user !== undefined) {
      let usertimes = this.props.user.playedTimes;
      console.log(usertimes);
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
          {this.state.times.slice(0,10).map((time, index) => (
            <div key={index} className="SPGO-timeBox" >{("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 10) % 100)).slice(-2)}</div>
          ))}
      </div>
      </div>
      // </div>
    );
  }
}

export default RankList;
