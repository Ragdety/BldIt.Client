
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import BannerImage from "../assets/pic.png";
import "../styles/p_dashboard.css"
import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import data from "./mock-data.json";
 

const Projects = () => {

  const navigate = useNavigate();

  const navigateToJobs = () => {
    //  navigate to /jobs
    navigate("/Jobs");
  };



  const [projectDetails, setprojectDetails] = useState(data);
  const [newFormData, setNewFormData] = useState({
      id: ' ',
      createdAt: ' ',
      updatedAt: ' ',
      projectName: ' ',
      description: ' ',
  })  
  
  const openEditForm = () => {
    //  navigate to /Edit Form
    navigate("/Edit");
  };

  //delete does not persist(?)
 const deleteRow = (id) => {
  const newProjects = [...projectDetails];
  const index = projectDetails.findIndex((projectDetails) => projectDetails.id === id);
  // splice to remove item at the index
  newProjects.splice(index, 1);
  setprojectDetails(newProjects);
};



return (
  <div className="content">
    <Navbar />
    <div className="projectsDash" style={{ backgroundImage: `url(${BannerImage})` }}>
      <h2> Projects Dashboard</h2>
<div className = "oneTimeButton"> 
      <button class="new"> Create Project  </button>
      <button class="return"> Return to Jobs  </button>
      </div>

     <table className="table-container"> 
      <thead>
          <tr>
              <th> Project ID</th>
              <th> Created At </th>
              <th> Updated At </th>
              <th> Project Name </th>
              <th> Description </th>
              <th> Modifications </th>
          </tr>
      </thead>
<tbody>
          {projectDetails.map((projectDetails)=>  
          ( <tr>
               {/* properties come from the objects in the JSON file  */}
              <td> {projectDetails.id} </td>
              <td> {projectDetails.createdAt} </td>
              <td> {projectDetails.updatedAt} </td>
              <td> {projectDetails.projectName} </td>
              <td> {projectDetails.description} </td>
             
              <td>  
                   {/* onclick="functionname()"  */}
                <button class="edit" onClick={openEditForm}> Edit  </button> 
                <button class="delete" onClick={()=> deleteRow(projectDetails.id)}> Delete  </button> 
              </td>
          </tr>
          )
          )}  
      </tbody> 
     </table>


</div>
    <Footer/>
  </div>
);
};

export default Projects;
