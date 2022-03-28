import React, { useEffect, useState } from "react";
import classes from "./MyOrders.module.css";
import axios from "axios";
const MyOrders = (props) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "/customer/order",
      headers: {
        Authorization: props.token,
      },
    })
      .then((res) => {
        console.log(res.data.orders);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
        alert("some error occurred");
      });
  }, []);
  const orderList = [];
  orders.forEach((order) => {
    orderList.push(
      <div className={classes.orderItem} key={order._id}>
        <div>
          <strong>Ordered At: </strong>
          {new Date(order.createdAt).toLocaleString()}
        </div>
        <div>
          {order.dishes.map((dish) => {
            return (
              <div key={dish._id}>
                {dish.count} {dish.dish.name}
              </div>
            );
          })}
        </div>
        <div>Total Price: ₹ {order.totalPrice}</div>
        <div>{order.status === 0 ? "Yet to Deliver" : "Delivered"}</div>
      </div>
    );
  });
  return (
    <div className={classes.MyOrders}>
      <h1>My Orders</h1>
      <div className={classes.orderItems}>{orderList}</div>
    </div>
  );
};
export default MyOrders;
