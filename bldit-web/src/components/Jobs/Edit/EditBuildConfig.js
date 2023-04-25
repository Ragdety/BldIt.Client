import React from "react";
import { useState, useEffect } from "react";
import "../../../styles/jobconfig.css";
import "../../../styles/ProjectsRedesign.css";
import "../../../styles/Home.css";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/mode-batchfile';
import 'ace-builds/src-noconflict/mode-python';
import useBldItPrivate from "../../../hooks/useAxiosPrivate";
import routes from "../../../api/bldit/routes";
import {useParams} from "react-router-dom";
import SideBar from "../../SideBar";

const EditBuildConfig = () => {
  const [buildSteps, setBuildSteps] = useState([]);
  const [buildConfigId, setBuildConfigId] = useState("");
  //const [buildTrigger, setBuildTrigger] = useState(buildConfigToCreate.buildTrigger);
  const [scriptType, setScriptType] = useState("Batch");
  
  const bldItPrivate = useBldItPrivate();
  const {projectId, jobName} = useParams();

  useEffect(() => {
    //Load steps from API
    const fetchSteps = () => {
      
      //Get build config
      bldItPrivate.get(routes.jobs.getJob
        .replace("{projectId}", projectId)
        .replace("{jobName}", jobName))
        .then((response) => {
          const buildConfigId = response.data.latestBuildConfigId;
          setBuildConfigId(buildConfigId);
          
          //Get build steps
          bldItPrivate.get(routes.buildConfigs.steps.getBuildSteps
            .replace("{projectId}", projectId)
            .replace("{jobName}", jobName)
            .replace("{configId}", buildConfigId))
            .then((response) => {
              const buildSteps = response.data;
              console.log(buildSteps);
              setBuildSteps(buildSteps);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    fetchSteps();

  }, []);

  const addEmptyStep = () => {
    const emptyStep = {
      type: scriptType,
      command: "",
    };

    const newBuildSteps = [...buildSteps, emptyStep];
    setBuildSteps(newBuildSteps);
    //onStepDataChange('buildSteps', newBuildSteps);

    console.log(newBuildSteps);
  }

  // lets you add text input to the text fields, saves it in array (?)
  const textContent = (code, i) => {
    const buildStepsData = [...buildSteps];
    buildStepsData[i].command = code;

    setBuildSteps(buildStepsData);
    //onStepDataChange('buildSteps', buildStepsData);

    //console.log(buildStepsData);
  }

  const handleBuildTriggerSelect = (event) => {
    //setBuildTrigger(event.target.value);
    //onStepDataChange('buildTrigger', event.target.value);
  }

  const handleScriptTypeChange = (event) => {
    console.log(event.target.value);
    setScriptType(event.target.value);
    console.log(event.target.value);
  }

  const renderEditor = (step, i) => {
    switch (step.type) {
      case "Batch":
        return <AceEditor
          mode="batchfile" theme="dracula" tabSize={2}
          height="200px" width="100%"
          fontSize={14}
          value={step.command}
          onChange={(value) => textContent(value, i)}
        />
      case "Shell":
        return <AceEditor
          mode="sh" theme="dracula" tabSize={2}
          height="200px" width="100%"
          fontSize={14}
          value={step.command}
          onChange={(value) => textContent(value, i)}
        />
      case "Python":
        return <AceEditor
          mode="python" theme="dracula" tabSize={2}
          height="200px" width="100%"
          fontSize={14}
          value={step.command}
          onChange={(value) => textContent(value, i)}
        />
      default:
        return <AceEditor
          theme="dracula" tabSize={2}
          height="200px" width="100%"
          fontSize={14}
        />
    }
  }

  return(
    <>
      <div className="mainContent">
        <div style={{width: "10%", height: "100%", display: "flex"}}>
          <SideBar/>
        </div>

        <div style={{width: "90%"}} className="pageTitle">
          <h1>Projects Dashboard</h1>
          {/*<button onClick={navigateToCreateProject}>Create Project</button>*/}
        </div>
        <div className = "form-group">
          <div className="q6">
            <p> Build Steps </p>
            <select name="script"
                    id="script"
                    onChange={handleScriptTypeChange}>
              <option disabled value=""> Select a script type </option>
              <option value="Batch">Batch script</option>
              <option value="Shell">Shell script</option>
              <option value="Python">Python script</option>
            </select>
          </div>  

          <div id="script_input">
            <button id="new_field"
                    onClick={addEmptyStep}
                    className="buttonsDesign"
                    style={{marginLeft:"auto", marginBottom:"2%", marginTop:"2%"}}>
              New Script
            </button>
            {buildSteps.map((step, i) => {
              return <div key={i}>
                {renderEditor(step, i)}
              </div>
            })}
          </div>
        </div>
        {/*</div>*/}
      </div>
    </>
  );
}

export default EditBuildConfig;