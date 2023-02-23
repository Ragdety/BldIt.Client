import axios from 'axios'

const port = 5001

//Api Gateway link (Once implemented)
const BASE_URL = `http://localhost:${port}`;
const IDENTITY_URL = `http://localhost:5000/api/v1`;
const PROJECTS_URL = `http://localhost:5001/api/v1`;
const JOBS_URL = `http://localhost:5002/api/v1`;

const commonHeaders = {
    'Content-Type': 'application/json',
}

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: commonHeaders,
    withCredentials: true
});

const identityClient = axios.create({
    baseURL: IDENTITY_URL,
    headers: commonHeaders,
    withCredentials: true
});

const projectsClient = axios.create({
    baseURL: PROJECTS_URL,
    headers: commonHeaders,
    withCredentials: true
});

const jobsClient = axios.create({
    baseURL: JOBS_URL,
    headers: commonHeaders,
    withCredentials: true
});

export { 
    axiosPrivate,
    identityClient,
    projectsClient,
    jobsClient
}