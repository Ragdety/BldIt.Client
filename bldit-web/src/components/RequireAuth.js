import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth.token
      ? <Outlet />
      : <Navigate to={`/login`} 
                  //state and replace are used to keep history and remember where we were headed
                  //So we can redirect the user once they login 
                  state={{from: location}} 
                  replace /> 
  );
}

export default RequireAuth;