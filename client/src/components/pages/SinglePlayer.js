import React, { Component } from "react";
import { get, post } from "../../utilities";
import SinglePlayerGame from "../modules/SinglePlayerGame.js"
import SinglePlayerGameSidebar from "../modules/SinglePlayerGameSidebar.js"
import Waldo from "../modules/Waldo.js"

import "../../utilities.css";
import "./Singleplayer.css";


class Singleplayer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            time : 0,
            picture : 1
        }
    }

    pictureProgress = () => {
        this.setState({
          picture: this.state.picture + 1,
        });
      };

    render() {
        return(
            <div
            className="Waldo"
            onClick={() => {
              this.pictureProgress();
            }}
          >
              Hello
        </div>
        )
    }
 }

 export default Singleplayer;