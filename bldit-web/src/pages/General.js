import React, {useState} from "react";

const defaultJobType = "Freestyle";

const General = ({hasError, currentErrorMessage, jobToCreate, onStepDataChange}) => {
  const [jobName, setJobName] = useState(jobToCreate.jobName);
  const [jobDescription, setJobDescription] = useState(jobToCreate.jobDescription);
  const [jobType, setJobType] = useState(defaultJobType);
  
  const handleJobNameChange = (event) => {
    setJobName(event.target.value);
    onStepDataChange('jobName', event.target.value);
  }
  
  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
    onStepDataChange('jobDescription', event.target.value);
  }
  
  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
    onStepDataChange('jobType', event.target.value);
  }
  
  return (
    <div className="step-1" >
      <div className="q1">
        <label for="jobName" className="jc-label">Job Name</label>
        <input type="text" 
               id="jobName"
               name="jobName" 
               onChange={handleJobNameChange}
               placeholder="Sample Name: " />
      </div>
      <div className="q2">
        <label for="jobDescription" className="jc-label">Job Description</label>
        <textarea id="jobDescription" name="jobDescription"
                  rows="3" 
                  cols="3" 
                  onChange={handleJobDescriptionChange}
                  placeholder="Put text here that does _____"/>
      </div>
      <div className="q3">
        <label className="jc-label">Job Type</label>
        <select name="job_type" id="job_type" value={jobType} onChange={handleJobTypeChange}>
          <option value="Freestyle">Freestyle</option>
          <option value="Pipeline" disabled>Pipeline</option>
        </select>
      </div>
      {hasError && <div className="text-red-500 text-center pt-2">{currentErrorMessage}</div>}
    </div>
  )
}

export default General;