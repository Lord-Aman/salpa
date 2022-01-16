import React, { Component } from "react";
import Axios from "axios"
import "./Login.css";
class Register extends Component {
  state={
    data:{
      name:"",
      email:"",
      password:"",
      isAdmin:true
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.post("https://8080-ordman-salpa-giujtw8qiju.ws-us27.gitpod.io/api/register",{
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
      isAdmin:this.state.isAdmin
    })
    console.log('User Registered Successfully')
  }

  handleChange = ({currentTarget:input}) => {
    const data = {...this.state.data};
    data[input.name] = input.value;
    this.setState({data})
    console.log(data);
  }
  
  render() {
    return (
      <div className="login">
        <div className="form">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={this.handleChange} required />
            <input type="text" name="email" placeholder="Email" onChange={this.handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={this.handleChange} required />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
