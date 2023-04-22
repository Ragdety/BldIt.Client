import React from "react";
import BannerImage from "../assets/pic.png";
import "../styles/Home.css";
import {useState} from "react";
import "../styles/jobconfig.css";
import General from "./General";
import SCMConfig from "./SCMConfig";
import ConfigBuild from "./ConfigBuild";
import PostBuild from "./PostBuild";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobConfigStepper from "../components/Jobs/JobConfigStepper";
import SideBar from "../components/SideBar";
import ProjectsList from "../components/Projects/ProjectsList";
import {useEffect} from "react";
import routes from "../api/bldit/routes";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AceEditor from "react-ace";
import Error from "../components/Error";


const JobConfig = () => {
    const {projectId} = useParams();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [jobName, setJobName] = useState(null);
    const [description, setDescription] = useState(null);
    const [errors, setErrors] = useState([]);
    const [error, setError] = useState(false);

    const handleInputChange = (e) => {
        const {id, value} = e.target;

        switch (id) {
            case "jobName":
                setJobName(value);
                break;
            case "description":
                setDescription(value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const loadJobConfig = async () => {
            const url = window.location.href;
            const urlArray = url.split(/\/\/|\?|\/|\./);

            // console.log(urlArray);

            await axiosPrivate.get(routes.jobs.getJob
                .replace("{projectId}", urlArray[3])
                .replace("{jobName}", urlArray[5]))
                .then((response) => {
                    console.log(response);
                    setJobName(response.data.name);
                    setDescription(response.data.description);
                })
                .catch((error) => {
                    console.log("Job Load failed");
                    console.log(error);
                    // errors.push(error.response.data.detail);
                    // return errors;
                });
        }

        loadJobConfig();
    }, []);

    const jobEdit = async () => {
        const editJob = {
            jobName,
            description,
        };

        const url = window.location.href;
        const urlArray = url.split(/\/\/|\?|\/|\./);

        await axiosPrivate.put(`/projects/${urlArray[3]}/jobs/${urlArray[5]}`, {
            JobName: jobName,
            JobDescription: description
        })
            .then(response => {
                const data = response.data;
                console.log(data)

                setError(false);
                setErrors([]);

                navigate(`/projects/${urlArray[3]}/jobs`);
            })
            .catch(error => {
                console.log(error.response.data);
                setError(error.response.data.detail);
                // setError(true);
            });
    };



    // Setting up the background image and height and width
    useEffect(() => {
        document.body.classList.add("mainContent");

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove("mainContent");
        };
    }, []);

    const navigateToProjects = () => {
        //  navigate to /projects
        navigate("/projects");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await jobEdit();
    };

    const renderForm = (
        <div className="CreateProjectForm">
            {/*<img src={logo} className="logo" id="logo" alt="Built it logo"/>*/}
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        className="form__input"
                        type="text"
                        value={jobName}
                        onChange={(e) => handleInputChange(e)}
                        id="jobName"
                        placeholder="Job Name"
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
                <button className="buttonsDesign" type={"submit"}>Edit Job</button>
                {/*<div className="edit">*/}
                {/*    <input type="submit" value="Create Project"/>*/}
                {/*</div>*/}
            </form>
            {/*We render the errors here (if any)*/}
            {/*{error && <Error msg={error}/>}*/}
        </div>
    );

    return (

        <div className="mainContent">
            {/*SideBar*/}
            <div style={{width: "10%", height: "100%", display: "flex"}}>
                <SideBar/>
            </div>

            {/*Page Title*/}
            <div style={{width: "90%"}} className="pageTitle">
                <h1>Jobs Information Edit</h1>
                {/*<button onClick={navigateToCreateProject}>Create Project</button>*/}
            </div>

            Projects Table
            <div className="ProjectTableDiv">
                <div className="ProjectForm">
                    {renderForm}
                </div>
            </div>
        </div>
        // <div className="form">
        //   <Navbar/>
        //   <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
        //     <div className="header">
        //       <h1 className="jc-title"> Job Configuration Build </h1>
        //     </div>
        //     <div className="form-step">
        //       <JobConfigStepper projectId={projectId}/>
        //     </div>
        //   </div>
        //   <Footer/>
        // </div>
    );
}

export default JobConfig;