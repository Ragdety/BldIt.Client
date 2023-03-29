import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BannerImage from "../assets/pic.png";
import "../styles/p_dashboard.css"
import "../styles/Projects.css";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import ProjectsList from "../components/Projects/ProjectsList";

const Projects = () => {
  const navigate = useNavigate();

  const navigateToCreateProject = () => {
    //navigate to /forgotpassword
    navigate("/createproject");
  };
  
  return (
    <>
      <Navbar />
      <div className="content">
        <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
          <h2 className="projectsTitle"> Projects Dashboard</h2>
          <div className = "oneTimeButton">
            <button className="new" onClick={navigateToCreateProject}> Create Project  </button>
          </div>
          <ProjectsList />
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Projects;