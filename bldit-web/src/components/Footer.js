import React, { useState } from "react";
import Logo from "../assets/AM-logo.jpeg";
import { useNavigate } from "react-router-dom";
import "./ContactForm.js";
import "../styles/Footer.css";

function Footer() {

  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const navigate = useNavigate();

  const navigateToContactForm = () => {
    //  navigate to /contactform
    navigate("/contactform");
  };

  return (
    <div className="footer">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img alt="logo" src={Logo} />
        <p> &copy; 2023 Auto Mates</p>
        <hr/>
        <div className="contactform">
          <button type="click" onClick={navigateToContactForm}>
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
}
export default Footer;
