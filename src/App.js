import { useState } from "react";
import "./App.css";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Restaurant from "./pages/Restaurant/Restaurant";
import Navbar from "./components/Navbar/Navbar";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Payment from "./pages/Payment/Payment";
import axios from "axios";

function App() {
  const [token, setToken] = useState(() => {
    // getting localstorage value
    const token = localStorage.getItem("token");
    return token;
  });

  const [cartItems, setCartItems] = useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);

  const addToCart = (dish, count) => {
    setCurrentRestaurant(dish.restaurantRef);
    setCartItems((items) => {
      const newItems = [];
      newItems.push({ dish, count: parseInt(count) });
      items.forEach((item) => {
        if (item.dish._id !== dish._id) {
          newItems.push(item);
        }
      });
      return newItems;
    });
  };

  const makeOrder = () => {
    if (cartItems.length === 0) {
      alert("Please add some items to cart first...");
    } else {
      axios({
        method: "post",
        url: "/customer/order",
        data: {
          cartItems,
          restaurantId: currentRestaurant,
        },
        headers: {
          Authorization: token,
        },
      }).then((res) => {
        console.log(res);
      });
    }
  };

  const removeFromCart = (dish) => {
    setCartItems((items) => {
      const newItems = [];
      items.forEach((item) => {
        if (item.dish._id === dish._id) {
          newItems.push(item);
        }
      });
      return newItems;
    });
  };

  const updateToken = (value) => {
    localStorage.setItem("token", value);
    setToken(value);
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const isLoggedIn = token ? true : false;

  return (
    <div className="App">
      <Navbar logoutClick={clearToken} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Landing />} />
        <Route path="/login" element={<Login setToken={updateToken} />} />
        <Route
          path="/restaurant/:id"
          element={<Restaurant add={addToCart} />}
        />
        <Route
          path="/shopping-cart"
          element={<ShoppingCart cartItems={cartItems} makeOrder={makeOrder} />}
        />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;
