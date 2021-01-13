import React, { Component } from "react";
//import { get } from "../../utilities";
import "../../utilities.css";


class HowTo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "How To Play";
    //get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
    }

  render() {
    return (
      <div>
        How to play
      </div>
    );
  }
}

export default HowTo;
