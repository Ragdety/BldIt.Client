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
      <div class="container">
        <div class="image">
          <img
            src={require("../assets/cont-int.jpeg")}/>
        </div>
        <div class="text">
          <h1>Continuous Integration</h1>
          <h2>
            Continuous integration (CI) is a software development practice in
            which developers merge their changes to the main branch many times
            per day.{" "}
          </h2>
        </div>
      </div>
      <div class="container1">
        <div class="image1">
          <img
            src={require("../assets/cont-testing.png")}/>
        </div>
        <div class="text1">
          <h1>Continuous Testing</h1>
          <h2>
            Continuous testing (CT) is a software development process in which
            applications are tested continuously throughout the entire software
            development life cycle (SDLC). The goal of CT is to evaluate
            software quality across the SDLC, providing critical feedback
            earlier and enabling higher-quality and faster deliveries.
          </h2>
        </div>
      </div>
      <div class="container2">
        <div class="image2">
          <img
            src={require("../assets/cont-deliv.jpeg")}/>
        </div>
        <div class="text2">
          <h1>Continuous Delivery</h1>
          <h2>
            Continuous Delivery is the ability to get changes of all
            types—including new features, configuration changes, bug fixes and
            experiments—into production, or into the hands of users, safely and
            quickly in a sustainable way.
          </h2>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
