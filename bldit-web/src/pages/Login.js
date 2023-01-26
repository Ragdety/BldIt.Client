import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.css";
import logo from "../assets/logo.png";

//nav
import { Routes, Route, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home";

function LoginForm() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  //Navigation

  const navigate = useNavigate();

  const navigateToSignup = () => {
    //  navigate to /signup
    navigate("/signup");
  };

  const navigateToHome = (event) => {
    //  navigate to /signup
    navigate("/home");
  };

  const navigateForgotPassword = () => {
    //navigate to /forgotpassword
    navigate("/forgotpassword");
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <img src={logo} className="logo" id="logo" alt="Built it logo" />
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>

        <div className="input-container">
          <input type="submit" value="Login" />
        </div>
      </form>

      {/* Navigation */}
      <div className="button-container">
        <button type="click" onClick={navigateToSignup}>
          Sign Up
        </button>
        <button type="click" onClick={navigateForgotPassword}>
          Forgot Password
        </button>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {/* <img src={logo} className="logo" id="logo" alt="Built it logo" /> */}
        {/* {isSubmitted ? <div>User is successfully logged in</div> : renderForm} */}
        {isSubmitted ? <Navigate to="/home" /> : renderForm}

        {/* define routes */}
        <Routes>
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default LoginForm;
