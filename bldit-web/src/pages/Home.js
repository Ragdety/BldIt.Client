import React from "react";
import BannerImage from "../assets/AMbg.jpeg";
import "../styles/Home.css";

//navigation
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Home = () => {
  //Navigation

  const navigate = useNavigate();

  const navigateToProjects = () => {
    //  navigate to /projects
    navigate("/projects");
  };

  return (
    <div className="content">
      <Navbar />
      <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
        <div className="headerContainer">
          <h1> Auto Mates </h1>
          <p> System that allows developers to automate their tasks.</p>
          <button type="click" onClick={navigateToProjects}>
            Projects
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
