import React, { Component } from "react";
import { get } from "../../utilities.js";

import "../../utilities.css";
import "../App.css";
import "./SinglePlayerGameOver.css";

import RankList from "../modules/RankList.js";
import RankListGlobal from "../modules/RankListGlobal.js";
import NavOut from "../modules/NavOut.js";

class SinglePlayerGameOver extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user: undefined,
        }
    }

 
    componentDidMount() {
        get("/api/whoami").then((currentuser) => {
            get(`/api/user`, { userid: currentuser._id}).then((userObj) => {
              this.setState({ user: userObj});
              console.log(`Times for ${userObj.username}`)
            });
      
          });
      }


    render() {
        // this.state.user ? console.log(`Timesssss for ${this.state.user.username}`) : console.log("not found") ;
        return( 
            <div className="SPGO-container">
                {/* <p>{JSON.stringify(this.props.user)}</p> */}
                <div className="SPGO-ranklistContainer">
               {this.state.user ? ( <RankList user={this.state.user} imageCount={this.props.imageCount}/>) : ("Loading your best times")}
                </div>

                <div className="SPGO-ranklistContainer">
               {this.state.user ? ( <RankListGlobal user={this.state.user} imageCount={this.props.imageCount}/>) : ("Loading the global best times")}
                </div>
                
                <NavOut/>
            </div>
          )

    }
}

export default SinglePlayerGameOver;