import React, { Component } from "react";
// import { Link } from "@reach/router";
// import "../../utilities.css";
// import "../pages/Home.css";
// import "../App.css";

class PictureCount extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
  }

  handleSubmit = (event) => {
    //link to new page
  }

  render() {
    return (
    <div>
        <input type = "range" min="1" max="5" value={this.props.slidervalue} onChange={this.props.handleChange}/>
      </div>
    );
  }
}

export default PictureCount;
