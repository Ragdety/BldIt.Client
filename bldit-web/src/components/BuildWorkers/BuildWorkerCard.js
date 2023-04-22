import React, {useEffect, useState} from 'react';
import {Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import routes from "../../api/bldit/routes";

const BuildWorkerCard = ({workerNumber, buildId, isWorking, buildNumber, jobId}) => {
  const axiosPrivate = useAxiosPrivate();
  
  const [jobName, setJobName] = useState("");
  
  useEffect(() => {
    const fetchJobAndBuild = () => {
      //Fetch the build and job from API only if it's working
      if (isWorking) {
        axiosPrivate.get(routes.getJobById.replace("{jobId}", jobId))
          .then((response) => {
            console.log(response.data)
            setJobName(response.data.name);
          })
          .catch((error) => {
              console.log(error);
            }
          );
      }
    }
    
    fetchJobAndBuild();
  }, [isWorking]);

  const navigate = useNavigate();

  const navigateToLogs = () => {
    navigate()
  }

  return (
    <>
      {isWorking ? (
        <>
          {/*sx={{ maxWidth: 275 }}*/}
          <Card style={{width:"240px"}}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                {jobName}
              </Typography>
              <Typography variant="body2" color="black">
                Build: {buildNumber}
              </Typography>
            </CardContent>
            {/*<CardActions>*/}
            {/*  <Button size="small" onClick={navigateToLogs}>Logs</Button>*/}
            {/*</CardActions>*/}
          </Card>
        </>
      ) : (
        <>
          <Card style={{width:"240px"}}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {workerNumber + 1} - Available
              </Typography>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default BuildWorkerCard;