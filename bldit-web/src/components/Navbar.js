import React, { useState } from "react";
import Logo from "../assets/AM-logo.jpeg";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../styles/Navbar.css";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const { auth } = useAuth();

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
    
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img alt ="logo" src={Logo} />
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/Projects"> Projects </Link>
             <Link to="/Jobs"> Jobs </Link>
          <Link to="/Login"> Login </Link>
          <Link to="/SignUp"> Sign Up </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        {auth.token ? (
          <>
            <Link to="/Projects"> Projects </Link>
            <Link to="/Jobs"> Jobs </Link>
            <Link to="/Logout"> Logout </Link>
          </>
        ) : (
          <>
            <Link to="/Login"> Login </Link>
            <Link to="/SignUp"> Sign up </Link>
          </>
        )}
        
        <button onClick={toggleNavbar}>
          { <FaBars />}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
