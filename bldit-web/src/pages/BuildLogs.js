import React from 'react';
import { useState, useEffect, useRef } from 'react';
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import Navbar from "../components/Navbar";
import BannerImage from "../assets/pic.png";
import Footer from "../components/Footer";

const BuildLogs = () => {
  const buildStreamURL = 'http://localhost:5005/buildStream';
  const buildURL = "http://localhost:5003/api/v1";

  const [currentRoom, setCurrentRoom] = useState("");
  const [runningBuild, setRunningBuild] = useState({});
  const [logs, setLogs] = useState([]);

  const logsRef = useRef(null)
  
  const scrollToBottom = () => {
    logsRef.current && logsRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [logs]);

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

      if(!joined) {
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
            console.log(log)
            setLogs(prevState => {
              return [...prevState, log];
            });
            const element = React.createElement("p", 
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

  const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwianRpIjoiZGY5ODE0NTAtNjNjOC00YjYwLWI3MGEtZmRiNTFmYWIxYzMwIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwidXNlcm5hbWUiOiJUZXN0IiwiZmlyc3ROYW1lIjoiVGVzdCIsImxhc3ROYW1lIjoiVGVzdCIsImlkIjoiZDhlMzBmNGItZjg5My00ZGFlLWI2N2YtYWI0MDRkOWNhNzM2IiwibmJmIjoxNjc2Nzg3MjE4LCJleHAiOjE2ODQ0NzY4MTgsImlhdCI6MTY3Njc4NzIxOH0.DxxwcT-HwygXxp879NJJMCs2lqISBpLd0S04T1eUaHc";

  const build = (projectId, jobName) => {
    axios.post(`${buildURL}/projects/${projectId}/jobs/${jobName}/build`, null, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then(r => {
        if (r.status !== 202) {
          console.error(r)
          return;
        }
        console.log("Build Started!!");

        const createdBuild = r.data;
        console.log(createdBuild);
        setRunningBuild(createdBuild);
      });
  }
  
  return (
    <div className="content">
      <div className="content">
        <Navbar />
        <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
          <div className="flex items-center justify-center h-screen">
            <div
              className="max-w-sm w-full p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <p>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Realtime Logs
                </h5>
              </p>
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center 
            text-white bg-green-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => {build('f0cc16a1-fdbf-462f-b4c7-e020b46237a6', 'Test5');}}>
                Build
              </button>
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center 
             text-white bg-green-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none 
             focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={async () => await join(runningBuild.id)}>
                Logs
              </button>
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center 
             text-white bg-green-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none 
             focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={async () => await leave()}>
                Leave
              </button>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 max-h-screen overflow-y-auto max-h-72" >
                Logs from build: {runningBuild.number}
                {logs.map((log, index) => (
                    <p key={index}
                       ref={logsRef}
                       className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {log}
                    </p>
                  )
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildLogs;