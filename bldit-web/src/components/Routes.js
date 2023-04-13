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
import CreateProject from "../pages/CreateProject";
import ForgotPassword from "../pages/ForgotPassword";
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
        <Route path="/forgotpassword" element={<ForgotPassword />} />



        {/*protected routes*/}
        <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId/jobs" element={<Jobs />} />
            <Route path="/createproject" element={<CreateProject />} />
            <Route path="/projects/:projectId/jobs/:jobName" element={<Job />} />
            <Route path="/projects/:projectId/jobs/:jobName/builds/:buildNumber/logs/:buildId" element={<BuildLogs />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;