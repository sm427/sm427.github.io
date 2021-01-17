import React, { Component } from "react";
import { get, post } from "../../utilities";
import ChangeUsername from"../modules/ChangeUsername.js";

import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUser: undefined,
      images: [],
      showChangePicture: false,
    };
  }

  //this.props.user refers to the currently logged-in user
  //this.props.profileUserId is used to load the user whose profile is being displayed
  //this.state.profileuser is the user whose profile is being replaced
  //the differene between user and profileUser is important to secure that users can only change their own username

  componentDidMount() {
    if (this.props.user._id) { //maybe this needs to be changed to profileUser._id
      this.loadImages();
    }
    document.title = `Profile`;
    get(`/api/user`, { userid: this.props.profileUserId}).then((user) => this.setState({ profileUser: user[0]})).then;
    }

    componentDidUpdate(prevProps) {
      if (prevProps.user._id !== this.props.user._id && this.props.user._id) { 
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
      post("/api/deleteImages").then(this.loadImages).then(this.props.updateUserServer());
    }
  
    uploadImage = (event) => {
      this.changeShowChangePicture;
      const fileInput = event.target;
      console.log(fileInput);
      post("/api/deleteImages").then(this.readImage(fileInput.files[0]).then(image => {
        fileInput.value = null;
        return post("/api/uploadImage", { image: image }).then(this.loadImages).then(this.props.updateUserServer());
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

  updateProfileUser = (updatedUser) => { 
      console.log("run1");
      this.setState({
        profileUser: updatedUser})
        this.props.updateUserVariable(updatedUser)
    }

  changeShowChangePicture = () => {
    if(this.state.showChangePicture) {this.setState({showChangePicture: false})
    } else {this.setState({showChangePicture: true})}
  }

  render() {
    let profilePictureSection;
    if (!this.state.profileUser) {
      return <div> Loading! </div>;
    }
    else { 
      document.title = `Profile of ${this.state.profileUser.username}`;
      let userNameChanger = "";
      if (this.props.user._id===this.props.profileUserId) {     //checks if the user is viewing his own profile
        
        userNameChanger = (
          <div className="Profile-Object">
          <ChangeUsername profileUser={this.state.profileUser} updateUser={this.updateProfileUser}/>
          </div> );
        
        profilePictureSection = (<div className="Profile-Object"><div className="Skeleton-images">
          {
            this.state.images.map((image, index) => (
            <img src={image} key={index} />
            ))
         }

          <div><button className="App-submit" type="button" onClick={this.deleteImages}>
            Delete Profile Picture
            </button>

            <div><button className="App-submit" type="button" onClick={this.changeShowChangePicture}>
                Upload new Profile Picture
              </button>
                    {/* <label htmlFor="fileInput">Upload New Profile Picture</label> */}
              {this.state.showChangePicture ? (<><input className="App-fileUpload" id="fileInput" type="file" name="files[]" accept="image/*" onChange={this.uploadImage} /> </>):("")}
            </div>
          </div>
        </div></div>);
        }  
      else {userNameChanger= ""; profilePictureSection=""} 
    
      return(
        <div className="u-textCenter Profile-Container">
          <div className="Profile-Object">
            <h1 className="Profile-Username">Profile of {this.state.profileUser.name}</h1>
            <div className="shortHorizontalLine"> </div>
          </div>
          
          
          {profilePictureSection}
      

          <div className="Profile-Object">
            <h2>Username</h2>
            <p>{this.state.profileUser.username}</p>
          </div>
          {userNameChanger}
          <div className="Profile-Object">
            <h2>User-ID</h2>
           <p>{this.state.profileUser._id}</p>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
