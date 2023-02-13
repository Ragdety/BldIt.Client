import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import BannerImage from "../assets/pic.png";
import "../styles/p_dashboard.css"
import { useState, Fragement } from "react";
import { FaCopy } from "react-icons/fa";
import data from "./mock-data.json";


const Projects = () => {

    const navigate = useNavigate();

    const navigateToJobs = () => {
        //  navigate to /jobs
        navigate("/Jobs");
    };

    const [projectDetails, setprojectDetails] = useState(data);
    const [newFormData, setNewFormData] = useState({
        createdAt: ' ',
        updatedAt: ' ',
        projectName: ' ',
        description: ' ',
    })

    return ( <
        div className = "content" >
        <
        Navbar / >
        <
        div className = "projectsDash"
        style = {
            { backgroundImage: `url(${BannerImage})` } } >
        <
        h2 className= "projectsHeader"> Projects Dashboard < /h2> <
        div className = "oneTimeButton" >
        <
        button class = "new" > Create Project < /button> <
        button class = "return" > Return to Jobs < /button> <
        /div>

        <
        table className = "table-container" >
        <
        thead >
        <
        tr >
        <
        th > Created At < /th> <
        th > Updated At < /th> <
        th > Project Name < /th> <
        th > Description < /th> <
        th > Modifications < /th> <
        /tr> <
        /thead> <
        tbody > {
            projectDetails.map((projectDetails) =>
                ( < tr > { /* properties come from the objects in the JSON file  */ } <
                    td > { projectDetails.createdAt } < /td> <
                    td > { projectDetails.updatedAt } < /td> <
                    td > { projectDetails.projectName } < /td> <
                    td > { projectDetails.description } < /td> <
                    td >
                    <
                    button class = "edit" > Edit < /button> <
                    button class = "delete" > Delete < /button> <
                    /td> <
                    /tr>
                )
            )
        } <
        /tbody>  <
        /table>


        <
        /div> <
        Footer / >
        <
        /div>
    );
};

export default Projects;
