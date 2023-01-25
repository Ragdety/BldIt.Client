<<<<<<< Updated upstream
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import SignIn from "./pages/Sign In";
import SignUp from "./pages/Sign Up";


function App() {
  return (
     <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/sign in" component={SignIn} />
        <Route path="/sign up" component={SignUp} />
      </Routes>
      <Footer/>
    </Router>
  );
=======
import Login from "./components/Login";
import React from "react";
import "./App.css";
import NavTest from "./components/NavTest";

function App() {
  return <Login />;
  // return <h1>test</h1>;
  // return <NavTest />;
>>>>>>> Stashed changes
}

export default App;