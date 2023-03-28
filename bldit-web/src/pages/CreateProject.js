import React from "react";
import { useState, useEffect } from "react";
import "../styles/Login.css";
import logo from "../assets/logo.png";

import { useNavigate } from "react-router-dom";

import Home from "./Home";
import useApi from "../hooks/useApi";
import Error from "../components/Error";

import axios from "axios";

function CreateProject()
{

    // States
    const [projectName, setProjectName] = useState(null);
    const [description, setDescription] = useState(null);
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState(false);

    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwianRpIjoiZGY5ODE0NTAtNjNjOC00YjYwLWI3MGEtZmRiNTFmYWIxYzMwIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwidXNlcm5hbWUiOiJUZXN0IiwiZmlyc3ROYW1lIjoiVGVzdCIsImxhc3ROYW1lIjoiVGVzdCIsImlkIjoiZDhlMzBmNGItZjg5My00ZGFlLWI2N2YtYWI0MDRkOWNhNzM2IiwibmJmIjoxNjc2Nzg3MjE4LCJleHAiOjE2ODQ0NzY4MTgsImlhdCI6MTY3Njc4NzIxOH0.DxxwcT-HwygXxp879NJJMCs2lqISBpLd0S04T1eUaHc";

    const commonHeaders = {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`
    }

    const projectsClient = axios.create({
        baseURL: 'http://localhost:5001/api/v1',
        headers: commonHeaders
    });

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
        // console.log(newProject);
        // await fetch('http://localhost:5000/api/v1/identity/register', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(newProject),
        //     })
        await projectsClient.post('/projects', {
            projectName: projectName,
            description: description
        })
            .then(response => {
                const data = response.data;
                console.log(data)

                setError(false);
                setErrors([]);

                navigate("/projects");
                return;
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