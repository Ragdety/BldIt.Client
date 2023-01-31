import React from "react";
import BannerImage from "../assets/AMbg.jpeg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";

//navigation
import { Routes, Route, useNavigate } from "react-router-dom";
import Projects from "./Projects";

const Home = () => {
  //Navigation

  const navigate = useNavigate();

  const navigateToProjects = () => {
    //  navigate to /projects
    navigate("/projects");
  };

  return (
    <div className="content">
      <Navbar/>
      <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
        <div className="headerContainer">
          <h1> Auto Mates </h1>
          <p> System that allows developers to automate their tasks.</p>
        </div>
      </div>
      {/* define routes */}
      {/*<Routes>*/}
      {/*  <Route exact path="/projects" element={<Projects />} />*/}
      {/*</Routes>*/}
      {/* Navigation */}
      <button type="click" onClick={navigateToProjects}>
        Create Project
      </button>
      <Footer/>
    </div>
  );
}

export default Home;
