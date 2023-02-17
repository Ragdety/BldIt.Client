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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*public routes*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/404" element={<NotFound />} />
        
        {/*protected routes*/}
        <Route element={<RequireAuth />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/jobs" element={<Jobs />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
