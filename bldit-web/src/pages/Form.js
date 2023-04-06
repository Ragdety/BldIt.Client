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
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { button } from "@material-tailwind/react";
const Form = () => {
    //Navigation

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
 

/*     const titles = ["Post Build"]
     const stepDisplay = () => {
        if (step === 0) {
           return <PostBuild />;
       }  */     

/* const buttonDisplay = () => {
    if (step === 0) {
        document.getElementById("nav_back").style.visibility = "hidden";
        document.getElementById("nav_next").style.visibility = "visible";
        document.getElementById("submit").style.visibility = "hidden";
 }
}
   if (step === 1) {
        document.getElementById('nav_back').style.visibility = "visible";
        document.getElementById('nav_next').style.visibility = "visible";
        document.getElementById('submit').style.visibility = "hidden";
}
if (step === 2) {
        document.getElementById('nav_back').style.visibility = "visible";
        document.getElementById('nav_next').style.visibility = "visible";
        document.getElementById('submit').style.visibility = "hidden";
}
else {
        document.getElementById('nav_back').style.visibility = "hidden";
        document.getElementById('nav_next').style.visibility = "hidden";
        document.getElementById('submit').style.visibility = "visible";
} */


   
 return (
        <div className="form" style={{ backgroundImage: `url(${BannerImage})` }}>
            <div className="container"> <Navbar />
                </div>
            <div className="header">
                <h1> Job Configuration Build </h1>
            </div>
            <form className="form-step">
                <div className="stepHeader">
                    <h2> {titles[step]}</h2>
                </div>
             <div className="body">
                {stepDisplay()}
             </div>

                
                 <div className="nav_button">
                    <button type="submit" id="nav_back" value="Submit"> Back </button> 
                    {/* <button type="submit" id="nav_next" value="Submit" onClick={() => {setStep((currentStep)=> currentStep + 1); }}> Next </button> */} 
              <button id="nav_next" onClick={() => {setStep((currentStep)=> currentStep + 1); }}> Next</button>  
                 <button type="submit" id="submit" value="Submit">Submit</button> 
                </div>
            </form>
            
        <Footer/> 
</div>
    );
    }


export default Form;