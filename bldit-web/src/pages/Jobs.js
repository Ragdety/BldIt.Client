import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Background from "../assets/pic.png";
import ProjectCard from "../components/Projects/ProjectCard";
import JobsList from "../components/Jobs/JobsList";
import "../styles/Jobs.css";
import {useParams} from "react-router-dom";

const Jobs = () => {
    const {projectId} = useParams();

    return (
        <>
            <Navbar/>
            <div className="jobs" style={{backgroundImage: `url(${Background})`}}>
                <div style={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "85%"
                }}>
                    <div className="pb-6">
                        <ProjectCard id={projectId}/>
                    </div>
                    <div style={{maxHeight: "350px", overflowY: "auto", overflowX: "hidden"}}>
                        <JobsList projectId={projectId}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    );
};

export default Jobs;
