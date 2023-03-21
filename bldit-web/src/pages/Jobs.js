import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Background from "../assets/pic.png";
import JobsCard from "../components/Jobs/JobsCard";
import JobsBuildList from "../components/Builds/JobsBuildList";

const Jobs = () => {
  const jobsId = "SomeId";

  return (
    <div>
      <Navbar />
      <div className="jobs" style={{ backgroundImage: `url(${Background})` }}>
        <div className="pb-6">
          <JobsCard id={jobsId} />
        </div>
        <div>
          <JobsBuildList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
