import React from 'react';
import { useState } from 'react';
import * as signalR from "@microsoft/signalr";
import axios from "axios";

const BuildLogs = () => {
  const buildStreamURL = 'http://localhost:5005/buildStream';
  const buildURL = "http://localhost:5003/api/v1";

  const [currentRoom, setCurrentRoom] = useState("");
  const [runningBuildId, setRunningBuildId] = useState("");

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
      connection.on("BuildOutputReceived", log => console.log(log));
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
        setRunningBuildId(createdBuild.id);
      });
  }
  
  return (
    <div>
      <button onClick={() => {build('f0cc16a1-fdbf-462f-b4c7-e020b46237a6', 'Test5');}}>
        Build
      </button>
      {/*This button simulates clicking the build log page*/}
      <button onClick={async () => await join(runningBuildId)}>
        Build Log
      </button>
      <button onClick={async () => await leave()}>
        Leave Build Log Page
      </button>
    </div>
  );
};

export default BuildLogs;