import React, { Component } from "react";
import { Link } from "@reach/router";
import { get, post } from "../../utilities.js";
// import { Redirect } from "react-router-dom";

import "../../utilities.css"
import "../pages/SinglePlayer.css";

class SinglePlayerGame extends Component {
    constructor (props) {
        super(props);
        this.state = {
            images: [],
            zoomin: 0,
            facePositions: [
                [1266, 311, 16, 25, 1366.17], //0, t1
                [938,334,16,24,1366.17], //1, t3
                [490,472,18,29,1366.17],
                [221,604,15,23,1368], 
                [562,594,12,16,1615.38], 
                [1570,734,16,20,1615.38], //5, t7
                [1190,794,34,46,1615.38],
                [1316,805,22,27,1368],
                [438,932,24,35,1368], //8, t10
                [368, 138, 28, 37, 1368],
                [1172, 134, 25, 33, 1368],
                [751, 158, 27, 42, 1368],
                [551, 721, 35, 53, 1368],
                [1105, 142, 19, 29, 1369], //13, t15
                [282, 732, 23, 32, 1369],
                [63, 521, 20, 29, 1369],
                [1007, 156, 30, 46, 1368],
                [463, 527, 23, 33, 1368],
                [1126, 123, 21, 26, 1368],
                [237, 535, 23, 30, 1368], //19, t21

            ],
            loading: 2,
        }
    }

