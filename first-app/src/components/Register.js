import React, { Component } from "react";
import "./Login.css";
class Register extends Component {
  render() {
    return (
      <div className="login">
        <div className="form">
          <form className="login-form">
            <input type="text" placeholder="Name" required />
            <input type="text" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button>Register</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
