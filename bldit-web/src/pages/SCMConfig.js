import React, {useState} from "react";
import GitHubConfig from "../components/GitHub/GitHubConfig";

function SCMConfig({scmConfigToCreate, onStepDataChange}) {
  const [scmType, setSCMType] = useState("None");
  
  const [error, setError] = useState("");
  
  const handleSCMTypeChange = (event) => {
    console.log("SCM Type: ", event.target.value)
    setSCMType(event.target.value);
    onStepDataChange('scmType', event.target.value);
  }
  
  return (
    <div className="step-2" >
      <div className = "form-group" >
        <div className = "q4" style={{marginLeft:"auto !important"}}>
          <label className="jc-label">None</label>
          <input type="radio" 
                 id="none" 
                 name="scmType"
                 onChange={handleSCMTypeChange}
                 checked={scmType === "None"}
                 value="None"/>
          <label className="jc-label">Github</label>
          <input type="radio" 
                 id="github"
                 name="scmType"
                 checked={scmType === "Github"}
                 onChange={handleSCMTypeChange}
                 value="Github"/>
        </div>
        {scmType === "Github" && (
            <GitHubConfig scmConfig={scmConfigToCreate} onStepDataChange={onStepDataChange}/>)}
        {error && <div className="text-red-500 text-center pt-2">{error}</div>}
      </div>
    </div>
  )
}

export default SCMConfig;