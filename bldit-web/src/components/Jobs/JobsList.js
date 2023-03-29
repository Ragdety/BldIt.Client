import React, {useState} from "react";
import { Typography } from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import routes from "../../api/bldit/routes";
import useBldItPrivate from "../../hooks/useAxiosPrivate";
import moment from "moment";

const JobsList = ({ projectId }) => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);
  
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
        console.log(error);
      });
    }

    loadJobs();
  }, []);

  const navigateToJob = (jobName) => {
    navigate(`/projects/${projectId}/jobs/${jobName}`);
  }

  return (
    <>
      {error ? (
        <Typography variant="h5" color="white">
          Error loading jobs. Please refresh the page
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
                <th scope="col" className="px-6 py-3">
                  Jobs Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Build Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Creation Date
                </th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3"></th>
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
                    className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
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
                    <Link className="cursor-pointer no-underline" to="/EditJob">
                      Edit
                    </Link>
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link className="cursor-pointer no-underline">
                      Delete
                    </Link>
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
        </>
      )}
    </>
  );
};

export default JobsList;
