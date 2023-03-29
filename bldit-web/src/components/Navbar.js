import React, { useState, useEffect } from "react";
import Logo from "../assets/AM-logo.jpeg";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../styles/Navbar.css";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(true);

  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefresh = async () => {
      try {
        await refresh();
        setIsNotLoggedIn(false);
      }
      catch(error) {
        setIsNotLoggedIn(true);
      }
    }

    //If there is no jwt token in auth, refresh it
    !auth.token ? verifyRefresh() : setIsNotLoggedIn(false);

    if(!auth) {
      setIsNotLoggedIn(true);
    }
  }, []);

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
        <>
          {isNotLoggedIn
            ? (
              <>
                <Link to="/Login"> Login </Link>
                <Link to="/SignUp"> Sign up </Link>
              </>
            )
            : (
              <>
                <Link to="/Projects"> Projects </Link>
                <Link to="/Jobs"> Jobs </Link>
                <Link to="/Logout">Logout</Link>
              </>
            )}
        </>
        <button onClick={toggleNavbar}>
          { <FaBars />}
        </button>
      </div>
    </div>
  );
}

export default Navbar;