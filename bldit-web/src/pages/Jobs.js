import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BannerImage from "../assets/pic.png";

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="projects" style={{ backgroundImage: `url(${BannerImage})` }}>
        <Footer />
      </div>
    </div>
  );
};

export default Jobs;
