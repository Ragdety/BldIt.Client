import React, { useState } from "react";
import Logo from "../assets/AM-logo.jpeg";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img alt="logo" src={Logo} />
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/Projects"> Projects </Link>
          <Link to="/Jobs"> Jobs </Link>
          <Link to="/Login"> Log out </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/Projects"> Projects </Link>
        <Link to="/Jobs"> Jobs </Link>
        <Link to="/Login"> Log out </Link>
        <button onClick={toggleNavbar}>{<FaBars />}</button>
      </div>
    </div>
  );
}

export default Navbar;
