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
import MyOrders from "./pages/MyOrders/MyOrders";
import useRazorpay from "react-razorpay";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const Razorpay = useRazorpay();
  const [token, setToken] = useState(() => {
    // getting localstorage value
    const token = localStorage.getItem("token");
    return token;
  });

  const [cartItems, setCartItems] = useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

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

  const makeOrder = async (amount) => {
    if (cartItems.length === 0) {
      alert("Please add some items to cart first...");
    } else {
      // const isLoaded = await loadScript(
      //   "https://checkout.razorpay.com/v1/checkout.js"
      // );
      axios({
        method: "post",
        url: "/customer/payment/create-order",
        data: {
          // cartItems,
          // restaurantId: currentRestaurant,
          amount,
        },
        headers: {
          Authorization: token,
        },
      }).then((res) => {
        console.log(res);
        const options = {
          key: "rzp_test_XaCd95n1u53fkD", // Enter the Key ID generated from the Dashboard
          name: "YummyBay",
          description: "Test Transaction",
          image:
            "https://images.unsplash.com/photo-1572843540747-22eea9bcfa6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
          order_id: res.data.rzporder.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: function (response) {
            console.log("Payment successful");
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
              console.log('rana order');
              
              toast.success('🦄 Order placed Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            });
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_signature);
          },
          prefill: {
            name: "Robin Kashyap",
            email: "kashyap.robin.9277@gmail.com",
            contact: "8860531389",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        // const paymentObject = new window.Razorpay(options);
        // paymentObject.open();
        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          console.log("Payment Failed");
          toast.error('🦄 Order failed',{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
        });
        rzp1.open();
        toast.success(`items added to cart`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
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
        <Route path="/my-orders" element={<MyOrders token={token} />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
