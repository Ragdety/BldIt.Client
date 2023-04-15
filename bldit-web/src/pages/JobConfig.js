import React from "react";
import BannerImage from "../assets/pic.png";
import "../styles/Home.css";
import { useState } from "react";
import "../styles/jobconfig.css";
import General from "./General";
import SCMConfig from "./SCMConfig";
import ConfigBuild from "./ConfigBuild";
import PostBuild from "./PostBuild";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobConfigStepper from "../components/Jobs/JobConfigStepper";


const JobConfig = () => {
  const {projectId} = useParams();
  const navigate = useNavigate();

  const navigateToProjects = () => {
    //  navigate to /projects
    navigate("/projects");
  };

  return (
    <div className="form">
      <Navbar/>
      <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
        <div className="header">
          <h1 className="jc-title"> Job Configuration Build </h1>
        </div>
        <div className="form-step">
          <JobConfigStepper projectId={projectId}/>
        </div>
      </div>
      {/*<Footer/>*/}
    </div>
  );
}

export default JobConfig;