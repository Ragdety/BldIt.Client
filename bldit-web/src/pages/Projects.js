import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BannerImage from "../assets/pic.png";
import "../styles/p_dashboard.css"
import "../styles/Projects.css";
import {useNavigate} from "react-router-dom";
import "../styles/Home.css";
import ProjectsList from "../components/Projects/ProjectsList";
import SideBar from "../components/SideBar";
import "../styles/ProjectsRedesign.css";
import {useEffect} from "react";
import BuildWorkers from "../components/BuildWorkers/BuildWorkers";

const Projects = () => {
    // Setting up the background image and height and width
    useEffect(() => {
        document.body.classList.add("mainContent");

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove("mainContent");
        };
    }, []);

    const navigate = useNavigate();

    const navigateToCreateProject = () => {
        //navigate to /forgotpassword
        navigate("/createproject");
    };

    return (
        <>
            <div className="mainContent">
                {/*SideBar*/}
                <div style={{width: "10%", height: "100%", display: "flex"}}>
                    <SideBar/>
                </div>

                {/*Page Title*/}
                <div style={{width: "90%"}} className="pageTitle">
                    <h1>Projects Dashboard</h1>
                    {/*<button onClick={navigateToCreateProject}>Create Project</button>*/}
                </div>
                

                {/*Projects Table*/}
                <div className="ProjectTableDiv">
                    <div className="ProjectTable">
                        <ProjectsList/>
                    </div>
                    <button className="buttonsDesign" style={{marginTop:"3%"}}>Create Project</button>
                </div>
            </div>
            {/*<Navbar />*/}
            {/*<div className="content">*/}
            {/*  <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>*/}
            {/*      <div style={{position:"absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", width:"85%"}}>*/}
            {/*    <h2 className="projectsTitle"> Projects Dashboard</h2>*/}
            {/*    <div className = "oneTimeButton">*/}
            {/*      <button className="new" onClick={navigateToCreateProject}> Create Project  </button>*/}
            {/*    </div>*/}
            {/*      <div style={{maxHeight:"350px", overflowY:"auto", overflowX:"hidden", borderRadius: "9px"}}>*/}
            {/*    <ProjectsList />*/}
            {/*      </div>*/}
            {/*      </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<Footer/>*/}
        </>
    );
}

export default Projects;