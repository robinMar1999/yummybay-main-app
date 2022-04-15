import React from "react";
import classes from "./ShoppingCart.module.css";
import { Link } from "react-router-dom";

const ShoppingCart = (props) => {
  const items = [];
  let totalPrice = 0;
  props.cartItems.forEach((item) => {
    items.push(
      <div className={classes.item} key={item.dish._id}>
        <div>{item.dish.name}</div>
        <div>{item.count}</div>
        <div>₹ {item.dish.price * item.count}</div>
        <div>
          <img src={item.dish.imageDetails.url} alt={item.dish.name} />
        </div>
      </div>
    );
    totalPrice += item.dish.price * item.count;
  });
  return (
    <div className={classes.ShoppingCart}>
      <h1>Shopping Cart</h1>
      <div className={classes.items}>{items}</div>
      <div>Total Price: {totalPrice}</div>
      <button onClick={() => props.makeOrder(totalPrice)}>Order Now</button>
    </div>
  );
};
export default ShoppingCart;
