import React, { useEffect, useState } from "react";
import classes from "./Restaurants.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Restaurants = (props) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get("/restaurant/near-me").then((res) => {
      setRestaurants(res.data.restaurants);
    });
  }, []);

  const resList = [];
  restaurants.forEach((restaurant) => {
    resList.push(
      <div key={restaurant._id} className={classes.Restaurant}>
        <span>{restaurant.name}</span>
        <img src={restaurant.imageDetails.url} alt={restaurant.name} />
        <Link to={`/restaurant/${restaurant.user}`}>Enter</Link>
      </div>
    );
  });
  return <div className={classes.Restaurants}>{resList}</div>;
};
export default Restaurants;
