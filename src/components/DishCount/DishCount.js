import React, { useRef } from "react";
import classes from "./DishCount.module.css";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const DishCount = (props) => {
  const countRef = useRef();
  const clickHandler = () => {
    const count = countRef.current.value;
    props.addToCart(props.dish, count);
    toast.success(`${count} items added to cart`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };

  const dish = props.dish;
  return (
    <div className={classes.DishCount}>
      <div>
        <label htmlFor={`count-${dish._id}`}>Count </label>
        <input
          type="number"
          min={1}
          name={`count-${dish._id}`}
          id={`count-${dish._id}`}
          pattern="[0-9]"
          step={1}
          ref={countRef}
        />
      </div>
      <button style={{backgroundColor: " #FFE7E7",borderRadius:"20px", padding:"10px", marginTop:"10px", color:"grey", cursor:"pointer"}} onClick={clickHandler}>Add to Cart</button>
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
};
export default DishCount;
