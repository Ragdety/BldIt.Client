import React from "react";
import { useState } from "react";
import "../styles/jobconfig.css";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/mode-batchfile';
import 'ace-builds/src-noconflict/mode-python';

const ConfigBuild = ({buildConfigToCreate, onStepDataChange, scmType}) => {
  const [buildSteps, setBuildSteps] = useState(buildConfigToCreate.buildSteps);
  const [buildTrigger, setBuildTrigger] = useState(buildConfigToCreate.buildTrigger);
  const [scriptType, setScriptType] = useState("Batch");
  
  const addEmptyStep = () => {
    const emptyStep = {
      type: scriptType,
      command: "",
    };
    
    const newBuildSteps = [...buildSteps, emptyStep];
    setBuildSteps(newBuildSteps);
    onStepDataChange('buildSteps', newBuildSteps);
    
    console.log(newBuildSteps);
  }

  // lets you add text input to the text fields, saves it in array (?)
  const textContent = (code, i) => {
    const buildStepsData = [...buildSteps];
    buildStepsData[i].command = code;
    
    setBuildSteps(buildStepsData);
    onStepDataChange('buildSteps', buildStepsData);
    
    //console.log(buildStepsData);
  }

  const handleBuildTriggerSelect = (event) => {
    setBuildTrigger(event.target.value);
    onStepDataChange('buildTrigger', event.target.value);
  }

  const handleScriptTypeChange = (event) => {
    console.log(event.target.value);
    setScriptType(event.target.value);
    console.log(event.target.value);
  }
  
  const renderEditor = (type, i) => {
    switch (type) {
      case "Batch":
        return <AceEditor
          mode="batchfile" theme="dracula" tabSize={2}
          height="200px" width="100%"
          fontSize={14}
          onChange={(value) => textContent(value, i)}
        />
      case "Shell":
        return <AceEditor 
          mode="sh" theme="dracula" tabSize={2}
          height="200px" width="100%"
          fontSize={14}
          onChange={(value) => textContent(value, i)}
        />
      case "Python":
        return <AceEditor
          mode="python" theme="dracula" tabSize={2}
          height="200px" width="100%"
          fontSize={14}
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
    <div className = "step-3" >
    <div className = "form-group">
      {scmType === "Github" && (
        <div className="q5">
          <label className="jc-label">Manual</label>
          <input type="radio" 
                 id="pr_creation"
                 value="Manual"
                 checked={buildTrigger === 'Manual'}
                 defaultChecked
                 onChange={handleBuildTriggerSelect}/>

          <label className="jc-label">Pull Request</label>
          <input type="radio"
                 id="pr_creation"
                 value="PullRequest"
                 checked={buildTrigger === 'PullRequest'}
                 onChange={handleBuildTriggerSelect}
                 defaultChecked/>

          <label className="jc-label">Push</label>
          <input type="radio"
                 id="pr_creation"
                 value="Push"
                 checked={buildTrigger === 'Push'}
                 onChange={handleBuildTriggerSelect}
                 defaultChecked/>
        </div>
      )}
      
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
            {renderEditor(step.type, i)}
          </div>
        })}
      </div>
    </div>
    </div>
 );
 }


export default ConfigBuild;