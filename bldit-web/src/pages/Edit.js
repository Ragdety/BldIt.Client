
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import BannerImage from "../assets/pic.png";
import "../styles/edit.css"
import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import data from "./mock-data.json";
 

const Edit = () => {

  const navigate = useNavigate();

  const navigateToJobs = () => {
    //  navigate to /jobs
    navigate("/Jobs");
  };



  const [projectDetails, setprojectDetails] = useState(data);
  const [newFormData, setNewFormData] = useState({
      createdAt: ' ',
      updatedAt: ' ',
      projectName: ' ',
      description: ' ',
  })  
  
  const openEditForm = () => {
    //  navigate to /jobs
    navigate("/Edit");
  };

  // openEditForm --> openPopup()
  // popup --> editProjectDetails

 

return (
  <div className="content">
    <Navbar />
    <div className="EditProjects" style={{ backgroundImage: `url(${BannerImage})` }}>
                <div class="edit-container">
                <h2 id="editHeader"> Edit Project</h2>
                    <form id="editProjectDetails"> 
                       <label for="Created Date"> Create Date: </label> 
                       <input type="text" id="c_date" name="c_date"/> 
                        <label for="Updated Date"> Update Date: </label> 
                       <input type="text" id="u_date"/> 
                       <label for="Project Name"> Project Name: </label> 
                       <input type="text" id="project_name"/>
                       <div class="savebutton">
                    <input type="submit" id="save" value="Save"/> </div>
                    </form>
                    </div>



</div>
    <Footer />
  </div>
);
};

export default Edit;
