import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Projects from "../pages/Projects";
import Jobs from "../pages/Jobs";
import Layout from "./Layout";
import RequireAuth from "./RequireAuth";
import NotFound from "./NotFound";
import PersistLogin from "./PersistLogin";
import Logout from "../pages/Logout";
import BuildLogs from "../pages/BuildLogs";
import Job from "../pages/Job";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*public routes*/}

        <Route element={<PersistLogin/>}>
          <Route path="/" element={<Home />} />
        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/logs" element={<BuildLogs />} />
        <Route path="/job" element={<Job />} />
        
        {/*protected routes*/}
        <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/jobs" element={<Jobs />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;