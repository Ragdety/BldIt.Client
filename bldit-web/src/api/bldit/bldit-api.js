import axios from 'axios'

const port = 4000;
const BLDIT_URL = `http://localhost:${port}/api/v1`;
const IDENTITY_URL = `http://localhost:5000/api/v1`;

const commonHeaders = {
    'Content-Type': 'application/json',
}

const blditClient = axios.create({
    baseURL: BLDIT_URL,
    headers: commonHeaders
});

const blditClientPrivate = axios.create({
    baseURL: BLDIT_URL,
    headers: commonHeaders,
    withCredentials: true
});

const identityClient = axios.create({
    baseURL: IDENTITY_URL,
    headers: commonHeaders,
    withCredentials: true
});

export { 
    blditClientPrivate,
    identityClient,
    blditClient,
    githubClient
}