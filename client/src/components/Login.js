import React, { Component } from "react";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

import "./Login.css";

class Login extends Component {
  state = {
    data: {
      email: "",
      password: "",
    },
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      window.location = "/";
    } catch (ex) {
      console.log("Error Occurred while Logging in", ex);
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="login">
        <div className="form">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
