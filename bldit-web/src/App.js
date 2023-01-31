import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Projects";
import React from "react";
import "./App.css";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/Projects" element={<Projects/>} />
      </Routes>
    </div>
  )
}

export default App;
