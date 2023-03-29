import React from 'react';
import JobSideNav from "../components/Jobs/JobSideNav";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/Jobs/JobCard";
import BuildList from "../components/Builds/BuildList";
import {useParams} from "react-router-dom";

const Job = () => {
  const { projectId, jobName } = useParams();

  return (
    <>
      <Navbar/>
      <JobSideNav projectId={projectId} jobName={jobName}/>
      <div className="p-4 sm:ml-64">
        <div className="pb-6">
          <JobCard projectId={projectId} jobName={jobName}/>
        </div>
        <div>
          <BuildList projectId={projectId} jobName={jobName}/>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Job;