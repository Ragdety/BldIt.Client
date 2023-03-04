import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import BannerImage from "../assets/pic.png";
import "../styles/edit.css";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import data from "./mock-data.json";

const JobEdit = () => {
  const navigate = useNavigate();

  const navigateToJobs = () => {
    //  navigate to /jobs
    navigate("/Jobs");
  };

  const [JobDetails, setjobDetails] = useState(data);
  const [newFormData, setNewFormData] = useState({
    createdAt: " ",
    updatedAt: " ",
    JobName: " ",
    description: " ",
  });

  const openEditForm = () => {
    //  navigate to /jobs
    navigate("/Edit");
  };

  // openEditForm --> openPopup()
  // popup --> editJobDetails

  return (
    <div className="content">
      <Navbar />
      <div
        className="EditJobs"
        style={{ backgroundImage: `url(${BannerImage})` }}
      >
        <div class="edit-container">
          <h2 id="editHeader"> Edit Job</h2>
          <form id="editJobDetails">
            <label for="Job Name"> Job Name: </label>
            <input type="text" id="job_name" />
            <label for="Job Details"> Job Details: </label>
            <input type="text" id="u_date" />
            <div class="savebutton">
              <input type="submit" id="save" value="Save" />{" "}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobEdit;
