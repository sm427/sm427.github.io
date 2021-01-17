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
            img_ele: null,
            x_cursor: 0,
            y_cursor: 0,
            x_img_ele: 0,
            y_img_ele: 0,
        }
    }

// code to zoom and drag from stackoverflow.com, user "Bug"
zoomin = (event) => {
  let img_ele = document.getElementById("drag-img");
  if (img_ele) {
  let pre_width = img_ele.getBoundingClientRect().width
  let pre_height = img_ele.getBoundingClientRect().height;
  img_ele.style.width = (pre_width * 1.2) + 'px';
  img_ele.style.height = (pre_height * 1.2) + 'px';
  this.setState({zoomin: this.state.zoomin+1});
  
  }
  img_ele = null;
}

zoomout = (event) => {
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
    img_ele = null;
  }


start_drag = () => {
  this.setState({img_ele: true})
  this.setState({x_img_ele: window.event.clientX - document.getElementById('drag-img').offsetLeft})
  this.setState({y_img_ele: window.event.clientY - document.getElementById('drag-img').offsetTop})

}

stop_drag = () => {
  this.setState({img_ele: null})
}

while_drag = () => {
  this.setState({ x_cursor: window.event.clientX })
  this.setState({ y_cursor: window.event.clientY})
//   if (this.state.img_ele !== null) {
//     img_ele.style.left = (x_cursor - x_img_ele) + 'px';
//     img_ele.style.top = ( window.event.clientY - y_img_ele) + 'px';

//       console.log(img_ele.style.left+' - '+img_ele.style.top);

//   }
}



    render() {
        // document.getElementById('zoomout').addEventListener('click', function() {
        //     zoom(0.5);
        //   });
        //   document.getElementById('zoomin').addEventListener('click', function() {
        //     zoom(1.5);
        //   });

//getElementById('drag-img').addEventListener('mousedown', this.start_drag);
//getElementById('container').addEventListener('mousemove', this.while_drag);
//getElementById('container').addEventListener('mouseup', this.stop_drag);

        return(
            <div  className="SinglePlayer-ImageContainer"> 
            <button id="zoomout" value="Zoom out" onClick={this.zoomout}>Zoom out</button>
            <button id="zoomin" value="Zoom in" onClick={this.zoomin}>Zoom in</button>
            <img  ref = "theImage" id="drag-img" className="SinglePlayer-Image" src={Scene} alt="scene">
            </img> 
            </div>
        )
    }
}

export default SinglePlayerGame;