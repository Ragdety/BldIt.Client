import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import useBldItPrivate from "../../hooks/useAxiosPrivate";
import routes from "../../api/bldit/routes";
import useApi from "../../hooks/useApi";
import moment from "moment";

const ProjectCard = ({ id }) => {
  const [project, setProject] = useState({
    id: undefined,
    name: undefined,
    description: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  });

  // Api calls
  const bldItPrivate = useBldItPrivate();
  
  useEffect(() => {
    const loadProject = async () => {
      bldItPrivate.get(routes.projects.getProject
        .replace("{projectId}", id)).then((response) => {
          setProject(response.data);
        }).catch((error) => {
          console.log(error);
        });
    }

    loadProject();
  }, []);

  return (
    <>
      <Card>
        <Typography variant="h5" className="mb-1 mt-1 p-5">
          {project.projectName}
        </Typography>
        <CardBody className="h-12">
          <Typography className="mb-1 mt-1">{!project.description ? "No description provided" : project.description}</Typography>
        </CardBody>
        <CardFooter divider className="flex items-center py-3">
          <Typography variant="small" color="gray" className="flex gap-1 pl-4">
            Date Created: {moment(project.createdAt).format('DD MMM, YYYY')}
          </Typography>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProjectCard;
