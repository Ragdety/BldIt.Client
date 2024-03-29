import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {button, Typography} from "@material-tailwind/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useEffect, useState} from "react";
import moment from "moment/moment";

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

  const projectDelete = async (e, id) => {
    e.preventDefault();
    // console.log(e);
    // console.log(id);

    await axiosPrivate.delete(`/projects/${id}`)
        .then(response => {
          window.location.reload();
        })
        .catch(error => {
          console.log(error.response.data);
        });
  }

  const deleteProject = async (e, id) => {
    e.preventDefault();
    const response = await axiosPrivate.delete(`/projects/${id}`);
    console.log(response);
    const newProjects = await fetchProjects();
    setProjectDetails(newProjects);
  }

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchProjects();
      setProjectDetails(data);
    };

    getProjects();

  }, []);

  const openEditForm = () => {
    //  navigate to /Edit Form
    navigate("/Edit");
  };

  return (
    <>
      {projectDetails.length ? (
        <table className="w-full p-0 text-sm text-center text-gray-500 border-1 shadow-md sm:rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr className="sticky top-0 bg-gray-50">
            <th scope="col" className="px-6 py-3 sm:rounded-lg">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Creation Date
            </th>
            <th scope="col" className="px-6 py-3 sm:rounded-lg">
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
                className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white cursor-pointer sm:rounded-lg"
                onClick={() => navigateToJobs(project.id)}
              >
                {project.projectName}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-light text-gray-900 whitespace-normal overflow-hidden dark:text-white text-left cursor-pointer no-underline"
              >
                {/*<th className="cursor-pointer no-underline">*/}
                  {project.description}
                {/*</th>*/}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
              >
                <Link className="cursor-pointer no-underline" to="/Build">
                  {moment(project.createdAt).format('DD MMM, YYYY')}
                  {/*{project.createdAt}*/}
                </Link>
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white sm:rounded-lg"
              >
                <button className="buttonsDesign" onClick={() => { window.location.href = `/EditProject/${project.id}` }}>Edit</button>
                <button className="buttonsDesign" onClick={(e) => { projectDelete(e, project.id) }} >Delete</button>
              </th>
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <div>
          <Typography color="white" variant="h4">No projects yet</Typography>
        </div>
      )}
    </>
  );
};

export default ProjectsList;