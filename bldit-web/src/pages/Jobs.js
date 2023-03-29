import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Background from "../assets/pic.png";
import ProjectCard from "../components/Projects/ProjectCard";
import JobsList from "../components/Jobs/JobsList";
import "../styles/Jobs.css";
import {useParams} from "react-router-dom";

const Jobs = () => {
  const { projectId } = useParams();

  return (
    <>
      <Navbar />
      <div className="jobs" style={{ backgroundImage: `url(${Background})` }}>
        <div className="pb-6">
          <ProjectCard id={projectId} />
        </div>
        <div>
          <JobsList projectId={projectId}/>
        </div>
      </div>
      <Footer />
    </>
      
  );
};

export default Jobs;
