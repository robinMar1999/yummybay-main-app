import React, { Fragment, useEffect, useRef, useState } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let interval = null;

const Login = (props) => {
  let navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [tempToken, setTempToken] = useState(null);
  const [msg, setMsg] = useState(null);
  const emailRef = useRef();
  const otpRef = useRef();

  console.log("Login.js rendering...");

  const sendFormHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    axios
      .post("/auth/getotp", {
        email,
        role: "customer",
      })
      .then((response) => {
        setIsOtpSent(true);
        setTempToken(response.data.token);
        interval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev == 1) {
              clearInterval(interval);
              return 0;
            } else {
              return prev - 1;
            }
          });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const verifyFormHandler = (e) => {
    // Work left: send axios request and get response.
    e.preventDefault();
    const otp = otpRef.current.value;
    axios({
      method: "post",
      url: "/auth/verify",
      data: {
        otp,
        enteredAt: new Date(),
      },
      headers: {
        Authorization: tempToken,
      },
    })
      .then((res) => {
        clearInterval(interval);
        setIsVerified(true);
        setMsg("Phone number verified successfully");
        props.login(res.data.token, res.data.isProfileAdded);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Some error occurred");
      });
  };
  return (
    <div className={classes.Login}>
      <h1>Enter the email id</h1>
      {!isOtpSent && (
        <form onSubmit={sendFormHandler}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailRef} />
          <button type="submit">Submit</button>
        </form>
      )}
      {isOtpSent && (
        <Fragment>
          <form onSubmit={verifyFormHandler}>
            <label htmlFor="otp">Enter the Otp: </label>
            <input type="text" name="otp" id="otp" ref={otpRef} />
            <button type="submit">Submit</button>
          </form>
          {!isVerified && <p>{timeLeft} seconds left.</p>}
          {isVerified && <p>{msg}</p>}
        </Fragment>
      )}
    </div>
  );
};
export default Login;
