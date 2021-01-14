import React, { Component } from "react";
//import { get } from "../../utilities";
import "../../utilities.css";


class HowTo extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "How To Play";
    //get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
    }

  render() {
    return (
      <div>
       <h1>Good luck on your project :)</h1>
        <h2> What we provide in this skeleton</h2>
        <ul>
          <li>Google Auth (Skeleton.js & auth.js)</li>
          <li>Socket Infrastructure (client-socket.js & server-socket.js)</li>
          <li>User Model (auth.js & user.js)</li>
        </ul>
        <h2> What you need to change</h2>
        <ul>
          <li>DONE Change the font in utilities.css</li>
          <li>DONE Change the Frontend CLIENT_ID for Google Auth (Skeleton.js)</li>
          <li>DONE Change the Server CLIENT_ID for Google Auth (auth.js)</li>
          <li>DONE Change the Database SRV for Atlas (server.js)</li>
          <li>DONE Change the Database Name for MongoDB (server.js)</li>
          <li>Add a favicon to your website at the path client/dist/favicon.ico</li>
          <li>Update website title in client/dist/index.html</li>
        </ul>
      </div>
    );
  }
}

export default HowTo;
