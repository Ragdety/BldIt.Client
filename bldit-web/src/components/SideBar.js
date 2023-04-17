import React, {useState, useEffect} from "react";
import "../styles/SideBar.css";
import Logo from "../assets/AM-logo.jpeg";
import {Link} from "react-router-dom";
import {UilLightbulb, UilPen, UilSetting, UilTrashAlt} from "@iconscout/react-unicons";
import useBldItPrivate from "../hooks/useAxiosPrivate";
import routes from "../api/bldit/routes";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import job from "../pages/Job";
import {Alert} from "@material-tailwind/react";

function SideBar({styles, projectId, jobName}) {

    const [currentPage, setCurrentPage] = useState('');

    useEffect(() => {
        setCurrentPage(window.location.pathname.split('/').pop());

        const links = document.querySelectorAll('nav a');
        for (let i = 0; i < links.length; i++) {
            const linkPage = links[i].dataset.page;
            if (currentPage.toLowerCase() === linkPage) {
                links[i].classList.add('active');
            } else {
                links[i].classList.remove('active');
            }
        }
    }, [currentPage]);

    const [openLinks, setOpenLinks] = useState(false);
    const [isNotLoggedIn, setIsNotLoggedIn] = useState(true);

    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {
        const verifyRefresh = async () => {
            try {
                await refresh();
                setIsNotLoggedIn(false);
            }
            catch(error) {
                setIsNotLoggedIn(true);
            }
        }

        //If there is no jwt token in auth, refresh it
        !auth.token ? verifyRefresh() : setIsNotLoggedIn(false);

        if(!auth) {
            setIsNotLoggedIn(true);
        }
    }, []);

    // Jobs Controls
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showFailedAlert, setShowFailedAlert] = useState(false);

    const buildURL = "http://localhost:5003/api/v1";

    // Api calls
    const bldItPrivate = useBldItPrivate();
    const buildJob = (projId, name) => {
        return bldItPrivate.post(routes.builds.buildJob
            .replace("{projectId}", projId)
            .replace("{jobName}", name));
    }

    const startBuild = async (e, projectId, jobName) => {
        buildJob(projectId, jobName)
            .then((response) => {
                console.log(response);
                setShowSuccessAlert(true);
            })
            .catch((error) => {
                console.log(error);
                setShowFailedAlert(true);
            });
    }

    useEffect(() => {
        //TODO: Fix bugs with the alert when running 2+ builds
        const handleCloseSuccessAlert = () => {
            if (showSuccessAlert) {
                //TODO: Find a better way to do this timeout...
                setTimeout(() => {
                    setShowSuccessAlert(false);
                }, 4000);
            }
        }
        handleCloseSuccessAlert();
    }, [showSuccessAlert]);

    useEffect(() => {
        const handleCloseFailedAlert = () => {
            if (showFailedAlert) {
                setTimeout(() => {
                    setShowFailedAlert(false);
                }, 4000);
            }
        }
        handleCloseFailedAlert();
    }, [showFailedAlert]);

    const deleteJob = (e) => {
        e.preventDefault();
        //TODO: Add a confirmation dialog
        //TODO: Redirect to Jobs page
    }

    return (
        // <div>
        <nav>
            {/*<div style={{height:"90%"}}>*/}
            <ul className="sidebar_ul">
                <li style={{textAlign: "center"}}><img alt="logo" src={Logo}
                                                       style={{
                                                           maxWidth: "50%",
                                                           paddingTop: "10%",
                                                           paddingBottom: "2%"
                                                       }}/>
                </li>
                {window.location.pathname.includes('/') && isNotLoggedIn && (
                    <li className="sidebar_li"><a href="/SignUp">Sign Up</a></li>
                )}
                {window.location.pathname.includes('/') && isNotLoggedIn && (
                    <li className="sidebar_li"><a href="/Login">Login</a></li>
                )}
                {!isNotLoggedIn && (<li className="sidebar_li"><a data-page="" href="/">Home</a></li>)}
                {!isNotLoggedIn && (<li className="sidebar_li"><a href="/Projects" data-page="projects">Projects</a></li>)}
                {!isNotLoggedIn && (<li className="sidebar_li"><a href="/CreateProject" data-page="createproject">Create Project</a>
                </li>)}
                {!isNotLoggedIn && (<li className="sidebar_li"><a href="/Logout">Logout</a></li>)}
                {window.location.pathname.includes(`/jobs/${jobName}`) && !isNotLoggedIn &&(
                    <hr/>
                )}
                {window.location.pathname.includes(`/jobs/${jobName}`) && !isNotLoggedIn &&(
                    <li className="sidebar_li">
                        <span>Job Controls</span>
                    </li>
                )}
                {window.location.pathname.includes(`/jobs/${jobName}`) && !isNotLoggedIn &&(
                    <li className="sidebar_li">
                        <Link to="/JobConfig">
                            Configure
                        </Link>
                    </li>
                )}
                {window.location.pathname.includes(`/jobs/${jobName}`) && !isNotLoggedIn &&(
                    <li className="sidebar_li">
                        <Link onClick={(e) => startBuild(e, projectId, jobName)}>
                            Build
                        </Link>
                    </li>
                )}
                {window.location.pathname.includes(`/jobs/${jobName}`) && !isNotLoggedIn &&(
                    <li className="sidebar_li">
                        <Link to="/EditJob">
                            Edit Job
                        </Link>
                    </li>
                )}
                {window.location.pathname.includes(`/jobs/${jobName}`) && !isNotLoggedIn &&(
                    <li className="sidebar_li">
                        <span>Delete Job</span>
                    </li>
                )}
                {window.location.pathname.includes(`/jobs/${jobName}`) && !isNotLoggedIn &&(
                  <>
                      <Alert color="green"
                             show={showSuccessAlert}
                             dismissible={{
                                 onClose: () => setShowSuccessAlert(false),
                             }}
                             className="w-30 cursor-pointer">
                          Build started
                      </Alert>
                      <Alert color="red"
                             show={showFailedAlert}
                             dismissible={{
                                 onClose: () => setShowFailedAlert(false),
                             }}
                             className="w-30 cursor-pointer">
                          Build failed to start
                      </Alert>
                  </>
                )}
                <div style={{height: "10%", width: "100%", bottom: 0, position: "absolute", textAlign: "center"}}>
                    <p style={{color: "white", fontSize: "small", textAlign: "center"}}> 
                        &copy; 2023 Auto Mates
                    </p>
                </div>
            </ul>
        </nav>
        // </div>
    );
}

export default SideBar;