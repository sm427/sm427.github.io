import React, { Component } from "react";
import { get, post } from "../../utilities";
import ChangeUsername from "../modules/ChangeUsername.js";
//import Sampleimage from "https://storage.googleapis.com/xaea12sgodparentsbucket1/testface4.png"
import RankList from "../modules/RankList.js"

import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUser: undefined,
      images: [],
      showChangePicture: false,
      imageCount: 3,
    };
  }

  //this.props.user refers to the currently logged-in user
  //this.props.profileUserId is used to load the user whose profile is being displayed
  //this.state.profileuser is the user whose profile is being replaced
  //the differene between user and profileUser is important to secure that users can only change their own username

  componentDidMount() {
    if (this.props.userId) { //maybe this needs to be changed to profileUser._id
      this.loadImages();
    }
    document.title = `Profile`;
    get(`/api/user`, { userid: this.props.profileUserId}).then((user) => {
      this.setState({ profileUser: user});
    });
    }

    componentDidUpdate(prevProps) {
      if (prevProps.userId !== this.props.userId && this.props.userId) { 
        // just logged in. reload images
        this.loadImages();
      }
    }

    loadImages = () => {
      get("/api/getImages").then(images => {
        this.setState({ images: images });
      });
    }
  
    deleteImages = () => {
      post("/api/deleteImages").then(this.loadImages);
      
    }
  
    uploadImage = (event) => {
      this.changeShowChangePicture();
      const fileInput = event.target;
      console.log(fileInput);
      post("/api/deleteImages").then(this.readImage(fileInput.files[0]).then(image => {
        fileInput.value = null;
        return post("/api/uploadImage", { image: image }).then(this.loadImages);
      }).catch(err => {
        console.log(err);
      }));
    };
  
    readImage = (blob) => {
      return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onloadend = () => {
          if (r.error) {
            reject(r.error.message);
            return;
          } else if (r.result.length < 50) {
            // too short. probably just failed to read, or ridiculously small image
            reject("small image? or truncated response");
            return;
          } else if (!r.result.startsWith("data:image/")) {
            reject("not an image!");
            return;
          } else {
            resolve(r.result);
          }
        };
        r.readAsDataURL(blob);
      });
    };

  updateProfileUser = () => { 
      console.log("run1");
      get(`/api/user`, { userid: this.props.profileUserId}).then((user) => {
        this.setState({ profileUser: user});
      });
    }

  changeShowChangePicture = () => {
    if(this.state.showChangePicture) {this.setState({showChangePicture: false})
    } else {this.setState({showChangePicture: true})}
  }

  handleChange = (event) => {
    this.setState({
        imageCount: parseInt(event.target.value),
    })
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
    let profilePictureSection;
    if (!this.state.profileUser) {
      return <div> Loading! </div>;
    }
    else { 
      document.title = `Profile of ${this.state.profileUser.username}`;
      let userNameChanger = "";
      if (this.props.userId===this.props.profileUserId) {     //checks if the user is viewing his own profile
        
        userNameChanger = (
          <div className="Profile-Object">
          <ChangeUsername profileUser={this.state.profileUser} updateUser={this.updateProfileUser}/>
          </div> );
        
        profilePictureSection = (<div className="Skeleton-images">
          {
            this.state.images.map((image, index) => (
            <img src={image} key={index} className="Profile-picture"/>
            ))
         }

          <div><button className="App-submit" type="button" onClick={this.deleteImages}>
            Delete Profile Picture
            </button>

            <div><button className="App-submit" type="button" onClick={this.changeShowChangePicture}>
                Upload new Profile Picture
              </button>
                    {/* <label htmlFor="fileInput">Upload New Profile Picture</label> */}
              {this.state.showChangePicture ? (<><input className="App-fileUpload" id="fileInput" type="file" name="files[]" accept="image/*" onChange={this.uploadImage} /> <p>Only you can see your profile picture!</p></>):("")}
            </div>
          </div>
        </div>);
        }  
      else {userNameChanger= ""; profilePictureSection=""} 
    
      return(
        <div className="u-textCenter Profile-Container">
          <div className="Profile-Object">
            <h1 className="Profile-Username">Profile of {this.state.profileUser.name}</h1>
            <div className="shortHorizontalLine"> </div>
          </div>
          
        <div className="u-flex Profile-ContentContainer">
          <div className="Profile-Parts u-flexColumn u-flex-alignCenter">
            {profilePictureSection}

          <div><h3>How to Upload a Profile Picture</h3></div>
          <div><p className="Profile-PictureExplanation"> Open an graphics editor of your choice (e.g. Adobe Photoshop, Gimp, MS Paint). </p>
          <p className="Profile-PictureExplanation">  Add a picture of your face; make sure that you look directly at the camera, thst your head isn't tilted in any direction, that the picture is well-lighted and that your face isn't covered by hair in front of your forehead or glasses.</p>
          <p className="Profile-PictureExplanation">Crop the picture of your face such that your face completly fills the image. Your chin should lay on the bottom edge of the image; the top edge should be between your hairline and the top of your head. The left and the right edge of the image should be where your ears start, or a bit closer to the center of your face. Please see the example picture below.</p>
          <p className="Profile-PictureExplanation">Save the image and upload it here.</p>
          <p className="Profile-PictureExplanation">Optional: For the best experience, make sure that your image has a width of 200px and a height of 300px, distorting it if neccessary. If your graphics editor supports it, change the colors to 8-bit, in order to decrease the file size. Save as .png.</p>
          <p className="Profile-PictureExplanation">Feel free to right-click, save, reupload, and play with one of the sample pictures below.</p>
          <p className="Profile-PictureExplanation">Sample picture:</p>
          <img src="https://storage.googleapis.com/xaea12sgodparentsbucket1/testface4.png" />
          <p className="Profile-PictureExplanation">Sources: CC <a href="https://commons.wikimedia.org/wiki/File:JoeBidenCropped.jpg">White House</a>, images distorted and mirrored</p>
          </div>
          </div>

          <div>
            <div className="Profile-verticalLine" />
          </div>
          
          <div className="Profile-Parts">
            <div className="Profile-Object">
              <h2>Username</h2>
              <p>{this.state.profileUser.username}</p>
            </div>
            {userNameChanger}
            <div className="Profile-Object">
              <h2>User-ID</h2>
             <p>{this.state.profileUser._id}</p>
            </div>

            <div className="Profile-rankListContainer">
           
              {/* <h4>Number of Rounds for the Ranklist</h4> */}
              <div className="u-flex u-flex-justifyCenter"><div className="Profile-imageCountSelector" onClick={this.set1} id="selector1">1</div><div className="Profile-imageCountSelector" onClick={this.set3} id="selector3">3</div><div className="Profile-imageCountSelector" onClick={this.set5} id="selector5">5</div></div>
            {/* <p><input list="tickmarks" className="App-slider" type = "range" min="1" max="5" step="2" value={this.state.slidervalue} onChange={this.handleChange}/></p> */}

              <RankList user={this.state.profileUser} imageCount={this.state.imageCount}/>
            </div> 

          </div>
        </div>
        </div>
      );
    }
  }
}

export default Profile;
