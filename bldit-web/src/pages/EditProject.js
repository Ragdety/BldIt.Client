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
import SideBar from "../components/SideBar";
import "../styles/ProjectsRedesign.css";
import routes from "../api/bldit/routes";
import useBldItPrivate from "../hooks/useAxiosPrivate";
// import useBldItPrivate from "../../hooks/useAxiosPrivate";


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

    // Api calls
    const bldItPrivate = useBldItPrivate();

    useEffect(() => {
        const loadProject = async () => {
            const url = window.location.href;
            const urlArray = url.split(/\/\/|\?|\/|\./);
            console.log(urlArray);
            bldItPrivate.get(routes.projects.getProject
                .replace("{projectId}", urlArray[3])).then((response) => {
                setProjectName(response.data.projectName);
                setDescription(response.data.description);
            }).catch((error) => {
                console.log(error);
            });
        }

        loadProject();
    }, []);

    const projectCreation = async () => {
        const newProject = {
            projectName,
            description,
        };

        const url = window.location.href;
        const urlArray = url.split(/\/\/|\?|\/|\./);

        await axiosPrivate.put(`/projects/${urlArray[3]}`, {
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
        <div className="CreateProjectForm">
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
                        maxLength="120"
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
                        maxLength="120"
                    />
                </div>
                <button className="buttonsDesign" type={"submit"}>Edit Project</button>
                {/*<div className="edit">*/}
                {/*    <input type="submit" value="Create Project"/>*/}
                {/*</div>*/}
            </form>
            {/*We render the errors here (if any)*/}
            {error && <Error msg={error}/>}
        </div>
    );

    // Setting up the background image and height and width
    useEffect(() => {
        document.body.classList.add("mainContent");

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove("mainContent");
        };
    }, []);

    return (
        <>
            <div className="mainContent">
                {/*SideBar*/}
                <div style={{width: "10%", height: "100%", display: "flex"}}>
                    <SideBar/>
                </div>

                {/*Page Title*/}
                <div style={{width: "90%"}} className="pageTitle">
                    <h1>Edit Project</h1>
                    {/*<button onClick={navigateToCreateProject}>Create Project</button>*/}
                </div>

                {/*Create Project Part*/}
                <div className="CreateProjectDiv">
                    <div className="ProjectForm">
                        {renderForm}
                    </div>
                </div>
            </div>
            {/*<Navbar/>*/}
            {/*<div className="content">*/}
            {/*    <div className="home" style={{backgroundImage: `url(${BannerImage})`}}>*/}
            {/*        <div style={{backgroundColor:"white", padding:"2rem",*/}
            {/*            borderRadius:"0.5rem",*/}
            {/*            width:"50%", position:"absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)"}}>*/}
            {/*            {renderForm}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<Footer/>*/}
        </>

        // <div className="content">
        //     <div className="login-form">
        //         {renderForm}
        //     </div>
        // </div>
    );
}

export default CreateProject;