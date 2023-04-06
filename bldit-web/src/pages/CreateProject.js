import React from "react";
import {useState, useEffect} from "react";
// import "../styles/Login.css";
import "../styles/Home.css";
import logo from "../assets/logo.png";
import {useNavigate} from "react-router-dom";
import Error from "../components/Error";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Navbar from "../components/Navbar";
import BannerImage from "../assets/pic.png";
import ProjectsList from "../components/Projects/ProjectsList";
import Footer from "../components/Footer";

function CreateProject() {
    const axiosPrivate = useAxiosPrivate();
    // States
    const [projectName, setProjectName] = useState(null);
    const [description, setDescription] = useState(null);
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState(false);

    const handleInputChange = (e) => {
        const {id, value} = e.target;

        switch (id) {
            case "projectName":
                setProjectName(value);
                break;
            case "description":
                setDescription(value);
                break;
            default:
                break;
        }
    };

    const projectCreation = async () => {
        const newProject = {
            projectName,
            description,
        };

        await axiosPrivate.post('/projects', {
            projectName: projectName,
            description: description
        })
            .then(response => {
                const data = response.data;
                console.log(data)

                setError(false);
                setErrors([]);

                navigate("/projects");
            })
            .catch(error => {
                console.log(error.response.data);
                setError(error.response.data.detail);
                // setError(true);
            });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await projectCreation();
    };

    const navigate = useNavigate();

    const renderForm = (
        <div className="form">
            {/*<img src={logo} className="logo" id="logo" alt="Built it logo"/>*/}
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        className="form__input"
                        type="text"
                        value={projectName}
                        onChange={(e) => handleInputChange(e)}
                        id="projectName"
                        placeholder="Project Name"
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        name=""
                        id="description"
                        value={description}
                        className="form__input"
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Description"
                    />
                </div>
                <button className="edit" type={"submit"}>Create Project</button>
                {/*<div className="edit">*/}
                {/*    <input type="submit" value="Create Project"/>*/}
                {/*</div>*/}
            </form>
            {/*We render the errors here (if any)*/}
            {error && <Error msg={error}/>}
        </div>
    );

    return (
        <>
            <Navbar/>
            <div className="content">
                <div className="home" style={{backgroundImage: `url(${BannerImage})`}}>
                    <div style={{backgroundColor:"white", padding:"2rem",
                        borderRadius:"0.5rem",
                        width:"50%", position:"absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)"}}>
                        {renderForm}
                    </div>
                </div>
            </div>
            <Footer/>
        </>

        // <div className="content">
        //     <div className="login-form">
        //         {renderForm}
        //     </div>
        // </div>
    );
}

export default CreateProject;