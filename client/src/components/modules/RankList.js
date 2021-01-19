import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../utilities.css";
import "../pages/Home.css";
import "../App.css";
import { get, post } from "../../utilities.js";


class RankList extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
        times : []
    }
  }

  componentDidMount() {
    // this.setState({times: this.props.user.playedTimes[0]});
    }

    componentDidUpdate() {
      if(this.props.user.playedTimes.sort((a,b) => a - b) !== this.state.times) {
      this.setState({times: this.props.user.playedTimes.sort((a,b) => a - b)});
      }
    }

    render() {
    // let variable;

  

    return (
      <div>
          {this.state.times.map((time, index) => (
            <div key={index}>{("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 10) % 100)).slice(-2)}</div>
          ))}
      </div>
    );
  }
}

export default RankList;
