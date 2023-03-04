import React from 'react';
import {identityClient} from "../api/bldit/bldit-api";
import useAuth from "../hooks/useAuth";
import routes from "../api/bldit/routes";

const useLogout = () => {
  const { setAuth } = useAuth();

  return async () => {
    setAuth({});
    try {
      await identityClient.get(routes.identity.logout, {
        withCredentials: true
      });
    } catch (error) {
      console.log("Error logging out", error.response.data);
    }
  };
};

export default useLogout;