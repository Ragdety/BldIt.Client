const baseRoutes = {
  identity: "/identity",
  projects: "/projects",
  jobs: "/projects/{projectId}/jobs",
  jobConfigs: "/projects/{projectId}/jobs/{jobName}/configs",
  builds: "/projects/{projectId}/jobs/{jobName}/builds",
  buildConfigs: "/projects/{projectId}/jobs/{jobName}/builds/{buildNumber}/configs",
}

export const routes = {
  identity: {
    login: `${baseRoutes.identity}/login`,
    register: `${baseRoutes.identity}/register`,
    refresh: `${baseRoutes.identity}/refresh`,
    logout: `${baseRoutes.identity}/logout`,
  },
  projects: {
    getProjects: `${baseRoutes.projects}`,
    getProject: `${baseRoutes.projects}/{projectId}`,
    createProject: `${baseRoutes.projects}`,
    updateProject: `${baseRoutes.projects}/{projectId}`,
    deleteProject: `${baseRoutes.projects}/{projectId}`,
  },
  jobs: {
    getJobs: `${baseRoutes.jobs}`,
    getJob: `${baseRoutes.jobs}/{jobName}`,
    createJob: `${baseRoutes.jobs}`,
    updateJob: `${baseRoutes.jobs}/{jobName}`,
    deleteJob: `${baseRoutes.jobs}/{jobName}`,
  },
  jobConfigs: {

  },
  builds: {
    buildJob: `${baseRoutes.jobs}/{jobName}/build`,
    getBuilds: `${baseRoutes.builds}`,
    getBuild: `${baseRoutes.builds}/{buildNumber}`,
    getBuildLog: `${baseRoutes.builds}/{buildNumber}/log`,
  },
  buildConfigs: {

  },
}

export default routes;