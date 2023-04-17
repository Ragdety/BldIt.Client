import React from 'react';
import {identityClient} from "../api/bldit/bldit-api";
import useAuth from "./useAuth";
import routes from "../api/bldit/routes";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  return async () => {
    const response = await identityClient.get(routes.identity.refresh, {
      withCredentials: true
    });

    setAuth(prev => {
      //console.log(JSON.stringify(prev));
      //console.log(response.data.token);
      return {...prev, token: response.data.token, refreshToken: response.data.refreshToken}
    });
    return response.data.token;
  };
};

export default useRefreshToken;