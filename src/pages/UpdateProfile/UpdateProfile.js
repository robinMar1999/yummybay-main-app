import React, { Fragment, useEffect, useRef, useState } from "react";
import classes from "./UpdateProfile.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfile = (props) => {
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const latitudeRef = useRef();
  const longitudeRef = useRef();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const navigate = useNavigate();

  const [isAdding, setIsAdding] = useState(false);
  const [addingCustomPosition, setAddingCustomPosition] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err.code, err.message);
      }
    );
  });

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const phone = phoneRef.current.value;
    const data = new FormData();
    data.append("name", name);
    data.append("address", address);
    data.append("phone", phone);
    if (addingCustomPosition) {
      data.append("latitude", latitudeRef.current.value);
      data.append("longitude", longitudeRef.current.value);
    } else {
      data.append("latitude", latitude);
      data.append("longitude", longitude);
    }

    axios({
      method: "put",
      url: "/customer/profile",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: props.token,
      },
    })
      .then(function (response) {
        console.log(response);
        navigate("/");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const toggleCustomPosition = () => {
    setAddingCustomPosition((prev) => !prev);
  };

  return (
    <div className={classes.UpdateProfile}>
      <h1>Update Your Profile</h1>
      <form onSubmit={formSubmitHandler} className={classes.Form}>
        {isAdding && <div className={classes.isAdding}>Adding Profile...</div>}
        <div className={classes.FormControl}>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name" ref={nameRef} />
        </div>
        <div className={classes.FormControl}>
          <label htmlFor="address">Address: </label>
          <input type="text" name="address" id="address" ref={addressRef} />
        </div>
        <div className={classes.FormControl}>
          <label htmlFor="phoneNumber">Phone Number: </label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            ref={phoneRef}
          />
        </div>

        <div className={classes.FormControl}>
          <button
            type="button"
            onClick={toggleCustomPosition}
            className={classes.Toggle}
          >
            Add Custom Position
          </button>
        </div>
        {addingCustomPosition && (
          <Fragment>
            <div className={classes.FormControl}>
              <label htmlFor="latitude">Latitude: </label>
              <input
                type="number"
                name="latitude"
                id="latitude"
                ref={latitudeRef}
              />
            </div>
            <div className={classes.FormControl}>
              <label htmlFor="longitude">Longitude: </label>
              <input
                type="number"
                name="longitude"
                id="latitude"
                ref={longitudeRef}
              />
            </div>
          </Fragment>
        )}
        <div className={classes.FormControl}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default UpdateProfile;
