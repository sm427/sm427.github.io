import React, { Component } from "react";
import { get } from "../../utilities";

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
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
    }

  render() {
    if (!this.state.user) {
    return <div> Loading! </div>;
    }
    return (
      <div className="u-textCenter">
        <h1 className="Profile-Username">{this.state.user[0].name}</h1>
        <p>ID: {this.state.user[0]._id}</p>
      </div>
    );
  }
}

export default Profile;
