import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const JobCard = ({ name, description, jobType, lastBuild }) => {
  return (
    <>
      <Card>
          <Typography variant="h5" className="mb-1 mt-1 p-5">
            {name}
          </Typography>
        <CardBody className="h-12">
          <Typography className="mb-1 mt-1">
            {description}
          </Typography>
        </CardBody>
        <CardFooter divider className="flex items-center py-3">
          <Typography variant="small" className="pr-4">Job Type: {jobType}</Typography>
          <Typography variant="small" color="gray" className="flex gap-1 pl-4">
            Last Build: {lastBuild}
          </Typography>
        </CardFooter>
      </Card>
    </>
  );
}

export default JobCard;