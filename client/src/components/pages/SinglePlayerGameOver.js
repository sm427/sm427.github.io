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
            imageCount: 3,
        }
    }

 
    componentDidMount() {
        get("/api/whoami").then((currentuser) => {
            get(`/api/user`, { userid: currentuser._id}).then((userObj) => {
              this.setState({ user: userObj});
              console.log(`Times for ${userObj.username}`)
            });
      
          });
        this.setState({imageCount: this.props.imageCount})
        if(this.props.imageCount==1) {document.getElementById("selector1").style.backgroundColor = "var(--primary)"}
        else if(this.props.imageCount==3) {document.getElementById("selector3").style.backgroundColor = "var(--primary)"}
        else {document.getElementById("selector5").style.backgroundColor = "var(--primary)"}
      }


      set1 = (event) => {
        this.setState({imageCount: 1});
        event.target.style.backgroundColor = "var(--primary)";
        document.getElementById("selector3").style.backgroundColor = "var(--darkgrey)" 
        document.getElementById("selector5").style.backgroundColor = "var(--darkgrey)" 
      };
    
      set3 = (event) => {
          this.setState({imageCount: 3});
          event.target.style.backgroundColor = "var(--primary)";
          document.getElementById("selector1").style.backgroundColor = "var(--darkgrey)"
          document.getElementById("selector5").style.backgroundColor = "var(--darkgrey)" 
      };
    
      set5 = (event) => {
        this.setState({imageCount: 5})
        event.target.style.backgroundColor = "var(--primary)";
        document.getElementById("selector1").style.backgroundColor = "var(--darkgrey)" 
        document.getElementById("selector3").style.backgroundColor = "var(--darkgrey)" 
    }

    render() {
        // this.state.user ? console.log(`Timesssss for ${this.state.user.username}`) : console.log("not found") ;
        return( 
            <div className="SPGO-container">
                {/* <p>{JSON.stringify(this.props.user)}</p> */}
                <div className="SPGO-ranklistContainer">
               {this.state.user ? ( <RankList user={this.state.user} imageCount={this.state.imageCount}/>) : ("Loading your best times")}
                </div>

                <div className="u-flex u-flex-justifyCenter"><div className="SPGO-imageCountSelector" onClick={this.set1} id="selector1">1</div><div className="SPGO-imageCountSelector" onClick={this.set3} id="selector3">3</div><div className="SPGO-imageCountSelector" onClick={this.set5} id="selector5">5</div></div>

                <div className="SPGO-ranklistContainer">
               {this.state.user ? ( <RankListGlobal user={this.state.user} imageCount={this.props.imageCount}/>) : ("Loading the global best times")}
                </div>
                
                <NavOut/>
            </div>
          )

    }
}

export default SinglePlayerGameOver;