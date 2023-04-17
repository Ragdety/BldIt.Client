const baseRoutes = {
  identity: "/identity",
  projects: "/projects",
  jobs: "/projects/{projectId}/jobs",
  jobConfigs: "/projects/{projectId}/jobs/{jobName}/configs",
  builds: "/projects/{projectId}/jobs/{jobName}/builds",
  buildConfigs: "/projects/{projectId}/jobs/{jobName}/buildConfigs",
  githubCredentials: "/github/credentials",
  githubRepos: "/github/credentials/{credentialId}/repositories"
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
    createJobConfig: `${baseRoutes.jobConfigs}`,
    getJobConfig: `${baseRoutes.jobConfigs}/{configId}`,
    scm: {
      getSCM: `${baseRoutes.jobConfigs}/{configId}/scm/{scmConfigId}`,
      updateSCM: `${baseRoutes.jobConfigs}/{configId}/scm/{scmConfigId}`,
      createSCM: `${baseRoutes.jobConfigs}/{configId}/scm`,
    }
  },
  builds: {
    buildJob: `${baseRoutes.jobs}/{jobName}/build`,
    getBuilds: `${baseRoutes.builds}`,
    getBuild: `${baseRoutes.builds}/{buildNumber}`,
    getBuildLog: `${baseRoutes.builds}/{buildNumber}/log`,
  },
  buildConfigs: {
    createBuildConfig: `${baseRoutes.buildConfigs}`,
    getBuildConfig: `${baseRoutes.buildConfigs}/{configId}`,
    updateBuildConfig: `${baseRoutes.buildConfigs}/{configId}`,
    steps: {
      getBuildSteps: `${baseRoutes.buildConfigs}/{configId}/steps`,
      getBuildStep: `${baseRoutes.buildConfigs}/{configId}/steps/{number}`,
      deleteBuildStep: `${baseRoutes.buildConfigs}/{configId}/steps/{number}`,
    }
  },
  github: {
    credentials: {
      getGitHubCredentials: `${baseRoutes.githubCredentials}`,
      createGitHubCredential: `${baseRoutes.githubCredentials}`,
      getGitHubCredential: `${baseRoutes.githubCredentials}/{credentialId}`,
      deleteGitHubCredential: `${baseRoutes.githubCredentials}/{credentialId}`,
    },
    repos: {
      getGitHubRepos: `${baseRoutes.githubRepos}`,
    }
  },
}

export default routes;