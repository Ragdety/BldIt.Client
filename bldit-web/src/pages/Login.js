import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Login.css";
import logo from "../assets/logo.png";

//nav
import { Routes, Route, useNavigate } from "react-router-dom";

import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home";
import BlditApi from "../api/bldit-api";

function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState("");
  
  // // React States
  // const [isSubmitted, setIsSubmitted] = useState(false);
  
  const login = async () => {
    //We're calling the backend api here
    await BlditApi.post('/identity/login', {
      //This is the data we want to send (username and password)
      //which come from the react states
      UserNameOrEmail: usernameOrEmail,
      Password: password
    }).then(response => {
      //"THEN" once we send the request, we get a response
      
      //With some data in it:
      const data = response.data;
      console.log(data)
      
      //We set the errors to false since we successfully logged in
      setError(false);
      setErrors([]);
      setIsSuccess(true);

      //And we set the jwt token (which contains the user information)
      setToken(data.token);
      console.log(token);
    }).catch(e => {
      //This point is reached if the api returned a 4xx response (meaning there was an error/problem)
      
      //The data is the JSON payload the api returns (which contains the errors)
      const data = e.response.data;
      console.log(data);
      
      //These are the errors given by the API which we set to the errors state so we can render them out
      setErrors(data.Errors)
      setError(true);
    });
  }

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    //navigate("/home");
    await login();
  };
  
  const handleChange = (event, name) => {
    //Define the login user data
    const user = {}
    
    //This comes from the form input values 
    user[name] = event.target.value;
    
    //Set the appropriate fields and states
    switch (name) {
      case 'usernameOrEmail':
        setUsernameOrEmail(user.usernameOrEmail);
        break;
      case 'password':
        setPassword(user.password);
        break;
      default:
        break;
    }
  }

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

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <img src={logo} className="logo" id="logo" alt="Built it logo" />
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username Or Email</label>
          <input
            type="text"
            name="uname"
            required
            onChange={(e) => handleChange(e, "usernameOrEmail")}
          />
          {/* {renderErrorMessage("uname")} */}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="pass"
            required
            onChange={(e) => handleChange(e, "password")}
          />
          {/* {renderErrorMessage("pass")} */}
        </div>

        <div className="input-container">
          <input type="submit" value="Login"/>
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
      {/*We render the errors here (if any)*/}
      {error && (
        <p style={{ color: "red", marginTop: 5 }}>
          {errors.map((error) => error)}
        </p>
      )}
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {isSuccess ? 
            <div>
              User is successfully logged in
            </div> 
            : renderForm}
      </div>
    </div>
  );
}

export default LoginForm;