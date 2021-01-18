import React, { Component } from "react";
import { Link } from "@reach/router";
import Scene from "../images/templatetest3red.png"

import "../../utilities.css"
import "../pages/SinglePlayer.css";

class SinglePlayerGame extends Component {
    constructor (props) {
        super(props);
        this.state = {
            zoomin: 0,
        }
    }

// code to zoom partly from stackoverflow.com, user "Bug"
zoomin = (event) => {
  let img_ele = document.getElementById("drag-img");
  if (img_ele) {
  let pre_width = img_ele.getBoundingClientRect().width
  let pre_height = img_ele.getBoundingClientRect().height;
  img_ele.style.width = (pre_width * 1.2) + 'px';
  img_ele.style.height = (pre_height * 1.2) + 'px';
  this.setState({zoomin: this.state.zoomin+1});
  
  }
  img_ele = 0;
}

zoomout = () => {
    let img_ele = document.getElementById("drag-img");
    if (img_ele) {
        if (this.state.zoomin > 0) {
            let pre_width = img_ele.getBoundingClientRect().width
            let pre_height = img_ele.getBoundingClientRect().height;
            img_ele.style.width = (pre_width / 1.2) + 'px';
            img_ele.style.height = (pre_height / 1.2) + 'px';
            this.setState({zoomin: this.state.zoomin-1});
        }
    }
    img_ele = 0;
  }

moveright = () => {
    let img_ele = document.getElementById("drag-img");
    let marginLeftStart = img_ele.getBoundingClientRect().left; 
    let spaceright = img_ele.getBoundingClientRect().right - window.innerWidth * 0.7;
    if(spaceright > 50 ){         
        img_ele.style.marginLeft = (marginLeftStart - 50) + 'px';
    }
    else if (img_ele.getBoundingClientRect().right - window.innerWidth * 0.7 <= 0) {}
    else {
        img_ele.style.marginLeft = (marginLeftStart - spaceright) + 'px';
    }
}

moveleft = () => {
    let img_ele = document.getElementById("drag-img");
    let marginLeftStart = img_ele.getBoundingClientRect().left; 
    let spaceleft = img_ele.getBoundingClientRect().left
    if(spaceleft < -50 ){         
        img_ele.style.marginLeft = (marginLeftStart + 50) + 'px';
    }
    else if (spaceleft >= 0) {}
    else {
        img_ele.style.marginLeft = (marginLeftStart - spaceleft) + 'px';
    }
}

moveup = () => {
    let img_ele = document.getElementById("drag-img");
    let marginTopStart = img_ele.getBoundingClientRect().top-59; 
    let spacetop = img_ele.getBoundingClientRect().top - 59;
    if(spacetop < -50 ){         
        img_ele.style.marginTop = (marginTopStart + 50) + 'px';
    }
    else if (spacetop >= 0) {}
    else {
        img_ele.style.marginTop = (marginTopStart - spacetop) + 'px';
    }
}

movedown = () => {
    let img_ele = document.getElementById("drag-img");
    let marginTopStart = img_ele.getBoundingClientRect().top-59; 
    let spacebottom = img_ele.getBoundingClientRect().bottom - 59 - window.innerHeight;
    if(spacebottom > 50 ){         
        img_ele.style.marginTop = (marginTopStart - 50) + 'px';
    }
    else if (spacebottom <= 0) {}
    else {
        img_ele.style.marginTop = (marginTopStart - spacebottom) + 'px';
    }
}


// start_drag = () => {
//     console.log("go");
//     let img_ele = document.getElementById("drag-img");
//     //console.log("start drag");
//     this.setState({dragOn: true});       
//     this.setState({x_start: window.event.clientX});
//     this.setState({y_start: window.event.clientY})   ;
//     this.setState({marginLeftStart: img_ele.getBoundingClientRect().left})  ;  
//     this.setState({marginTopStart: img_ele.getBoundingClientRect().top})  ; 
// }

// stop_drag = () => {
//     //console.log("stop drag");
    
//     this.setState({dragOn: false});
// }

// while_drag = () => {
//     let img_ele = document.getElementById("drag-img");
//     let x_cursor= window.event.clientX;
//     let y_cursor= window.event.clientY;
//     if (this.state.dragOn) {
//         //console.log("while drag");
//         img_ele.style.marginLeft = (x_cursor - this.state.x_start + this.state.marginLeftStart) + 'px';
//         img_ele.style.marginTop = (y_cursor - this.state.y_start + this.state.marginTopStart - 80) + 'px';
//     }
// }



    render() {
        let img = document.getElementById("drag-img");
        let container = document.getElementById("container");
        if (img) {addEventListener('mousedown', this.start_drag);}
        if (container) {
            addEventListener('mousemove', this.while_drag);
            addEventListener('mouseup', this.stop_drag);
        }       
//document.getElementById("container").addEventListener('mousemove', this.while_drag);
//document.getElementById("container").addEventListener('mouseup', this.stop_drag);

    return(
        <div  className="SinglePlayer-ImageContainer" id="container"> 
            <div className="SinglePlayer-ButtonPanelMove u-flexColumn u-flex-alignCenter u-flex-justifyCenter">
                
                <div>
                    <button className="SinglePlayer-button" onClick={this.moveup}>Up</button>
                </div>
                
                <div>
                    <button className="SinglePlayer-button" onClick={this.moveleft}>Left</button>
                    <button className="SinglePlayer-button" onClick={this.moveright}>Right</button>
                </div>

                <div>
                    <button className="SinglePlayer-button" onClick={this.movedown}>Down</button>
                </div>
                
            </div>

            <div className="SinglePlayer-ButtonPanelZoom u-flex u-flex-alignCenter u-flex-justifyCenter">
                    <button className="SinglePlayer-button" onClick={this.zoomout}>-</button>
                    <button className="SinglePlayer-button" onClick={this.zoomin}>+</button>
            </div>

            <img  ref = "theImage" id="drag-img" className="SinglePlayer-Image" src={Scene} alt="scene">
            </img> 
            
        </div>
    )
    }
}

export default SinglePlayerGame;