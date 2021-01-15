import React, { Component } from "react";
import { post } from "../../utilities";
import "./changeUsername.css";

class ChangeUsername extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          value: "",
        };
      }

    componentDidMount() {
      this.setState({value: this.props.profileUser.username})
    }
    
    changeUsername = (value) => {
      let body = { userId: this.props.profileUser._id, username: this.state.value };
      post("/api/user", body).then((updatedUser)=>this.props.updateUser(updatedUser)).then(console.log(`Changed username for ${this.props.profileUser.name}/${this.props.profileUser._id} to ${this.state.value}`));
    };

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        })
    }

    handleSubmit = (event) => {
        /*this.changeUsername &&*/ this.changeUsername(this.state.value);
    }
  
    render() {
      return (
        <>
        <h2>Change your Username</h2>
        <div className="changeUsername-container">
          <div>
          <input
            type="text"
            placeholder="Type username"
            value={this.state.value}
            onChange={this.handleChange}
            className="changeUsername-input"
          />
          </div>
          <div>
         <button
            type="submit"
            className="u-pointer changeUsername-submit"
            value="Change"
            onClick={this.handleSubmit}
         >
          Submit
          </button>
          </div>
        </div>
        </>
      )
    }
  }
  
  export default ChangeUsername;