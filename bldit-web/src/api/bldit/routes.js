export const routes = {
  identity: {
    login: "/identity/login",
    register: "/identity/register",
    refresh: "/identity/refresh",
    logout: "/identity/logout",
  },
  projects: {
    getProjects: "/projects",
    getProject: "/projects/:id",
    createProject: "/projects",
    updateProject: "/projects/:id",
    deleteProject: "/projects/:id",
  },
  jobs: {
    getJobs: "/jobs",
    getJob: "/jobs/:id",
    createJob: "/jobs",
    updateJob: "/jobs/:id",
    deleteJob: "/jobs/:id",
  },
  builds: {
    getBuilds: "/builds",
    getBuild: "/builds/:id",
    createBuild: "/builds",
    updateBuild: "/builds/:id",
    deleteBuild: "/builds/:id",
  },
}

export default routes;