import React, { Component } from "react";
import "../App.css";
import "../pages/SinglePlayer.css"

class Stopwatch extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

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

  render() {
    // this.startTimer;
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    return (
      <div className="Stopwatch">
        <div className="Stopwatch-header"></div>
        <div className="Stopwatch-display u-Bebas u-fontsize30">
          {hours} : {minutes} : {seconds} : {centiseconds}
        </div>
        {this.startTimer}
        <p1> Stopwatch </p1>

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
    );
  }
}

export default Stopwatch;