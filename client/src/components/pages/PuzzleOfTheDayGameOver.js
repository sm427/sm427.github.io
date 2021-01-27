import React, { Component } from "react";
import { get } from "../../utilities.js";

import "../../utilities.css";
import "../App.css";
import "./SinglePlayerGameOver.css";

import RankListPOTD from "../modules/RankListPOTD.js";
import NavOutPOTD from "../modules/NavOutPOTD.js";

class PuzzleOfTheDayGameOver extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: undefined,
        }
    }

 
    async componentDidMount() {
        get("/api/whoami").then((currentuser) => {
            get(`/api/user`, { userid: currentuser._id}).then((userObj) => {
              this.setState({ user: userObj});
              console.log(`Times for ${userObj.username}`)
            });
          });
      }

    render() {
        let noScroll = require('no-scroll');
        noScroll.off()

        return( 
            <div className="SPGO-container">
                
                <div className="SPGO-ranklistContainer">
               {this.state.user ? ( <RankListPOTD user={this.state.user} imageCount={this.state.imageCount} inProfile={false}/>) : ("Loading your best times")}
                </div>
                
                <NavOutPOTD/>
            </div>
          )

    }
}

export default PuzzleOfTheDayGameOver;