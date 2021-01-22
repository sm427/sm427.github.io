import React, { Component } from "react";
import "../../utilities.css";
import "../pages/Home.css";

class InputField extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
        value: ""
    };
  }

  render() {
    let placeholder = this.props.placeholder;
    return (
      <div className="Home-inputField">
          <input
            type="text"
            placeholder={placeholder}
            value= {this.props.value}
            onChange={this.props.handleChange}
            className="App-input"
          />
      </div>
    );
  }
}

export default InputField;
