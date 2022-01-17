import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Calendar from "./components/Calendar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import auth from "./services/authService";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    console.log(user);
    this.setState({ user });
  }

  render() {
    return (
      <>
        <Navbar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/"
              render={(props) => <Calendar {...props} user={this.state.user} />}
            />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
