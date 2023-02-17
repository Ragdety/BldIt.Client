import axios from 'axios'

const commonHeaders = {
    "Content-type": "application/json"
}

const identityClient = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: commonHeaders
});

const projectsClient = axios.create({
    baseURL: 'http://localhost:5001/api/v1',
    headers: commonHeaders
});

const jobsClient = axios.create({
    baseURL: 'http://localhost:5002/api/v1',
    headers: commonHeaders
});

export { 
    identityClient,
    projectsClient,
    jobsClient
}