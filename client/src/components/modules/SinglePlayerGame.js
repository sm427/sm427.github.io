import React, { Component } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities.js";
// import { Redirect } from "react-router-dom";

import "../../utilities.css"
import "../pages/SinglePlayer.css";

class SinglePlayerGame extends Component {
    constructor (props) {
        super(props);
        this.state = {
            images: [],
            zoomin: 0,
        }
    }

    componentDidMount() {
        get("/api/getImages").then(images => {
            this.setState({ images: images });
    });
    }

zoomin = () => {
    let img_ele = document.getElementById("drag-img");
    let box = document.getElementById("drag-box");
    let face = document.getElementById("drag-face");
    let halfwwidth = window.innerWidth * 0.35
    let halfwheight = (window.innerHeight - 59) / 2
    if (img_ele) {
    let pre_width = img_ele.getBoundingClientRect().width
    let pre_height = img_ele.getBoundingClientRect().height;

    let marginLeftStart = img_ele.getBoundingClientRect().left;
    let marginTopStart = img_ele.getBoundingClientRect().top-59;

    let leftBoxStart = box.getBoundingClientRect().left;
    let leftFaceStart = face.getBoundingClientRect().left;
    let topBoxStart = box.getBoundingClientRect().top -59;
    let topFaceStart = face.getBoundingClientRect().top -59;
    let widthBoxStart = box.getBoundingClientRect().width;
    let widthFaceStart = face.getBoundingClientRect().width;
    let heightBoxStart = box.getBoundingClientRect().height;
    let heightFaceStart = face.getBoundingClientRect().height;

    img_ele.style.width = (pre_width * 1.2) + 'px';
    img_ele.style.height = (pre_height * 1.2) + 'px';

    img_ele.style.marginLeft = (-((-marginLeftStart + halfwwidth) * 1.2 - halfwwidth)) + 'px';
    img_ele.style.marginTop = (-((-marginTopStart + halfwheight)* 1.2 - halfwheight)) + 'px';

    box.style.left = ((leftBoxStart - halfwwidth) * 1.2 + halfwwidth) + "px";
    face.style.left = ((leftFaceStart - halfwwidth) * 1.2 + halfwwidth) +"px";

    box.style.top = ((topBoxStart - halfwheight) * 1.2 + halfwheight + 59) +"px";
    face.style.top = ((topFaceStart - halfwheight) * 1.2 + halfwheight + 59) +"px";

    box.style.width = (widthBoxStart * 1.2) + 'px';
    box.style.height = (heightBoxStart * 1.2) + 'px';

    face.style.width = (widthFaceStart * 1.2) + 'px';
    face.style.height = (heightFaceStart * 1.2) + 'px';

    this.setState({zoomin: this.state.zoomin+1});

  }
  img_ele = 0;
}

zoomout = () => {
    let img_ele = document.getElementById("drag-img");
    let box = document.getElementById("drag-box");
    let face = document.getElementById("drag-face");
    let halfwwidth = window.innerWidth * 0.35
    let halfwheight = (window.innerHeight - 59) / 2
    if (img_ele) {
        if (this.state.zoomin > 0) {
            let pre_width = img_ele.getBoundingClientRect().width
            let pre_height = img_ele.getBoundingClientRect().height;

            let marginLeftStart = img_ele.getBoundingClientRect().left;
            let marginTopStart = img_ele.getBoundingClientRect().top-59;

            let leftBoxStart = box.getBoundingClientRect().left;
            let leftFaceStart = face.getBoundingClientRect().left;
            let topBoxStart = box.getBoundingClientRect().top -59;
            let topFaceStart = face.getBoundingClientRect().top -59;
            let widthBoxStart = box.getBoundingClientRect().width;
            let widthFaceStart = face.getBoundingClientRect().width;
            let heightBoxStart = box.getBoundingClientRect().height;
            let heightFaceStart = face.getBoundingClientRect().height;

            img_ele.style.width = (pre_width / 1.2) + 'px';
            img_ele.style.height = (pre_height / 1.2) + 'px';

            img_ele.style.marginLeft = (-((-marginLeftStart + halfwwidth) / 1.2 - halfwwidth)) + 'px';
            img_ele.style.marginTop = (-((-marginTopStart + halfwheight)/ 1.2 - halfwheight)) + 'px';

            box.style.left = ((leftBoxStart - halfwwidth) / 1.2 + halfwwidth) + "px";
            face.style.left = ((leftFaceStart - halfwwidth) / 1.2 + halfwwidth) +"px";

            box.style.top = ((topBoxStart - halfwheight) / 1.2 + halfwheight + 59) +"px";
            face.style.top = ((topFaceStart - halfwheight) / 1.2 + halfwheight + 59) +"px";

            box.style.width = (widthBoxStart / 1.2) + 'px';
            box.style.height = (heightBoxStart / 1.2) + 'px';

            face.style.width = (widthFaceStart / 1.2) + 'px';
            face.style.height = (heightFaceStart / 1.2) + 'px';

            this.setState({zoomin: this.state.zoomin-1});
        }
    }
    img_ele = 0;
  }

moveright = () => {
    let img_ele = document.getElementById("drag-img");
    let box = document.getElementById("drag-box");
    let face = document.getElementById("drag-face");
    let marginLeftStart = img_ele.getBoundingClientRect().left;
    let leftBoxStart = box.getBoundingClientRect().left;
    let leftFaceStart = face.getBoundingClientRect().left;
    let spaceright = img_ele.getBoundingClientRect().right - window.innerWidth * 0.7;
    if(spaceright >= 50 ){
        img_ele.style.marginLeft = (marginLeftStart - 50) + 'px';
        box.style.left = (leftBoxStart - 50) + "px";
        face.style.left = (leftFaceStart - 50) +"px";
    }
    else if (img_ele.getBoundingClientRect().right - window.innerWidth * 0.7 <= 0) {}
    else {
        img_ele.style.marginLeft = (marginLeftStart - spaceright) + 'px';
        box.style.left = (leftBoxStart - spaceright) + "px";
        face.style.left = (leftFaceStart - spaceright) +"px";
    }
}

moveleft = () => {
    let img_ele = document.getElementById("drag-img");
    let box = document.getElementById("drag-box");
    let face = document.getElementById("drag-face");
    let marginLeftStart = img_ele.getBoundingClientRect().left;
    let leftBoxStart = box.getBoundingClientRect().left;
    let leftFaceStart = face.getBoundingClientRect().left;
    let spaceleft = img_ele.getBoundingClientRect().left
    if(spaceleft <= -50 ){
        img_ele.style.marginLeft = (marginLeftStart + 50) + 'px';
        box.style.left = (leftBoxStart + 50) + "px";
        face.style.left = (leftFaceStart + 50) +"px";
    }
    else if (spaceleft >= 0) {}
    else {
        img_ele.style.marginLeft = (marginLeftStart - spaceleft) + 'px';
        box.style.left = (leftBoxStart - spaceleft) + "px";
        face.style.left = (leftFaceStart - spaceleft) +"px";
    }
}

moveup = () => {
    let img_ele = document.getElementById("drag-img");
    let box = document.getElementById("drag-box");
    let face = document.getElementById("drag-face");
    let marginTopStart = img_ele.getBoundingClientRect().top-59;
    let topBoxStart = box.getBoundingClientRect().top;
    let topFaceStart = face.getBoundingClientRect().top;
    let spacetop = img_ele.getBoundingClientRect().top - 59;
    if(spacetop <= -50 ){
        img_ele.style.marginTop = (marginTopStart + 50) + 'px';
        box.style.top = (topBoxStart + 50) + "px";
        face.style.top = (topFaceStart + 50) +"px";
    }
    else if (spacetop >= 0) {}
    else {
        img_ele.style.marginTop = (marginTopStart - spacetop) + 'px';
        box.style.top = (topBoxStart - spacetop) + "px";
        face.style.top = (topFaceStart - spacetop) +"px";
    }
}

movedown = () => {
    let img_ele = document.getElementById("drag-img");
    let box = document.getElementById("drag-box");
    let face = document.getElementById("drag-face");
    let marginTopStart = img_ele.getBoundingClientRect().top-59;
    let topBoxStart = box.getBoundingClientRect().top;
    let topFaceStart = face.getBoundingClientRect().top;
    let spacebottom = img_ele.getBoundingClientRect().bottom - 59 - window.innerHeight;
    if(spacebottom >= 50 ){
        img_ele.style.marginTop = (marginTopStart - 50) + 'px';
        box.style.top = (topBoxStart - 50) + "px";
        face.style.top = (topFaceStart - 50) +"px";
    }
    else if (spacebottom <= 0) {}
    else {
        img_ele.style.marginTop = (marginTopStart - spacebottom) + 'px';
        box.style.top = (topBoxStart - spacebottom) + "px";
        face.style.top = (topFaceStart - spacebottom) +"px";
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

    gameOver = () => {
        this.props.endGame("abc")
    }

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
                <>
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
        
                <div>
                    <div className="SinglePlayer-CheatPreventer"></div>
                </div>

                <div className="SinglePlayer-ButtonPanelZoom u-flex u-flex-alignCenter u-flex-justifyCenter">
                    {/* <div className="u-textCenter"> zooming only in final version </div> */}
                    <button className="SinglePlayer-button" onClick={this.zoomout}>-</button>
                    <button className="SinglePlayer-button" onClick={this.zoomin}>+</button>
                </div>
        
                <div className="SinglePlayer-ProgressContainer">{this.props.playedImages}/{this.props.imageCount}</div>

                <div  className="SinglePlayer-ImageContainer" id="container">
                        <div className="SinglePlayer-face" id="drag-face"><img src={this.state.images[0]} className="sp-face" /></div>
                        <img  ref = "theImage" id="drag-img" className="SinglePlayer-Image" src={this.props.sceneNumber} alt="scene"/>
                        {/* <Link to="/singleplayergameover">*/} <div className="SinglePlayer-box" id="drag-box" onClick={this.gameOver}></div> {/*</Link> */}
                        {/* HERE I'll add another layer that enhances how good the user's face blends into the crowd */}
        
                </div>
                </>
            )
        
    
    }
}

export default SinglePlayerGame;