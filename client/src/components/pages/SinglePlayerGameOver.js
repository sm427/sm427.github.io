import React, { Component } from "react";
import { get } from "../../utilities.js";

import "../../utilities.css"
import "../App.css";
import "./SinglePlayerGameOver.css"

import RankList from "../modules/RankList.js"
import NavOut from "../modules/NavOut.js"

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
               {this.state.user ? ( <RankList user={this.state.user}/>) : ("Loading your best times")}
                </div>
                <p className="u-textCenter u-Quantico">
                Note: The final product will show you which time was the one that you just played.
              
                </p>
                <NavOut/>
            </div>
          )

    }
}

export default SinglePlayerGameOver;