import React from "react";
import { useState, useEffect } from "react";
import "../styles/Login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function CreateProject() {
    const axiosPrivate = useAxiosPrivate();
    // States
    const [projectName, setProjectName] = useState(null);
    const [description, setDescription] = useState(null);
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;

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
                // console.log(error.response.data.detail);
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
            <img src={logo} className="logo" id="logo" alt="Built it logo" />
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

                <div className="input-container">
                    <input type="submit" value="Create Project" />
                </div>
            </form>
            {/*We render the errors here (if any)*/}
            {error && <Error msg={error}/>}
        </div>
    );

    return (
        <div className="content">
            <div className="login-form">
                {renderForm}
            </div>
        </div>
    );
}

export default CreateProject;