import React from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className={classes.Navbar}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? classes.Active : "")}
      >
        YummyBay
      </NavLink>
      <NavLink
        to="/update-profile"
        className={({ isActive }) => (isActive ? classes.Active : "")}
      >
        Update Profile
      </NavLink>
      <NavLink
        to="/shopping-cart"
        className={({ isActive }) => (isActive ? classes.Active : "")}
      >
        Cart
      </NavLink>
      <NavLink
        to="/my-orders"
        className={({ isActive }) => (isActive ? classes.Active : "")}
      >
        My Orders
      </NavLink>
      <button onClick={props.logout}>Logout</button>
    </div>
  );
};
export default Navbar;
