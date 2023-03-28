import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import BannerImage from "../assets/pic.png";
import "../styles/p_dashboard.css"
import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Projects = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [projectDetails, setProjectDetails] = useState([]);

    const navigateToJobs = () => {
        //  navigate to /jobs
        navigate("/Jobs");
    };

    const fetchProjects = async () => {
      const response = await axiosPrivate.get('/projects');
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
      const response = await axiosPrivate.delete(`/projects/${id}`);
      console.log(response);
      const newProjects = await fetchProjects();
      setProjectDetails(newProjects);
    }

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

    const navigateToCreateProject = () => {
        //navigate to /forgotpassword
        navigate("/createproject");
    };


    const openEditForm = () => {
    //  navigate to /Edit Form
    navigate("/Edit");
  };
  
  return (
    <div className="content">
      <Navbar />
      <div className="projectsDash" style={{ backgroundImage: `url(${BannerImage})` }}>
        <h2 className="projectsTitle"> Projects Dashboard</h2>
        <div className = "oneTimeButton">
          <button className="new" onClick={navigateToCreateProject}> Create Project  </button>
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
                  <button className="edit" onClick={openEditForm}> Edit  </button>
                  <button className="delete" onClick={(e)=> deleteProject(e, projectDetails.id)}> Delete  </button>
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
