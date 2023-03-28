import { blditClientPrivate } from "../api/bldit/bldit-api";
import routes from "../api/bldit/routes";

//Using blditClientPrivate so that the Authorization header is set
const getJob = (projectId, jobName) => {
  return blditClientPrivate.get(routes.jobs.getJob
    .replace("{projectId}", projectId)
    .replace("{jobName}", jobName));
}

export default {
  getJob
}