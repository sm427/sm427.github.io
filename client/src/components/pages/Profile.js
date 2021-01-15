import React, { Component } from "react";
import { get } from "../../utilities";
import ChangeUsername from"../modules/ChangeUsername.js";

import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileUser: undefined,
    };
  }

  //this.props.user refers to the currently logged-in user
  //this.props.profileUserId is used to load the user whose profile is being displayed
  //this.state.profileuser is the user whose profile is being replaced
  //the differene between user and profileUser is important to secure that users can only change their own username

  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { userid: this.props.profileUserId}).then((user) => this.setState({ profileUser: user[0]}));
    }

  updateProfileUser = (updatedUser) => { 
      this.setState({
        profileUser: updatedUser})
        this.props.updateUser
    }

  render() {
    if (!this.state.profileUser) {
      return <div> Loading! </div>;
    }
    else { 
      let userNameChanger = "";
      if (this.props.user._id===this.props.profileUserId) {     //checks if the user is viewing his own profile
        userNameChanger = 
          <div className="Profile-Object">
          <ChangeUsername profileUser={this.state.profileUser} updateUser={this.updateProfileUser}/>
          </div> 
        }  
      else {userNameChanger= ""} 
    
      return(
        <div className="u-textCenter Profile-Container">
          <div className="Profile-Object">
            <h1 className="Profile-Username">Profile of {this.state.profileUser.name}</h1>
            <div className="shortHorizontalLine"> </div>
          </div>
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
