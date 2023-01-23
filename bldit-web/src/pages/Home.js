import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/AM logo.jpeg";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Auto Mates </h1>
        <Link to="/Projects">
          <button> Projects </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
