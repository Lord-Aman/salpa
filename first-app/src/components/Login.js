import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="form">
          <form className="login-form">
            <input type="text" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
