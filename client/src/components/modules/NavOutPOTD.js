import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../utilities.css";
import "../pages/Home.css";
import "../App.css";

class NavOutPOTD extends Component {
  constructor(props) {
    super(props);
    };
  

  render() {

    let homeButton;

    homeButton = (<Link to="/"><button
      type="submit"
      className="u-pointer App-submit Home-singlePlayerButton"
      value="Change"
      >
       Home
     </button></Link>);

    return (
      <>
      <div className="SPGO-NavOutPlaceholder"> </div>
    <div className="u-flexColumn u-flex-alignCenter SPGO-NavOutContainer">
      <div>
        <h4>What do you want to do next?</h4>
      </div>
      <div>
        {homeButton} 
      </div>
      {/* <p className="u-Quantico">Note: Play again doesn't really make sense in the MVP because there is only one playable image. This will be changed in the final product.</p> */}
    </div>
    </>
    );

  }
}

export default NavOutPOTD;
