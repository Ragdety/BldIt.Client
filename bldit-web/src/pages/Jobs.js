import React, {useEffect} from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Background from "../assets/pic.png";
import ProjectCard from "../components/Projects/ProjectCard";
import JobsList from "../components/Jobs/JobsList";
import "../styles/Jobs.css";
import {useParams} from "react-router-dom";
import SideBar from "../components/SideBar";
import BuildWorkers from "../components/BuildWorkers/BuildWorkers";

const Jobs = () => {
    const {projectId} = useParams();

    // Setting up the background image and height and width
    useEffect(() => {
        document.body.classList.add("mainContent");

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove("mainContent");
        };
    }, []);

    return (
        <>
            <div>
                <div>
                    <SideBar/>
                </div>
                {/*<Navbar/>*/}
                {/*<div className="jobs" style={{backgroundImage: `url(${Background})`}}>*/}
                {/*    <div style={{*/}
                {/*        position: "absolute",*/}
                {/*        top: "40%",*/}
                {/*        left: "50%",*/}
                {/*        transform: "translate(-50%, -50%)",*/}
                {/*        width: "85%"*/}
                {/*    }}>*/}
                {/*Page Title*/}
                <div style={{width: "90%"}} className="pageTitle">
                    <h1>Jobs</h1>
                    {/*<button onClick={navigateToCreateProject}>Create Project</button>*/}
                </div>

                <div className="pb-6" style={{width: "90%", float: "right"}}>
                    <div className="ProjectInfoDiv" style={{boxShadow: "0px 0px 15px #438c97", borderRadius:"1rem" }}>
                        <ProjectCard id={projectId}/>
                    </div>
                    {/*<BuildWorkers/>*/}
                </div>

                <div className="ProjectTableDiv">
                    <div className="ProjectTable" style={{maxHeight:"350px"}}>
                        <JobsList projectId={projectId}/>
                    </div>
                </div>

            </div>
            {/*</div>*/}
            {/*// </div>*/}
            {/*<Footer/>*/}
        </>

    );
};

export default Jobs;
