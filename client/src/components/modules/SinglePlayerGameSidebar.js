import React, { Component } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities.js";
import "../../utilities.css";
import "../App.css";
import "../pages/SinglePlayer.css"
import Stopwatch from "./GameStopwatch.js"

class SinglePlayerGameSidebar extends Component {
    constructor (props) {
        super(props);
        this.state = {
          images: [],
        }
    }

    componentDidMount() {
      get("/api/getImages").then(images => {
        this.setState({ images: images });
      });
    
      }
    

    loadImages = () => {
        get("/api/getImages").then(images => {
          this.setState({ images: images });
        });
    }

    // use props here to update time and picture progress
    render() {
      let username;
      (this.props.user) ? (username = this.props.user.username) : (username="Username is loading...");
      console.log(this.props.user);
      console.log(username);
      return (
        <div className="u-flexColumn u-flex-alignCenter u-textCenter">
          <h2>Tag yourself!</h2>
          <p>Game on, {username}! Use the bottons to move the image to the left or to the right. Find and click on yourself!</p>
          <div className="SinglePlayer-Timers">
            <Stopwatch />
          </div>
          <div className="SinglePlayer-SideBarPictureContainer">
          {
            this.state.images.map((image, index) => (
            <img src={image} key={index} className="SinglePlayer-SideBarPicture"/>
            ))
         }
          </div>
        </div>
      )
      }


}

export default SinglePlayerGameSidebar;