import React, {useEffect, useState} from 'react';
import * as signalR from "@microsoft/signalr";
import BuildWorkerCard from "./BuildWorkerCard";
import {Typography} from "@material-tailwind/react";

const BuildWorkers = () => {
  const [buildWorkers, setBuildWorkers] = useState([{
    buildId: null,
    isWorking: false,
    buildNumber: -1,
    jobId: null
  }, {
    buildId: null,
    isWorking: false,
    buildNumber: -1,
    jobId: null
  }]);
  const [connection, setConnection] = useState(null);
  
  const workerStreamURL = 'http://localhost:5005/workerStream';
  
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(workerStreamURL, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();
    
    setConnection(newConnection);
  }, []);
  
  useEffect(() => {
    if(!connection) return;
    
    connection.start()
      .then(() => connection.invoke("GetWorkers"))
      .then((result) => {
        //console.log(result);
        const workers = result.buildWorkers;
        
        setBuildWorkers(workers);

        connection.on("UpdateBuildWorkerAvailability", buildWorker => {
          //console.log(buildWorker);
          console.log(`Worker with buildId ${buildWorker.buildId} is now ${buildWorker.isWorking ? "working" : "available"}`)
          
          if (buildWorker.isWorking) {
            //Only update and set 1 worker
            const availableBuildWorker = buildWorkers.find(bw => !bw.isWorking);
            console.log(availableBuildWorker)
            if(availableBuildWorker) {
              availableBuildWorker.isWorking = buildWorker.isWorking;
              availableBuildWorker.buildNumber = buildWorker.buildNumber;
              availableBuildWorker.jobId = buildWorker.jobId;
              availableBuildWorker.buildId = buildWorker.buildId;
            }
            //Set only 1 worker
            
          }
          else {
            //Only update and set 1 worker
            const workingBuildWorker = buildWorkers.find(bw => bw.isWorking && bw.buildId === buildWorker.buildId);
            if(workingBuildWorker) {
              workingBuildWorker.isWorking = buildWorker.isWorking;
              workingBuildWorker.buildNumber = -1;
              workingBuildWorker.jobId = null;
              workingBuildWorker.buildId = null;
            }
            
            setBuildWorkers([...buildWorkers]);
          }
        });

      }).catch(err => console.error(err));
  }, [connection]);
  
  return (
    <div style={{display:"flex"}}>
      <Typography color="white">Build Workers</Typography>
      {buildWorkers.map((buildWorker, index) => {
        return (
          <div key={index} style={{marginLeft:"3%", marginRight:"3%"}}>
            <BuildWorkerCard 
              workerNumber={index}
              buildId={buildWorker.buildId}
              isWorking={buildWorker.isWorking}
              buildNumber={buildWorker.buildNumber}
              jobId={buildWorker.jobId}
            />
          </div>
        );
      })
      }
    </div>
  );
};

export default BuildWorkers;