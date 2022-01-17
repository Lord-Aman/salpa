import React, { Component } from "react";
import Axios from "axios";
import auth from "../services/authService";
import "./Login.css";
class Register extends Component {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      isAdmin: true,
    },
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:8080/api/register", {
        name: this.state.data.name,
        email: this.state.data.email,
        password: this.state.data.password,
        isAdmin: this.state.data.isAdmin,
      });
      auth.loginWithJwt(response.headers["x-auth-token"]);
      console.log("User Registered Successfully");
      window.location = "/";
    } catch (ex) {
      console.log("Cannot Register User", ex);
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  render() {
    return (
      <div className="login">
        <div className="form">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
              required
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
