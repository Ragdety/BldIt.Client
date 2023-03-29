import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Typography} from "@material-tailwind/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useEffect, useState} from "react";

const ProjectsList = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState([]);

  const navigateToJobs = (projId) => {
    navigate(`/projects/${projId}/jobs`);
  };

  const fetchProjects = async () => {
    const response = await axiosPrivate.get('/projects');
    console.log(response.data.data);
    return response.data.data;
  };

  const deleteProject = async (e, id) => {
    e.preventDefault();
    const response = await axiosPrivate.delete(`/projects/${id}`);
    console.log(response);
    const newProjects = await fetchProjects();
    setProjectDetails(newProjects);
  }

  useEffect(() => {
    const f = async () => {
      const data = await fetchProjects();
      setProjectDetails(data);
    };

    f();

  }, []);

  const openEditForm = () => {
    //  navigate to /Edit Form
    navigate("/Edit");
  };
  
  return (
    <>
      {projectDetails.length ? (
        <table className="w-full p-0 text-sm text-left text-gray-500 border-1 shadow-md sm:rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Creation Date
            </th>
            <th scope="col" className="px-6 py-3">
              Modifications
            </th>
          </tr>
          </thead>
          <tbody>
          {projectDetails.map(project => (
            <tr
              id={project.id}
              key={project.id}
              className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                onClick={() => navigateToJobs(project.id)}
              >
                {project.projectName}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
              >
                <th className="cursor-pointer no-underline">
                  {project.description}
                </th>
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Link className="cursor-pointer no-underline" to="/Build">
                  {project.createdAt}
                </Link>
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
              >
                <button className="edit" onClick={openEditForm}>Edit</button>
                <button className="delete" onClick={(e)=> deleteProject(e, project.id)}>Delete</button>
              </th>
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <div>
          <Typography>No projects yet</Typography>
        </div>
      )}
    </>
  );
};

export default ProjectsList;