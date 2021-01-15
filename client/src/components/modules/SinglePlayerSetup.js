import React, { Component } from "react";
import "../../utilities.css";
import "../pages/Home.css";
import "../App.css";

class SinglePlayerSetup extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      value: ""
    };
  }


  handleChange = (event) => {
    this.setState({
        value: event.target.value,
    })
}

  handleSubmit = (event) => {
    //link to new page
  }

  render() {
    return (
      <>
        <h4 className="Home-Box-Header">Singleplayer</h4>
        <p className="u-textCenter">Description</p>
         
        
      </>
    );
  }
}

export default SinglePlayerSetup;
