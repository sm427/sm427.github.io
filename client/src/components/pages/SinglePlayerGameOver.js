import React, { Component } from "react";
import { Link } from "@reach/router";
import Scene from "../images/templatetest3red.png"

import "../../utilities.css"
import "../pages/SinglePlayer.css";
import "../pages/Home.css";
import "../App.css";

import RankList from "../modules/RankList.js"
import NavOut from "../modules/NavOut.js"

class SinglePlayerGameOver extends Component {
    constructor (props) {
        super(props);
    }




    render() {

        return(
            <div >
                {/* <p>{JSON.stringify(this.props.user)}</p> */}
                <RankList user={this.props.user}/>
                <NavOut/>
            </div>
          )

    }
}

export default SinglePlayerGameOver;