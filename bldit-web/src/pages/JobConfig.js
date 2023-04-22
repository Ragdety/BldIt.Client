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
import SideBar from "../components/SideBar";
import ProjectsList from "../components/Projects/ProjectsList";
import {useEffect} from "react";


const JobConfig = () => {
  const {projectId} = useParams();
  const navigate = useNavigate();

    // Setting up the background image and height and width
    useEffect(() => {
        document.body.classList.add("mainContent");

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove("mainContent");
        };
    }, []);

  const navigateToProjects = () => {
    //  navigate to /projects
    navigate("/projects");
  };

  return (

      <div className="mainContent">
          {/*SideBar*/}
          <div style={{width: "10%", height: "100%", display: "flex"}}>
              <SideBar/>
          </div>

          {/*Page Title*/}
          <div style={{width: "90%"}} className="pageTitle">
              <h1>Jobs Configuration Build</h1>
              {/*<button onClick={navigateToCreateProject}>Create Project</button>*/}
          </div>

          {/*Projects Table*/}
          <div className="ProjectTableDiv">
              <div className="form-step">
                  <JobConfigStepper projectId={projectId}/>
              </div>
              {/*<button className="buttonsDesign" style={{marginTop:"3%"}} onClick={navigateToCreateProject}>Create Project</button>*/}
          </div>
      </div>
    // <div className="form">
    //   <Navbar/>
    //   <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
    //     <div className="header">
    //       <h1 className="jc-title"> Job Configuration Build </h1>
    //     </div>
    //     <div className="form-step">
    //       <JobConfigStepper projectId={projectId}/>
    //     </div>
    //   </div>
    //   <Footer/>
    // </div>
  );
}

export default JobConfig;