import React, {useEffect} from "react";
import BannerImage from "../assets/AMbg.jpeg";
import "../styles/Home.css";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

const Home = () => {
    //Navigation
    const navigate = useNavigate();
    const navigateToProjects = () => {
        //  navigate to /projects
        navigate("/createproject");
    };

    // Setting up the background image and height and width
    useEffect(() => {
        document.body.classList.add("mainPageContent");

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove("mainPageContent");
        };
    }, []);

    return (
        <div className="content">
            <div style={{width: "10%"}}>
                <SideBar/>
            </div>
            <div style={{width: "90%", float: "right"}}>
                {/*Page Title*/}
                <table style={{width: "96%", backgroundColor: "transparent", paddingTop:"2%"}}>
                    <tr>
                        <td style={{backgroundColor:"transparent", width:"50%"}}>
                            <div style={{width: "100%", color: "white", textAlign: "center", fontFamily: "consolas"}}>
                                <div>
                                    <h1 style={{fontSize:"70px"}}> Auto Mates </h1>
                                    <p style={{fontSize:"34px"}}>
                                        System that allows automation of 
                                        development operations such as test case execution, code compilation, and code deployment.
                                    </p>
                                    <button className="buttonsDesign" onClick={navigateToProjects}>Create Project</button>
                                </div>
                            </div>
                        </td>
                        <td style={{backgroundColor:"transparent", width:"50%", textAlign:"center"}}>
                            <div
                                style={{
                                    width: "100%",
                                    color: "white",
                                    textAlign: "center",
                                    // float: "right",
                                    fontFamily: "consolas",
                                    backgroundColor: "#102441",
                                    borderRadius: "1rem",
                                    marginRight: "1%",
                                    padding: "2%",
                                    opacity: "85%"
                                }}>
                                <div>
                                    <h2>Continuous Integration</h2>
                                    <h4>
                                        Build and merge code changes frequently.
                                    </h4>
                                </div>
                                <hr/>
                                <div>
                                    <h2>Continuous Testing</h2>
                                    <h4>
                                        Automate the testing process and detect problems early.
                                    </h4>
                                </div>
                                <hr/>
                                <div>
                                    <h2>Continuous Delivery</h2>
                                    <h4>
                                        Automate the deployment process and release new features quickly.
                                    </h4>
                                </div>

                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            {/*<Navbar />*/}
            {/*<div style={{width:"90%", float:"right"}}>*/}
            {/*    <div className="home" style={{backgroundImage: `url(${BannerImage})`}}>*/}
            {/*        <div className="headerContainer">*/}
            {/*            <h1> Auto Mates </h1>*/}
            {/*            <p> System that allows developers to automate their tasks.</p>*/}
            {/*            <button type="click" onClick={navigateToProjects}>*/}
            {/*                Projects*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="container" style={{maxWidth:"100%"}}>*/}
            {/*        <div className="image">*/}
            {/*            <img src={require("../assets/cont-int.jpeg")} alt="ci"/>*/}
            {/*        </div>*/}
            {/*        <div className="text">*/}
            {/*            <h1>Continuous Integration</h1>*/}
            {/*            <h2>*/}
            {/*                Continuous integration (CI) is a software development practice in*/}
            {/*                which developers merge their changes to the main branch many times*/}
            {/*                per day.{" "}*/}
            {/*            </h2>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="container1">*/}
            {/*        <div className="image1">*/}
            {/*            <img*/}
            {/*                src={require("../assets/cont-testing.png")}/>*/}
            {/*        </div>*/}
            {/*        <div className="text1">*/}
            {/*            <h1>Continuous Testing</h1>*/}
            {/*            <h2>*/}
            {/*                Continuous testing (CT) is a software development process in which*/}
            {/*                applications are tested continuously throughout the entire software*/}
            {/*                development life cycle (SDLC). The goal of CT is to evaluate*/}
            {/*                software quality across the SDLC, providing critical feedback*/}
            {/*                earlier and enabling higher-quality and faster deliveries.*/}
            {/*            </h2>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="container2">*/}
            {/*        <div className="image2">*/}
            {/*            <img src={require("../assets/cont-deliv.jpeg")}/>*/}
            {/*        </div>*/}
            {/*        <div className="text2">*/}
            {/*            <h1>Continuous Delivery</h1>*/}
            {/*            <h2>*/}
            {/*                Continuous Delivery is the ability to get changes of all*/}
            {/*                types—including new features, configuration changes, bug fixes and*/}
            {/*                experiments—into production, or into the hands of users, safely and*/}
            {/*                quickly in a sustainable way.*/}
            {/*            </h2>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<Footer />*/}
        </div>
    );
};

export default Home;
