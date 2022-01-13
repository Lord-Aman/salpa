import React from "react";
import Login from "./login";

function login() {
  return (
    <div>
      <button href="#" style={styles.button}>
        Login
      </button>
    </div>
  );
}

export default login;

const styles = {
  button: {
    background: "red",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    borderRadius: "10px",
    padding: "2px",
    width: "150px",
    marginRight: "10px",
  },
};
