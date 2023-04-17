import React from "react";
import BannerImage from "../assets/pic.png";
import "../styles/Home.css";
import { ReactElement } from "react";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import "../styles/jobconfig.css";
import General from "./General";
import SCMConfig from "./SCMConfig";
import ConfigBuild from "./ConfigBuild"; 
import PostBuild from "./PostBuild"; 



//navigation
import {Routes, Route, useNavigate, Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Breadcrumbs, button} from "@material-tailwind/react";
import JobConfigStepper from "../components/Jobs/JobConfigStepper";
const Form = () => {
    const navigate = useNavigate();

    const navigateToProjects = () => {
        //  navigate to /projects
        navigate("/projects");
    };
    const [step, setStep] = useState(0);
    const titles = ["General", "SCM Config", "Build Configuration", "Post Build"] 
  
    const stepDisplay = () => {
        if (step === 0) {
           return <General />;
       }   else if (step === 1) {
         return <SCMConfig />;
         }  else if (step === 2) {
         return <ConfigBuild />;
       }   else if (step === 3)  {
         return <PostBuild />
       } 
    }
    
  return (
    <div className="form">
      <Navbar/>
      <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
        <div className="header">
          <h1 className="jc-title"> Job Configuration Build </h1>
        </div>
        {/*<JobConfig/>*/}
        <div className="form-step">
          <JobConfigStepper />
        </div>
      </div>
      <Footer/>
    </div>
  );
}


export default Form;