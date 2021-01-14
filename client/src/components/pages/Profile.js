import React, { Component } from "react";
import { get } from "../../utilities";
import ChangeUsername from"../modules/ChangeUsername.js";

import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user[0] }));
    }

  updateUser = (updatedUser) => { 
    console.log(updatedUser)
    this.setState({
      user: updatedUser})
  }

  render() {
    if (!this.state.user) {
    return <div> Loading! </div>;
    }
    // if (this.props.userId===this.state.user[0]._id) 
    //   {userNameChanger= "<ChangeUsername username={this.state.user[0].username} userId={this.props.userId}/>"}
    // else {userNameChanger= ""}

    return (
      <div className="u-textCenter Profile-Container">
        <div className="Profile-Object">
          <h1 className="Profile-Username">Profile of {this.state.user.name}</h1>
          <div className="shortHorizontalLine"> </div>
        </div>
        <div className="Profile-Object">
          <h2>Username</h2>
          <p>{this.state.user.username}</p>
        </div>
        <div className="Profile-Object">
          <ChangeUsername username={this.state.user.username} userId={this.props.userId} updateUser={this.updateUser}/>
        </div>
        <div className="Profile-Object">
          <h2>User-ID</h2>
          <p>{this.state.user._id}</p>
        </div>
      </div>
    );
  }
}

export default Profile;
