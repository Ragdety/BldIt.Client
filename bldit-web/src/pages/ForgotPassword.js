import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import "../styles/Login.css";
import logo from "../assets/AM-logo.jpeg";
import { useNavigate, useLocation } from "react-router-dom";
import useApi from "../hooks/useApi";
import identityApi from "../services/auth";
import useAuth from "../hooks/useAuth";
import Error from "../components/Error";

function ForgotPassword() {
    const loginApi = useApi(identityApi.login);
    const { setAuth } = useAuth();

    const [email, setEmail] = useState(null);
    const [error, setError] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        switch (id) {
            case "email":
                setEmail(value);
                break;
            default:
                break;
        }
    };

    const resetPassword = async () => {
        //Need to add functionality to reset password

        setError(true);
        setError("If your email is in our database you will recieve a link to reset your password");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await resetPassword();
    };

    const navigate = useNavigate();

    const navigateToSignup = () => {
        navigate("/signup");
    };

    const navigateLogin = () => {
        navigate("/login");
    };

    const renderForm = (
      <div className="form">
          <img src={logo} className="logo" id="logo" alt="Built it logo"/>
          <form onSubmit={handleSubmit}>

              <div className="input-container">
                  <input required
                         type="email"
                         id="email"
                         className="form__input"
                         value={email}
                         onChange={(e) => handleInputChange(e)}
                         placeholder="Email"
                  />
              </div>

              <div className="input-container">
                  <input type="submit" value="Reset Password"/>
              </div>
          </form>

          <div className="button-container">
              <button type="click" onClick={navigateLogin}>
                  Login
              </button>
              <button type="click" onClick={navigateToSignup}>
                  Sign Up
              </button>
          </div>

          {/*We render the errors here (if any)*/}
          {/*{error && <Error msg={error}/>}*/}
          {error && (
              <p style={{ color: "red", marginTop: 5, textAlign:"center", maxWidth:"320px" }}>
                  {<Error msg={error}/>}
              </p>
          )}
      </div>
    );

    return (
      <div className="app">
          <div className="login-form">
              {renderForm}
          </div>
      </div>
    );
}

export default ForgotPassword;