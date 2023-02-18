import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import BannerImage from "../assets/pic.png";
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
      <div className="projects" style={{ backgroundImage: `url(${BannerImage})` }}>
        <div className="headerContainer">
          <button type="click" onClick={navigateToJobs}>
            Create Projects
          </button>
          <br />
          {/* Sample project */}
          <button type="click" onClick={navigateToJobs}>
            Auto Mates Projects
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
