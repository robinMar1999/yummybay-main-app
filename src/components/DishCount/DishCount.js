import React, { useRef } from "react";
import classes from "./DishCount.module.css";
const DishCount = (props) => {
  const countRef = useRef();
  const clickHandler = () => {
    const count = countRef.current.value;
    props.addToCart(props.dish, count);
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
      <button onClick={clickHandler}>Add to Cart</button>
    </div>
  );
};
export default DishCount;
