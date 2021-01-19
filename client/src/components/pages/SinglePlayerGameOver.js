import React, { Component } from "react";
import { Link } from "@reach/router";
import Scene from "../images/templatetest3red.png"

import "../../utilities.css"
import "../App.css";
import "./SinglePlayerGameOver.css"

import RankList from "../modules/RankList.js"
import NavOut from "../modules/NavOut.js"

class SinglePlayerGameOver extends Component {
    constructor (props) {
        super(props);
    }




    render() {

        return(
            <div className="SPGO-container">
                {/* <p>{JSON.stringify(this.props.user)}</p> */}
                <div className="SPGO-ranklistContainer">
                <RankList user={this.props.user}/>
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