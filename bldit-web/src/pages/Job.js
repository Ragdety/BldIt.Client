import React, {useEffect} from 'react';
import JobSideNav from "../components/Jobs/JobSideNav";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/Jobs/JobCard";
import BuildList from "../components/Builds/BuildList";
import {useParams} from "react-router-dom";
import SideBar from "../components/SideBar";

const Job = () => {
    const {projectId, jobName} = useParams();

    const footerStyleOverride = {
        position: "relative",
        bottom: "0",
        width: "100%",
    };

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
            <div>
                <div style={{width:"10%"}}>
                    <SideBar/>
                </div>
                <div className="CreateProjectDiv" style={{width:"90%", float:"right"}}>
                    <div className="ProjectForm" style={{paddingTop:"3%", textAlign:'left'}}>
                        <JobCard projectId={projectId} jobName={jobName}/>
                    </div>
                    <div className="ProjectTable">
                        <BuildList projectId={projectId} jobName={jobName}/>
                    </div>
                </div>
            </div>
            {/*<Navbar/>*/}
            {/*<JobSideNav projectId={projectId} jobName={jobName}/>*/}
            {/*<div className="p-4 sm:ml-64">*/}
            {/*  <div className="pb-6">*/}
            {/*    <JobCard projectId={projectId} jobName={jobName}/>*/}
            {/*  </div>*/}
            {/*  <div>*/}
            {/*    <BuildList projectId={projectId} jobName={jobName}/>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<Footer styles={footerStyleOverride}/>*/}
        </>
    );
};

export default Job;