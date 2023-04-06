import React from 'react';
import {useEffect, useState} from "react";
import useBldItPrivate from "../../hooks/useAxiosPrivate";
import routes from "../../api/bldit/routes";
import useApi from "../../hooks/useApi";
import BuildCard from "./BuildCard";

const BuildCardApi = ({projectId, jobName, buildNumber}) => {
  const [build, setBuild] = useState([]);

  // Api calls
  const bldItPrivate = useBldItPrivate();

  const getBuild = () => {
    return bldItPrivate.get(routes.builds.getBuild
      .replace("{projectId}", projectId)
      .replace("{jobName}", jobName)
      .replace("{buildNumber}", buildNumber));
  }

  const getBuildApi = useApi(getBuild);

  //UseEffect to call api when component is mounted
  useEffect(() => {
    getBuild()
      .then((res) => setBuild(res.data))
      .catch(e => console.log(e));
  }, []);
  
  return (
    <>
      {getBuildApi.loading && <p>Build is loading!</p>}
      {getBuildApi.error && <p>{getBuildApi.error}</p>}
      <BuildCard build={build}/>
    </>
  );
};

export default BuildCardApi;