import React, {useState} from "react";
import { Typography } from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import routes from "../../api/bldit/routes";
import useBldItPrivate from "../../hooks/useAxiosPrivate";
import moment from "moment";
import Button from "@mui/material/Button";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import jobConfig from "../../pages/JobConfig";
import job from "../../pages/Job";

const JobsList = ({ projectId }) => {
  const axiosPrivate = useAxiosPrivate();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  
  const bldItPrivate = useBldItPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      bldItPrivate.get(routes.jobs.getJobs
        .replace("{projectId}", projectId))
        .then((response) => {
          setJobs(response.data);
      }).catch((error) => {
        setError(true);
        setErrorContent(error.response.data.detail);
        console.log(error);
      });
    }

    loadJobs();
  }, []);

  const navToConfigure = async (e, name) => {
    // navigate(`/projects/${projectId}/jobs/jobConfig`);
    // e.preventDefault();
    navigate(`/projects/${projectId}/jobs/${name}/jobconfigedit/`);
  }

  function navToJobCreate() {
    navigate(`/projects/${projectId}/jobs/jobConfig`);
  }

  function navigateToJob(job) {
    // console.log(jobs);
    navigate(`/projects/${projectId}/jobs/${job.name}`);

  }
  
  const handleDeleteJob = async (e, id) => {
    e.preventDefault();
    //
    const url = window.location.href;
    const urlArray = url.split(/\/\/|\?|\/|\./);

    bldItPrivate.delete(routes.jobs.deleteJob
        .replace("{projectId}", urlArray[3])
        .replace("{jobName}", id.name))
        .then((response) => {
          window.location.reload();
        }).catch((error) => {
          console.log(error);
    });

    //
    // const response = await axiosPrivate.delete(`/projects/${urlArray[3]}/jobs/${id.name}`)
    //     .then(response => {
    //       window.location.reload();
    //     })
    //     .catch(error => {
    //       console.log(error.response.data);
    //     });
    // console.log(`/projects/${urlArray[3]}/jobs/${id.name}`);
    // window.location.reload();
  }

  return (
    <>
      {error ? (
        <Typography variant="h5" color="red">
          Error loading jobs: {errorContent}
        </Typography>
      ) : (
        <>
          {jobs.length ? (
            <table className="w-full p-0 text-sm text-left text-gray-500 border-1 shadow-md sm:rounded-lg">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {/*<th scope="col" className="px-6 py-3">*/}
                {/*  Status*/}
                {/*</th>*/}
                <th scope="col" className="px-6 py-3 sm:rounded-lg">
                  Jobs Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Build Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Creation Date
                </th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3 sm:rounded-lg"></th>
              </tr>
              </thead>
              <tbody>
              {jobs.map((job) => (
                <tr
                  id={job.id}
                  key={job.id}
                  className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {/*<th*/}
                  {/*  scope="row"*/}
                  {/*  className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"*/}
                  {/*>*/}
                  {/*  Success/Fail*/}
                  {/*</th>*/}
                  <th
                    scope="row"
                    className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white cursor-pointer sm:rounded-lg"
                    onClick={() => navigateToJob(job)}
                  >
                      {job.name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link className="cursor-pointer no-underline" to="/Build">
                      {job.lastBuildNumber}
                    </Link>
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {moment(job.createdAt).format('DD MMM, YYYY')}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {/*This should eventually go to job edit page, which would load the job's config (TODO: Implement)*/}
                    <Button className="cursor-pointer no-underline"
                            onClick={(e) => { navToConfigure(e, job.name)}}>
                      Configure
                    </Button>
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white sm:rounded-lg"
                  >
                    <Button className="cursor-pointer no-underline" onClick={(e) =>
                    { handleDeleteJob(e, job) }}>
                      Delete
                    </Button>
                  </th>
                </tr>
              ))}
              </tbody>
            </table>
          ) : (
            <div>
              <Typography color="white">No jobs yet</Typography>
            </div>
          )}

          <button className="buttonsDesign" onClick={navToJobCreate}>Create Job</button>

        </>
      )}
    </>
  );
};

export default JobsList;
