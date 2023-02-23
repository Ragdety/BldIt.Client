import React from 'react';
import {Outlet} from 'react-router-dom';
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  
  useEffect(() => {
    const verifyRefresh = async () => {
      try {
        await refresh();
      }
      catch(error) {
        console.log("Error refreshing token", error.response.data);
      }
      finally {
        setIsLoading(false);
      }
    }
    
    //If there is no jwt token in auth, refresh it
    !auth.token ? verifyRefresh() : setIsLoading(false);
  }, []);
  
  return (
    <>
      {isLoading 
        ? <div>Loading...</div> 
        : <Outlet />}
    </>
  )
};

export default PersistLogin;