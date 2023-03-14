import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const JobCard = ({id}) => {
  const des = "This job will run a build on the master branch of the bldit-web repository. " +
    "This job will run a build on the master branch of the bldit-web repository." +
    "This job will run a build on the master branch of the bldit-web repository.";
  
  const job = {
    id: id,
    name: "SomeJob",
    description: des,
    jobType: "Freestyle",
    lastBuild: 2
  };
  
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
          <Typography variant="small" className="pr-4">Job Type: {job.jobType}</Typography>
          <Typography variant="small" color="gray" className="flex gap-1 pl-4">
            Last Build: {job.lastBuild}
          </Typography>
        </CardFooter>
      </Card>
    </>
  );
}

export default JobCard;