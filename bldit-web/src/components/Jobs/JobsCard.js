import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Jobs from "../../pages/Jobs";

const JobsCard = ({ id }) => {
  const des =
    "This project will run a build on the master branch of the bldit-web repository. " +
    "This project will run a build on the master branch of the bldit-web repository." +
    "This project will run a build on the master branch of the bldit-web repository.";

  const Jobs = {
    id: id,
    name: "Projects Name",
    description: des,
    DateCreated: 7
  };

  return (
    <>
      <Card>
        <Typography variant="h5" className="mb-1 mt-1 p-5">
          {Jobs.name}
        </Typography>
        <CardBody className="h-12">
          <Typography className="mb-1 mt-1">{Jobs.description}</Typography>
        </CardBody>
        <CardFooter divider className="flex items-center py-3">
          <Typography variant="small" color="gray" className="flex gap-1 pl-4">
            Date Created: {Jobs.DateCreated}
          </Typography>
        </CardFooter>
      </Card>
    </>
  );
};

export default JobsCard;
