import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../utilities.css";
import "../pages/Home.css";
import "../App.css";


class RankList extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
        times : []
    }
  }

  componentDidMount() {
    get("/api/getTimes").then(times => {
      this.setState({ times: times });
    });
    }

    render() {

    // let variable;

  

    return (
      <div>
          {this.state.times}
      </div>
    );
  }
}

export default RankList;
