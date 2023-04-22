import React from 'react';
import {useState, useEffect, useRef} from 'react';
import * as signalR from "@microsoft/signalr";
import Navbar from "../components/Navbar";
import BannerImage from "../assets/pic.png";
import {useParams} from "react-router-dom";
import BuildCardApi from "../components/Builds/BuildCardApi";
import SideBar from "../components/SideBar";
import ProjectsList from "../components/Projects/ProjectsList";
import AceEditor from "react-ace";
import routes from "../api/bldit/routes";
import useBldItPrivate from "../hooks/useAxiosPrivate";

const BuildLogs = () => {
    const buildStreamURL = 'http://localhost:5005/buildStream';
    const {projectId, jobName, buildNumber, buildId} = useParams();

    const [currentRoom, setCurrentRoom] = useState("");
    const [runningBuild, setRunningBuild] = useState({});
    const [logs, setLogs] = useState([]);
    const [buildStatus, setBuildStatus] = useState("");
    const [fileLogs, setFileLogs] = useState("");

    const logsRef = useRef(null)

    const scrollToBottom = () => {
        logsRef.current && logsRef.current.scrollIntoView({behavior: "smooth"})
    }

    const connection = new signalR.HubConnectionBuilder()
        .withUrl(buildStreamURL, {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build();

    //Call this when the user clicks on a build log.
    const join = (buildLogRoom) => connection.start()
        .then(() => connection.invoke("JoinBuildLogRoom", buildLogRoom))
        .then((result) => {
            console.log(result);
            const joined = result.joined;

            if (!joined) {
                console.error("Failed to join build stream room...")
                const errors = result.errors;
                if (errors == null) return;

                for (const error of errors) {
                    console.error(error);
                }
                return connection.stop();
            }

            console.log(result.logs);
            setCurrentRoom(buildLogRoom);
            connection.on("BuildOutputReceived",
                log => {
                    //console.log(log)
                    setLogs(prevState => {
                        return [...prevState, log];
                    });
                    React.createElement("p",
                        {className: "mb-3 font-normal text-gray-700 dark:text-gray-400"},
                        log)
                }
            );
        })
        .catch((e) => console.log('Connection failed: ', e));

    //Call this when the user navigates away from the page
    const leave = () => connection.send("LeaveBuildLogRoom", currentRoom)
        .then(() => {
            setCurrentRoom('');
            connection.off("BuildOutputReceived");
            return connection.stop();
        });

    useEffect(() => {
        scrollToBottom()
    }, [logs]);

    useEffect(() => {
        const joinBuildLogRoom = async () => {
            await join(buildId);
        }
        joinBuildLogRoom();
    }, []);

    // Setting up the background image and height and width
    useEffect(() => {
        document.body.classList.add("mainContent");

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove("mainContent");
        };
    }, []);

    // Api calls
    const bldItPrivate = useBldItPrivate();

    useEffect(() => {
        const url = window.location.href;
        const urlArray = url.split(/\/\/|\?|\/|\./);
        // console.log(urlArray);

        bldItPrivate.get(routes.builds.getBuild
            .replace("{projectId}", urlArray[3])
            .replace("{jobName}", urlArray[5])
            .replace("{buildNumber}", urlArray[7]))
            .then((response) => {
                setBuildStatus(response.data.status);
            }).catch((error) => {
            console.log(error);
        });

        bldItPrivate.get(routes.builds.getBuildLog
            .replace("{projectId}", urlArray[3])
            .replace("{jobName}", urlArray[5])
            .replace("{buildNumber}", urlArray[7]))
            .then((response) => {
                // console.log(response.data.logContent.split("\n"));
                setFileLogs(response.data.logContent.split(/\n/g));
            }).catch((error) => {
            console.log(error);
        });
        // const loadProject = async () => {

        // }
        //
        // loadProject();
    }, []);

    return (
        <div className="mainContent">
            {/*SideBar*/}
            <div style={{width: "10%", height: "100%", display: "flex"}}>
                <SideBar/>
            </div>

            {/*Build Info*/}
            <div className="ProjectTableDiv">
                <div className="ProjectTable" style={{marginTop: "2%"}}>
                    {/*<p>{buildStatus}</p>*/}
                    <BuildCardApi projectId={projectId} jobName={jobName} buildNumber={buildNumber}/>
                </div>
            </div>

            {/*Real Time Logs*/}
            <div className="ProjectTableDiv">
                {/*<div><AceEditor*/}
                {/*    theme="dracula" tabSize={2}*/}
                {/*    height="200px" width="100%"*/}
                {/*    fontSize={14}*/}
                {/*    onChange={(value) => textContent(value, i)}*/}
                {/*/>*/}
                <div style={{
                    backgroundColor: "#44475a", marginLeft: "auto", marginRight: "auto", width: "88%",
                    textAlign: "left", borderRadius: "0.5rem", maxHeight: "600px", padding: "1%", marginTop: "1%"
                }}>

                    {buildStatus === "Finished" ? (

                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-y-auto max-h-72"
                               style={{
                                   paddingLeft: "1%",
                                   color: "white",
                                   fontFamily: "Courier New",
                                   maxHeight: "550px"
                               }}>
                                Logs from build: {buildId}
                                {fileLogs.map((fileLogs, index) => (
                                        <p key={index}
                                           ref={logsRef}
                                           className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                           style={{color: "white"}}>
                                            {fileLogs}
                                        </p>
                                    )
                                )}
                            </p>
                        )
                        : (
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-y-auto max-h-72"
                               style={{
                                   paddingLeft: "1%",
                                   color: "white",
                                   fontFamily: "Courier New",
                                   maxHeight: "550px"
                               }}>
                                Logs from build: {buildId}
                                {logs.map((log, index) => (
                                        <p key={index}
                                           ref={logsRef}
                                           className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                           style={{color: "white"}}>
                                            {log}
                                        </p>
                                    )
                                )}
                            </p>)}

                </div>
            </div>
        </div>

        // <div className="content">
        //   <div className="content">
        //     <Navbar />
        //     <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
        //       <div className="flex items-center justify-center h-screen">
        //         <BuildCardApi projectId={projectId} jobName={jobName} buildNumber={buildNumber} />
        //         <div
        //           className="max-w-sm max-h-72 w-full p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        //           <p>
        //             <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        //               Realtime Logs
        //             </h5>
        //           </p>
        //           <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-y-auto max-h-72" >
        //             Logs from build: {buildId}
        //             {logs.map((log, index) => (
        //                 <p key={index}
        //                    ref={logsRef}
        //                    className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        //                   {log}
        //                 </p>
        //               )
        //             )}
        //           </p>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
    );
};

export default BuildLogs;