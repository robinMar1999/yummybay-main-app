import React from "react";
import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className={classes.Navbar}>
      <Link to="/">Home</Link>
      <Link to="/shopping-cart">Cart</Link>
      <button onClick={props.logoutClick}>Logout</button>
    </div>
  );
};
export default Navbar;
