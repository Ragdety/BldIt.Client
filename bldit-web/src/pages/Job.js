import React from 'react';
import JobSideNav from "../components/Jobs/JobSideNav";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/Jobs/JobCard";
import BuildList from "../components/Builds/BuildList";
import {Alert} from "@material-tailwind/react";

const Job = () => {
  const [show, setShow] = React.useState(true);
  
  //Get the Id from the URL
  const projectId = "f0cc16a1-fdbf-462f-b4c7-e020b46237a6"
  const jobName = "Test5"
  
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