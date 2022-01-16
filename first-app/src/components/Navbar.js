import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Salpa Cal
      </Link>
      <div className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-item nav-link" to="/register">
          Register
        </NavLink>
        <NavLink className="nav-item nav-link" to="#">
          Username
        </NavLink>
        <NavLink className="nav-item nav-link" to="/logout">
          Logout
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
