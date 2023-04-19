import React, {useState} from "react";

const defaultJobType = "Freestyle";

const General = ({jobToCreate, onStepDataChange}) => {
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
    onStepDataChange('jobType', jobType);
  }
  
  return (
    <div className="step-1" >
      <div className="q1">
        {/*<label className="jc-label">Job Name</label>*/}
        <input type="text" 
               id="jobName"
               onChange={handleJobNameChange}
               placeholder="Job Name" />
      </div>
      <div className="q2">
        {/*<label className="jc-label">Job Description</label>*/}
        <input id="jobDescription" 
               type="text"
               onChange={handleJobDescriptionChange}
               placeholder="Job Description"/>
      </div>
      <div className="q3">
        {/*<label className="jc-label">Job Type</label>*/}
        <select name="job_type" id="job_type" value={jobType} onChange={handleJobTypeChange}>
          <option value="Freestyle">Freestyle</option>
          <option value="Pipeline" disabled>Pipeline</option>
        </select>
      </div>
    </div>
  )
}

export default General;