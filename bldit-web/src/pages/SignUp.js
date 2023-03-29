import React from "react";
import { useState, useEffect } from "react";
import "../styles/Login.css";
import logo from "../assets/logo.png";
import identityApi from "../services/auth";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
//import BlditApi from "../api/bldit-api";

function SignUp() {
  const registerAPI = useApi(identityApi.register);
  const { setAuth } = useAuth();

  // States
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);


  // Functions
  const register = async () => {
    if (password !== confirmPassword) {
      setErrors(["Passwords do not match"]);
      setError(true);
      setIsSuccess(false);
      return;
    }

    await identityApi.register(firstName, lastName, email, userName, password)
      .then(response => {
        const data = response.data;
        console.log(data)

        setError(false);
        setErrors([]);

        setToken(data.token);
        console.log(token);

        //TODO: Redirect to home page with the user signed
        navigate("/");
      })
      .catch(error => {
        setErrors(error.response.data.Errors);
        setError(true);
      });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "userName":
        setUserName(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await register();
  };

  const navigate = useNavigate();
  
  const renderForm = (
    <div className="form">
      <img src={logo} className="logo" id="logo" alt="Built it logo" />
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            className="form__input"
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange(e)}
            id="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name=""
            id="lastName"
            value={lastName}
            className="form__input"
            onChange={(e) => handleInputChange(e)}
            placeholder="LastName"
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            name=""
            id="userName"
            value={userName}
            className="form__input"
            onChange={(e) => handleInputChange(e)}
            placeholder="User name"
          />
        </div>

        <div className="input-container">
          <input
            type="email"
            id="email"
            className="form__input"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>
        <div className="input-container">
          <input
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
        <div className="input-container">
          <input
            className="form__input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="Confirm Password"
          />
        </div>

        <div className="input-container">
          <input type="submit" value="Sign Up" />
        </div>
      </form>
      {error && (
        <p style={{ color: "red", marginTop: 5 }}>
          {errors.map((error) => error)}
        </p>
      )}
    </div>
  );

  return (
    <div className="app">
      {isSuccess ? <p>Registration successful</p> : <div className="login-form">{renderForm}</div>}
    </div>
  );
}

export default SignUp;