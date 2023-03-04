import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import "../styles/Login.css";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import useApi from "../hooks/useApi";
import identityApi from "../services/auth";
import useAuth from "../hooks/useAuth";
import Error from "../components/Error";

function LoginForm() {
  const loginApi = useApi(identityApi.login);
  const { setAuth } = useAuth();
  
  //Refs
  const userRef = useRef(null);
  const errRef = useRef(null);
  
  //States
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  
  //Effects
  useEffect(() => {
    userRef.current.focus();
  }, []);
  
  useEffect(() => {
    setError('');
  }, [usernameOrEmail, password]);
  
  //This effect is called after the loginApi.request is called
  //Used to handle post login actions, only when loginApi changes this will be called
  useEffect(() => {
    const handlePostLogin = () => {
      if (loginApi.success === true) {
        const data = loginApi.data;
        //And we set the jwt token (which contains the user information)
        setAuth({ token: data.token, refreshToken: data.refreshToken });
        
        //Navigate to the page the user was trying to access (if any)
        navigate(from, { replace: true });
        return;
      }

      //Error handling:
      if (loginApi.status === 400) {
        setError("Invalid username or password");
      } 
      else if (loginApi.status === 500) {
        setError("Unexpected error");
      }
      
      if (error) errRef.current.focus();
    };
    handlePostLogin();
  }, [loginApi.status]);
  
  //Functions
  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    //We're calling the backend api here
    await loginApi.request(usernameOrEmail, password);
    
    //Properties of the loginApi will be set by the useApi hook
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
  };
  
  const navigate = useNavigate();
  const location = useLocation();
  let from = "/";
  
  //If the state is not null, then we come from a protected route 
  if(location.state) {
    from = location.state.from.pathname || "/";
  }

  const navigateToSignup = () => {
    //  navigate to /signup
    navigate("/signup");
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
            ref={userRef}
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
      {error && <Error msg={error} ref={errRef}/>}
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

export default LoginForm;