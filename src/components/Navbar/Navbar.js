import React from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className={classes.Navbar}>
      <img
        src="https://image.shutterstock.com/image-illustration/red-button-rectangular-shiny-plate-600w-1261322434.jpg"
        alt="logo"
        style={{
          height: "40px",
          width: "150px",
          marginTop: "5px",
          
        }}
      />
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? classes.Active : "")}
      >
        Home
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
      <button onClick={props.logoutClick}>Logout</button>
    </div>
  );
};
export default Navbar;
