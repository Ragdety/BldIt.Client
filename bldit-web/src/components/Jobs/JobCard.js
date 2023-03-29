import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import useApi from "../../hooks/useApi";
import useBldItPrivate from "../../hooks/useAxiosPrivate";
import routes from "../../api/bldit/routes";

const JobCard = ({projectId, jobName}) => {
  const [job, setJob] = useState({
    name: undefined,
    description: undefined,
    type: undefined,
    lastBuildNumber: undefined
  });

  // Api calls
  const bldItPrivate = useBldItPrivate();
  const getJob = (projId, name) => {
    return bldItPrivate.get(routes.jobs.getJob
      .replace("{projectId}", projId)
      .replace("{jobName}", name));
  }
  const getJobApi = useApi(getJob);

  //UseEffect to call api when component is mounted
  useEffect(() => {
    const loadJob = async () => {
      await getJobApi.request(projectId, jobName);
    }

    loadJob();
  }, []);

  //UseEffect to set the job data
  useEffect(() => {
    const handleGetJob = () => {
      if (getJobApi.success === true) {
        setJob(getJobApi.data);
        return;
      }

      //TODO: Error handling here

    }

    handleGetJob();

  }, [getJobApi.data]);

  return (
    <>
      <Card>
        <Typography variant="h5" className="mb-1 mt-1 p-5">
          {job.name}
        </Typography>
        <CardBody className="h-12">
          <Typography className="mb-1 mt-1">
            {job.description}
          </Typography>
        </CardBody>
        <CardFooter divider className="flex items-center py-3">
          <Typography variant="small" className="pr-4">Job Type: {job.type}</Typography>
          <Typography variant="small" color="gray" className="flex gap-1 pl-4">
            Last Build: {job.lastBuildNumber}
          </Typography>
        </CardFooter>
      </Card>
    </>
  );
}

export default JobCard;