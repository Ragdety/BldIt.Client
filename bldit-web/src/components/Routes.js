import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Projects from "../pages/Projects";
import Edit from "../pages/Edit"
import Jobs from "../pages/Jobs";
import EditJob from "../pages/EditJob";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/EditJob" element={<EditJob />} />
    </Routes>
  );
}

export default AppRoutes;
