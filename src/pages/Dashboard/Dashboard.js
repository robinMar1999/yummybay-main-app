import React from "react";
import Restaurants from "../../components/Restaurants/Restaurants";
import classes from "./Dashboard.module.css";
const Dashboard = (props) => {
  return (
    <div className={classes.Dashboard}>
      <h1>Welcome to YummyBay. Choose from the below restaurants.</h1>
      <Restaurants />
    </div>
  );
};
export default Dashboard;
