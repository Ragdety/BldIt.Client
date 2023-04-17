import React, {useEffect, useState} from 'react';
import { Typography } from "@material-tailwind/react";
import useBldItPrivate from "../../hooks/useAxiosPrivate";
import routes from "../../api/bldit/routes";
import useApi from "../../hooks/useApi";
import BuildCard from "./BuildCard";
import {useNavigate} from "react-router-dom";

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
  
  const buildCardStyle = {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginBottom: "20px",
    cursor: "pointer",
  }

  const navigate = useNavigate();
  const navigateToLogs = (buildNumber, buildId) => {
    navigate(`/projects/${projectId}/jobs/${jobName}/builds/${buildNumber}/logs/${buildId}`);
  }

  return (
    <>
      {builds.length ? (
        <table className="w-full table-auto p-0 text-sm text-left text-gray-500 border-1 shadow-md sm:rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Builds
            </th>
          </tr>
          </thead>
          <tbody className="h-50 overflow-y-scroll w-full">
          {builds.map((build) => (
            <BuildCard build={build} 
                       key={build.id} 
                       style={buildCardStyle}
                       onClick={() => navigateToLogs(build.number, build.id)}
            />
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