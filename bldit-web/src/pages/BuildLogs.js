import React from 'react';
import { useState, useEffect, useRef } from 'react';
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import Navbar from "../components/Navbar";
import BannerImage from "../assets/pic.png";
import Footer from "../components/Footer";
import {useParams} from "react-router-dom";

const BuildLogs = () => {
  const buildStreamURL = 'http://localhost:5005/buildStream';
  const { buildId } = useParams();

  const [currentRoom, setCurrentRoom] = useState("");
  const [runningBuild, setRunningBuild] = useState({});
  const [logs, setLogs] = useState([]);

  const logsRef = useRef(null)

  const scrollToBottom = () => {
    logsRef.current && logsRef.current.scrollIntoView({ behavior: "smooth" })
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

  return (
    <div className="content">
      <div className="content">
        <Navbar />
        <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
          <div className="flex items-center justify-center h-screen">
            <div
              className="max-w-sm max-h-72 w-full p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <p>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Realtime Logs
                </h5>
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 max-h-screen overflow-y-auto max-h-72" >
                Logs from build: {buildId}
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