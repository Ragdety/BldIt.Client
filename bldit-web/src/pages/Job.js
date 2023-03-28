import React from 'react';
import SideNav from "../components/Jobs/SideNav";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/Jobs/JobCard";
import BuildList from "../components/Builds/BuildList";
import "../styles/Jobs.css";

const Job = () => {
  const jobId = "SomeId"
  
  return (
    <>
      <Navbar/>
      <SideNav />
      <div className="p-4 sm:ml-64">
        <div className="pb-6">
          <JobCard id={jobId}/>
        </div>
        <div>
          <BuildList/>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Job;
