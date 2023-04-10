import React from 'react';
import Navbar from "../components/Navbar";
import BannerImage from "../assets/pic.png";
import Footer from "../components/Footer";
import JobConfigStepper from "../components/Jobs/JobConfigStepper";
import {Grid} from "@mui/material";
import {Card} from "@mui/material";

const JobConfigPage = () => {
  const gridStyle = {
    height: "100vh",
    width: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: '0 auto',
  };
  
  return (
    <div className="content">
      <Navbar />
      <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
        <Grid style={gridStyle}>
          <Card children={<JobConfigStepper/>} />
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default JobConfigPage;