import React, { Component } from "react";
//import { get, post } from "../../utilities";
import SinglePlayerGame from "../modules/SinglePlayerGame.js"
import SinglePlayerGameSidebar from "../modules/SinglePlayerGameSidebar.js"
//import Waldo from "../modules/Waldo.js"

import "./SinglePlayer.css";


class SinglePlayer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            time : 0,
            pictureCounter : 1
        }
    }
    
    // pictureProgress = () => {
    //     this.setState({
    //       pictureCounter: this.state.pictureCounter +1
    //     });
    //   };

    render() {
      return(
        <div className="SinglePlayer-container">
          <div className="SinglePlayer-SearchImageContainer">
            <SinglePlayerGame  pictureCounter={this.state.pictureCounter} user={this.props.user}/>
          </div>
          <div className="SinglePlayer-SideBarContainer">
            <SinglePlayerGameSidebar pictureCounter={this.state.pictureCounter} user={this.props.user}/>
          </div> 
            {/* <div className="Waldo" onClick={() => {this.pictureProgress();}}>
               {this.state.pictureCounter}
            </div> */}
        </div>
      )
    }
 }

 export default SinglePlayer;