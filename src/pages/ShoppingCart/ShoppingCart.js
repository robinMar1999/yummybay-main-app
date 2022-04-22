import React from "react";
import classes from "./ShoppingCart.module.css";
import { Link } from "react-router-dom";
import { borderRadius } from "@mui/system";

const ShoppingCart = (props) => {
  const items = [];
  let totalPrice = 0;
  props.cartItems.forEach((item) => {
    items.push(
      <div className={classes.item} key={item.dish._id}>
        <p>{item.dish.name}</p>
        <p>{item.count}</p>
        <p>₹ {item.dish.price * item.count}</p>
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
      <div style={{ color: 'grey' }}>Total Price: {totalPrice}</div>
      <button style={{backgroundColor: " #FFE7E7",borderRadius:"20px", padding:"10px", marginTop:"10px", color:"grey", cursor:"pointer"}} onClick={() => props.makeOrder(totalPrice)}>Order Now</button>
    </div>
  );
};
export default ShoppingCart;

