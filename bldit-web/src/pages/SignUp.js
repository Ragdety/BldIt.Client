import React from "react";
import { useState, useEffect } from "react";
import "../styles/Login.css";
import logo from "../assets/logo.png";

//nav
import { useNavigate } from "react-router-dom";

import Home from "./Home";
import BlditApi from "../api/bldit-api";

function RegistrationForm() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const registration = async () => {
    //We're calling the backend api here
    await BlditApi.post("/identity/registration", {
      // This is the data we want to send (firstName,
      //   lastName,
      //   email,
      //   userName,
      //   password,
      //   confirmPassword)
      //which come from the react states
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      UserName: userName,
      Password: password,
      ConfirmPassword: confirmPassword,
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "userName") {
      setUserName(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      firstName,
      lastName,
      email,
      userName,
      password,
      confirmPassword
    );
  };

  //registration form

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
          <input type="submit" value="Sign" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      //rendering form
      <div className="login-form">{renderForm}</div>
    </div>
  );
}

export default RegistrationForm;
