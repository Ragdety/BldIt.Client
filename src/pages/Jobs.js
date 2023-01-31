import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <h1>
        Will display the jobs of the projects in the list format. Can create new
        jobs, edit the current jobs, and click a job to see its dashboard.{" "}
      </h1>
      <Footer />
    </div>
  );
};

export default Jobs;
