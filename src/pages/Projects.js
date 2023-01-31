import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../styles/Projects.css"

const Projects = () => {

  const navigate = useNavigate();

  const navigateToJobs = () => {
    //  navigate to /jobs
    navigate("/Jobs");
  };

  return (
    <div className="content">
      <Navbar />
      <div className="headerContainer"></div>
      <button type="click" onClick={navigateToJobs}>
        Create Projects
      </button>
      <br/>
      <button type="click" onClick={navigateToJobs}>
        Projects
      </button>
      <Footer />
    </div>
  );
};

export default Projects;
