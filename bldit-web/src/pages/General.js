import React from "react";


function General() {

    return ( 
        <div className = "step-1" >
            <div className = "q1">
            <label for = "jobName" > Job Name </label>  
                <input type = "text" id = "jobName" name = "jobName" placeholder= "Sample Name: "/>
            </div> 
            <div className = "q2">
            <label for ="jobDescription" > Job Description </label> 
                <textarea id ="jobDescription" name ="jobDescription"
                rows="3" cols="3" placeholder="Put text here that does _____"/>
            </div> 
            <div className = "q3"> 
            <label> Job Type </label>
                <select name = "job_type" id = "job_type" >
                <option value = "freestyle" > Freestyle </option> 
                <option value = "pipeline" > Pipeline </option>
                </select> 
            </div> 
    

        </div>
       

    )
}

export default General;