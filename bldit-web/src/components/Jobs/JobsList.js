import React, {useState} from "react";
import { Typography } from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import routes from "../../api/bldit/routes";
import useBldItPrivate from "../../hooks/useAxiosPrivate";
import moment from "moment";
import Button from "@mui/material/Button";

const JobsList = ({ projectId }) => {
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

  const navigateToJob = (jobName) => {
    navigate(`/projects/${projectId}/jobs/${jobName}`);
  }

  function navToConfigure() {
    navigate(`/projects/${projectId}/jobs/jobConfig`);
  }
  
  const handleDeleteJob = async (jobName) => {
    // const res = await bldItPrivate.delete(routes.jobs.deleteJob
    //   .replace("{projectId}", projectId)
    //   .replace("{jobName}", jobName));
    //
    // console.log(res);
    //
    // setJobs(jobs.filter((job) => job.jobName !== jobName));
    
    console.log("Not implemented yet");
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
                    onClick={() => navigateToJob(job.name)}
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
                    <Button className="cursor-pointer no-underline" onClick={navToConfigure}>
                      Configure
                    </Button>
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white sm:rounded-lg"
                  >
                    <Button className="cursor-pointer no-underline" onClick={() => handleDeleteJob(job.name)}>
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

          <button className="new" onClick={navToConfigure}>Create Job</button>
        </>
      )}
    </>
  );
};

export default JobsList;