    async componentDidMount() {
        get("/api/getImages").then(images => {
            this.setState({ images: images });
        });

        let templateNr = await this.props.randomInt;
        let facepos = await this.state.facePositions;

        if (this.state.facePositions[templateNr]) {

            //let templateNr = this.props.randomInt;
            console.log("Waldo placed for image nr" +templateNr)

            let img_ele = document.getElementById("drag-img");
            let box = document.getElementById("drag-box");
            let face = document.getElementById("drag-face");

            img_ele.style.marginTop = 0 + 'px';
            img_ele.style.marginLeft = 0 + 'px';
            img_ele.style.width = this.state.facePositions[templateNr][4] + 'px';
            img_ele.style.height = 912 + 'px';

            this.setState({zoomin: 0});

            box.style.left = this.state.facePositions[templateNr][0] - 2 + "px";
            face.style.left = this.state.facePositions[templateNr][0] +"px";

            box.style.top = this.state.facePositions[templateNr][1] - 2 +"px";
            face.style.top = this.state.facePositions[templateNr][1] +"px";

            box.style.width = this.state.facePositions[templateNr][2] + 4 + 'px';
            box.style.height = this.state.facePositions[templateNr][3] + 4 + 'px';

            face.style.width = this.state.facePositions[templateNr][2] + 'px';
            face.style.height = this.state.facePositions[templateNr][3] + 'px';

            this.setState({loading: this.state.loading -1 })
        }
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.randomInt !== this.props.randomInt && this.props.randomInt) {
    //         // this.gameOver();
    //         console.log("update")
    //         this.loadTemplate();
    //     }
    // }

    componentDidUpdate(prevProps) {
            if (prevProps.randomInt !== this.props.randomInt) {
                // this.gameOver();
                //console.log("update")
                this.loadTemplate();
            }
        }

zoomin = () => {
    let img_ele = document.getElementById("drag-img");
    let box = document.getElementById("drag-box");
    let face = document.getElementById("drag-face");
    let halfwwidth = window.innerWidth * 0.35
    let halfwheight = (window.innerHeight - 60) / 2
    if (img_ele) {
    let pre_width = img_ele.getBoundingClientRect().width
    let pre_height = img_ele.getBoundingClientRect().height;

    let marginLeftStart = img_ele.getBoundingClientRect().left;
    let marginTopStart = img_ele.getBoundingClientRect().top - 60;

    let leftBoxStart = box.getBoundingClientRect().left;
    let leftFaceStart = face.getBoundingClientRect().left;
    let topBoxStart = box.getBoundingClientRect().top - 60;
    let topFaceStart = face.getBoundingClientRect().top - 60;
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

    box.style.top = ((topBoxStart - halfwheight) * 1.2 + halfwheight + 60) +"px";
    face.style.top = ((topFaceStart - halfwheight) * 1.2 + halfwheight + 60) +"px";

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
    let halfwheight = (window.innerHeight - 60) / 2
    if (img_ele) {
        if (this.state.zoomin > 0) {
            let pre_width = img_ele.getBoundingClientRect().width
            let pre_height = img_ele.getBoundingClientRect().height;

            let marginLeftStart = img_ele.getBoundingClientRect().left;
            let marginTopStart = img_ele.getBoundingClientRect().top - 60;

            let leftBoxStart = box.getBoundingClientRect().left;
            let leftFaceStart = face.getBoundingClientRect().left;
            let topBoxStart = box.getBoundingClientRect().top - 60;
            let topFaceStart = face.getBoundingClientRect().top - 60;
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

            box.style.top = ((topBoxStart - halfwheight) / 1.2 + halfwheight + 60) +"px";
            face.style.top = ((topFaceStart - halfwheight) / 1.2 + halfwheight + 60) +"px";

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
    let marginTopStart = img_ele.getBoundingClientRect().top - 60;
    let topBoxStart = box.getBoundingClientRect().top;
    let topFaceStart = face.getBoundingClientRect().top;
    let spacetop = img_ele.getBoundingClientRect().top - 60;
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
    let marginTopStart = img_ele.getBoundingClientRect().top - 60;
    let topBoxStart = box.getBoundingClientRect().top;
    let topFaceStart = face.getBoundingClientRect().top;
    let spacebottom = img_ele.getBoundingClientRect().bottom - 60 - window.innerHeight;
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
        //console.log("Game over function runs")
        // add one to pictureCounter prop
        if (this.props.pictureCounter +1 >= this.props.imageCount) {
            //console.log("Gameover.")
            this.props.endGame("abc")
        }
        else {
            this.setState({loading: 2})
            //console.log("Picture Progress")
            this.props.pictureProgress()
            //load new template
        }
    }

    loadTemplate = () => {
        // console.log ("yup")
            let templateNr = this.props.randomInt;
            console.log("Waldo placed for image nr" +templateNr)                        

            let img_ele = document.getElementById("drag-img");
            let box = document.getElementById("drag-box");
            let face = document.getElementById("drag-face");

            img_ele.style.marginTop = 0 + 'px';
            img_ele.style.marginLeft = 0 + 'px';
            img_ele.style.width = this.state.facePositions[templateNr][4] + 'px';
            img_ele.style.height = 912 + 'px';

            this.setState({zoomin: 0});

            box.style.left = this.state.facePositions[templateNr][0] - 2 + "px";
            face.style.left = this.state.facePositions[templateNr][0] +"px";

            box.style.top = this.state.facePositions[templateNr][1] - 2 +"px";
            face.style.top = this.state.facePositions[templateNr][1] +"px";

            box.style.width = this.state.facePositions[templateNr][2] + 4 + 'px';
            box.style.height = this.state.facePositions[templateNr][3] + 4 + 'px';

            face.style.width = this.state.facePositions[templateNr][2] + 'px';
            face.style.height = this.state.facePositions[templateNr][3] + 'px';
            this.setState({loading: this.state.loading -1})
    }

    imgLoaded = () => {
        console.log("Image loaded.")
        this.setState( {loading: this.state.loading - 1})
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
        
                <div className="SinglePlayer-ProgressContainer">{this.props.pictureCounter}/{this.props.imageCount}</div>

                <div  className="SinglePlayer-ImageContainer" id="container">
                        <div className="SinglePlayer-face" id="drag-face">
                            {this.state.loading ? (""):(<img src={this.state.images[0]} className="sp-face" />)}
                        </div>
                        <img  ref = "theImage" id="drag-img" className="SinglePlayer-Image" src={this.props.sceneNumber} alt="scene" onLoad={this.imgLoaded}/>
                        {/* <Link to="/singleplayergameover">*/} <div className="SinglePlayer-box" id="drag-box" onClick={this.gameOver}></div> {/*</Link> */}
                        {/* HERE I'll add another layer that enhances how good the user's face blends into the crowd */}
        
                </div>

                {this.state.loading ? (<div><div className="SinglePlayer-loading"></div><div className="SinglePlayer-loadingText">Loading...</div></div>):("")}
                </>
            )
        
    
    }
}

export default SinglePlayerGame;