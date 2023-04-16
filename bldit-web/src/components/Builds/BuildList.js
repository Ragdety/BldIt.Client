import React, {useEffect, useState} from 'react';
import { Typography } from "@material-tailwind/react";
import {Link} from "react-router-dom";
import useBldItPrivate from "../../hooks/useAxiosPrivate";
import routes from "../../api/bldit/routes";
import useApi from "../../hooks/useApi";
import moment from "moment";

const BuildList = ({projectId, jobName}) => {
  const [builds, setBuilds] = useState([]);

  // Api calls
  const bldItPrivate = useBldItPrivate();

  const getBuilds = (projId, jobName) => {
    return bldItPrivate.get(routes.builds.getBuilds
      .replace("{projectId}", projId)
      .replace("{jobName}", jobName));
  }
  const getBuildsApi = useApi(getBuilds);

  //UseEffect to call api when component is mounted
  useEffect(() => {
    const loadBuilds = async () => {
      await getBuildsApi.request(projectId, jobName);
    }

    loadBuilds();
  }, []);

  //UseEffect to set the builds
  useEffect(() => {
    const handleGetBuilds = () => {
      if (getBuildsApi.success === true) {
        setBuilds(getBuildsApi.data);
      }

      console.log(getBuildsApi.data);
    }

    handleGetBuilds();
  }, [getBuildsApi.data]);

  return (
    <>
      {builds.length ? (
        <table className="w-full table-auto p-0 text-sm text-left text-gray-500 border-1 shadow-md sm:rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Build Number
            </th>
            <th scope="col" className="px-6 py-3">
              Result
            </th>
            <th scope="col" className="px-6 py-3">
              Date Started
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
          </thead>
          <tbody className="h-50 overflow-y-scroll w-full">
          {builds.map((build) => (
            <tr id={build.id}
                className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                {build.number}
              </th>
              <th scope="row" className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                {build.result}
              </th>
              <th scope="row" className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                {moment(build.createdAt).format('DD MMM, YYYY')}
              </th>
              <th scope="row" className="px-6 py-4 font-light text-gray-900 whitespace-nowrap dark:text-white">
                <Link className="cursor-pointer no-underline" to={`/logs/${build.id}`}>
                  Logs
                </Link>
              </th>
            </tr>
          ))}
          </tbody>
        </table>
      ) : (
        <div>
          <Typography color="white">
            No builds yet
          </Typography>
        </div>
      )}
    </>
  )
};

export default BuildList;