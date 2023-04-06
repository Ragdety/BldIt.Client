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
            <div style={{position:"absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", width:"85%"}}>
          <h2 className="projectsTitle"> Projects Dashboard</h2>
          <div className = "oneTimeButton">
            <button className="new" onClick={navigateToCreateProject}> Create Project  </button>
          </div>
            <div style={{maxHeight:"350px", overflowY:"auto", overflowX:"hidden"}}>
          <ProjectsList />
            </div>
            </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Projects;