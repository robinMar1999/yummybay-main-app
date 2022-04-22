import React, { useEffect, useState, useRef } from "react";
import classes from "./Restaurant.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import DishCount from "../../components/DishCount/DishCount";

const Restaurant = (props) => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  let params = useParams();

  useEffect(() => {
    axios.get("/restaurant/details/" + params.id).then((res) => {
      setRestaurant(res.data.restaurant);
      setDishes(res.data.dishes);
      console.log(res.data.dishes);
    });
  }, []);

  const dishList = [];
  dishes.forEach((dish) => {
    dishList.push(
      <div key={dish._id} className={classes.dish}>
        <p>{dish.name}</p>
        <p>₹ {dish.price}</p>
        <div>
          <img src={dish.imageDetails.url} alt={dish.name} />
        </div>
        <DishCount dish={dish} addToCart={props.add} />
      </div>
    );
  });
  return (
    <div className={classes.Restaurant}>
      <h1>Dishes in {restaurant ? restaurant.name : "loading..."}</h1>
      <div  className={classes.dishes}>{dishList}</div>
    </div>
  );
};
export default Restaurant;
