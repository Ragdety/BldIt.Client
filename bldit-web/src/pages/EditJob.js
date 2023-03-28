import React, { useState } from 'react';
import BannerImage from "../assets/AMbg.jpeg";
import "../styles/EditJob.css"
import jobinfo from "./mock-job.json"
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; 
  
const EditJob = () => {

    const navigate = useNavigate();
  
    const navigateToProjects = () => {
      //  navigate to /projects
      navigate("/Form");
        }
  
    let [jName, setJName] = useState({
    jobName: '',
  })
  
  let [jDesc, setJDesc] = useState({
    description: '',
  })

/* this.jobInfoObject = {
        "id": "4s02er1wq-bfb1-462f-b4c7-fbfe6946bf99",
        "deleted": false,
        "createdAt": "2022-12-18T05:16:54.928Z",
        "updatedAt": "2022-12-18T05:16:54.929Z",
        "jobName": "Demo1",
        "jobType": "Freestyle" ,
        "description": null
    };
 
  this.setState(prevState => {
    let jobInfoObject = Object.assign({}, prevState.jobInfoObject);
    jobInfoObject.jobName='';
    return {jobInfoObject}
  }) 

    this.setState({...this.state.jobInfoObject, jobName: ' '});
  */
 

    //sets state for new input
  const handleChange = (event) => {
    let updatedValue = event.target.value;
    let updatedName = event.target.name;
    let updatedDValue = event.target.value;
    let updatedDName = event.target.name;

  

   // using handleChange() need to get the current values of the job name once we have the current value then we can re-assign  entered input to state variable which is stored in state object
 // spread operator takes the existing state object 
    setJName((prevalue) => {
      return {
        ...prevalue,       
        [updatedName]: updatedValue //assigns value to input field that matches the value 
      } 
    })

    setJDesc((prevalue) => {
      return {
        ...prevalue,       
        [updatedDName]: updatedDValue //assigns value to input field that matches the value 
      } 
    })


   /*  var jobInfoObject = {
        "id": "4s02er1wq-bfb1-462f-b4c7-fbfe6946bf99",
        "deleted": false,
        "createdAt": "2022-12-18T05:16:54.928Z",
        "updatedAt": "2022-12-18T05:16:54.929Z",
        "jobName": "Demo1",
        "jobType": "Freestyle" ,
        "description": null
    };
    console.log(jobInfoObject);
    console.log(JSON.stringify(jobInfoObject));
    if (jobInfoObject.hasOwnProperty("jobName")) {
      console.log(jobInfoObject.jobName)
    }

    console.log(JSON.stringify(jobInfoObject));
 */

} 

  return (
    <div className="j_edit">
      {/* <Navbar /> */}
        <div className="headerContainer">
          <form className="form">
            <h2> Edit Job Details</h2>
            <section>

                    <label for="j_ref" id="j_ref"> Job ID: 
                    <p className="back">
                    {
                        jobinfo.map ( job_id => {
                            return(
                                <p className="idFromJSON"> 
                                    {job_id.id}
                                </p>
                            )
                        })
                    } 
                    </p>
                    </label>

                    <label for="jType" id="jType"> Job Type: 
                    <p className="readonly">
                    {
                        jobinfo.map ( job_type => {
                            return(
                                <p className="typeFromJSON"> 
                                    {job_type.jobType}
                                </p>
                            )
                        })
                    } 
                    </p>
                    </label>

                <label for="jName" id="jName"> Job Name:</label>
                <input type="text" name="jobName" id="jName"
                placeholder={ 
                    jobinfo.map (job_name => {
                      return(
                        job_name.jobName
                        )
                      })}

                onChange={handleChange}/>
                <> Updated Value: {jName.jobName} </> 

                <label for="jDesc" id="jDesc"> Job Description: </label>
                <textarea name="jDesc" id="jDesc"
                placeholder={ 
                    jobinfo.map (job_desc => {
                      return(
                        job_desc.description
                        )
                      })}  

                      onChange={handleChange}/>
  
                <input type="submit" name="Save" value="Save"/> 


            </section>
          </form>

    
      </div>
      {/* <Footer /> */}
    </div>

  )

                    }

export default EditJob;

              