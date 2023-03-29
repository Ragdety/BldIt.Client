import React from 'react';
import { useEffect } from "react";
import { blditClientPrivate } from "../api/bldit/bldit-api";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useBldItPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = blditClientPrivate.interceptors.request.use(
      config => {
        //Append the auth token to the request header for all axios requests
        if(!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth.token}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    const responseIntercept = blditClientPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error.config;

        // If the error is 401 and we haven't already tried to refresh the token
        if(error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          //Updates the previous request with the new token auth header
          prevRequest.headers['Authorization'] = `Bearer ${newToken}`;

          //Re-try the previous request
          return blditClientPrivate(prevRequest);

          //Before:
          //Redirect to Login page (for now)
          //window.location.href = "/login";
          //Reject the promise for now since we're redirecting to login
          // return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      //Remove interceptors
      blditClientPrivate.interceptors.request.eject(requestIntercept);
      blditClientPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return blditClientPrivate;
};

export default useBldItPrivate;