import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import BannerImage from "../assets/pic.png";
import "../styles/p_dashboard.css"
import React, { useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import data from "./mock-data.json";
import axios from "axios";

const Projects = () => {

    const navigate = useNavigate();
    const [projectDetails, setProjectDetails] = useState([]);

    const navigateToJobs = () => {
        //  navigate to /jobs
        navigate("/Jobs");
    };
    
    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwianRpIjoiZGY5ODE0NTAtNjNjOC00YjYwLWI3MGEtZmRiNTFmYWIxYzMwIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwidXNlcm5hbWUiOiJUZXN0IiwiZmlyc3ROYW1lIjoiVGVzdCIsImxhc3ROYW1lIjoiVGVzdCIsImlkIjoiZDhlMzBmNGItZjg5My00ZGFlLWI2N2YtYWI0MDRkOWNhNzM2IiwibmJmIjoxNjc2Nzg3MjE4LCJleHAiOjE2ODQ0NzY4MTgsImlhdCI6MTY3Njc4NzIxOH0.DxxwcT-HwygXxp879NJJMCs2lqISBpLd0S04T1eUaHc";
    
    const commonHeaders = {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`
    }

    const projectsClient = axios.create({
      baseURL: 'http://localhost:5001/api/v1',
      headers: commonHeaders
    });

    const fetchProjects = async () => {
      const response = await projectsClient.get('/projects');
      console.log(response.data.data);
      return response.data.data;
    };
    
    const handleClick = async (e) => {
      e.preventDefault();
      const data = await fetchProjects();
      setProjectDetails(data);
    };
    
    const deleteProject = async (e, id) => {
      e.preventDefault();
      const response = await projectsClient.delete(`/projects/${id}`);
      console.log(response);
      const newProjects = await fetchProjects();
      setProjectDetails(newProjects);
    }

  //delete does not persist(?)
  const deleteRow = (id) => {
    const newProjects = [...projectDetails];
    const index = projectDetails.findIndex((projectDetails) => projectDetails.id === id);
    // splice to remove item at the index
    newProjects.splice(index, 1);
    setProjectDetails(newProjects);
  };

    // useEffect(async () => {
    //     const f = async () => {
    //         const data = await fetchProjects();
    //         setProjectDetails(data);
    //     };
    //    
    //    await f();
    //    
    // }, [projectDetails]);

    const [newFormData, setNewFormData] = useState({
        createdAt: ' ',
        updatedAt: ' ',
        projectName: ' ',
        description: ' ',
    })

  const openEditForm = () => {
    //  navigate to /Edit Form
    navigate("/Edit");
  };
  
  return (
    <div className="content">
      <Navbar />
      <div className="projectsDash" style={{ backgroundImage: `url(${BannerImage})` }}>
        <h2> Projects Dashboard</h2>
        <div className = "oneTimeButton">
          <button class="new"> Create Project  </button>
          <button className="return" onClick={(e) => handleClick(e)}> Fetch Projects</button>
        </div>

        <table className="table-container">
          <thead>
          <tr>
            <th> Created At </th>
            <th> Updated At </th>
            <th> Project Name </th>
            <th> Description </th>
            <th> Modifications </th>
          </tr>
          </thead>
          <tbody>
          {projectDetails.map((projectDetails) =>
            ( <tr key={projectDetails.id}>
                {/* properties come from the objects in the JSON file  */}
                <td> {projectDetails.createdAt} </td>
                <td> {projectDetails.updatedAt} </td>
                <td> {projectDetails.projectName} </td>
                <td> {projectDetails.description} </td>

                <td>
                  {/* onclick="functionname()"  */}
                  <button class="edit" onClick={openEditForm}> Edit  </button>
                  <button class="delete" onClick={(e)=> deleteProject(e, projectDetails.id)}> Delete  </button>
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
}

export default Projects;
