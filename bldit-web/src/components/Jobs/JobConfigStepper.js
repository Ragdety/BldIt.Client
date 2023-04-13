import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import General from "../../pages/General";
import SCMConfig from "../../pages/SCMConfig";
import ConfigBuild from "../../pages/ConfigBuild";
import PostBuild from "../../pages/PostBuild";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import routes from "../../api/bldit/routes";
import {useNavigate} from "react-router-dom";

const steps = ["General", 'SCM', 'Build', 'Post Build'];

const JobConfigStepper = ({projectId}) => {
  const axiosPrivate = useAxiosPrivate();

  //Stepper Step Functions
  const [activeStep, setActiveStep] = useState(0);
  const [hasErrors, setHasErrors] = useState(false);
  const [currentErrorMessage, setCurrentErrorMessage] = useState("");
  const [errorsArr, setErrorsArr] = useState([]);
  const [completed, setCompleted] = useState({});

  const totalSteps = steps.length;
  const completedSteps = Object.keys(completed).length;
  const allStepsCompleted = completedSteps === totalSteps;

  const handleNext = async () => {
    const errors = await stepApiCall();
    
    if (errors.length > 0) { 
      setHasErrors(true);
      setCurrentErrorMessage(errors[0]);
      console.log("Errors: ", errors);
      setErrorsArr(errors);
      return;
    }
    
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setHasErrors(false);
    setCurrentErrorMessage("");
  };
  
  const handleStepDataChange = (attr, newData) => {
    if (activeStep === 0) {
      //Sets the [attr] value to newData. 
      //For example, if attr = "jobName" and newData = "My Job Name", then jobToCreate.jobName = "My Job Name"
      setJobToCreate((prevJobToCreate) => ({
        ...prevJobToCreate,
        [attr]: newData,
      }));
    } else if (activeStep === 1) {
      setSCMConfig((prevSCMConfig) => ({
        ...prevSCMConfig,
        [attr]: newData,
      }));
      if (attr === "scmType") {
        setSCMType(newData);
      }
    } else if (activeStep === 2) {
      setBuildConfig((prevBuildConfig) => ({
        ...prevBuildConfig,
        [attr]: newData,
      }));
    } else if (activeStep === 3) {
      setPostBuildConfig((prevPostBuildConfig) => ({
        ...prevPostBuildConfig,
        [attr]: newData,
      }));
    }
  }

  const stepDisplay = () => {
    if (activeStep === 0) {
      return <General 
        jobToCreate={jobToCreate}
        onStepDataChange={handleStepDataChange}
      />;
    }   else if (activeStep === 1) {
      return <SCMConfig 
        scmConfigToCreate={scmConfig} 
        onStepDataChange={handleStepDataChange}
      />;
    }  else if (activeStep === 2) {
      return <ConfigBuild />;
    }   else if (activeStep === 3)  {
      return <PostBuild />
    }
  }
  
  const stepApiCall = () => {
    if (activeStep === 0) {
      return createJob();
    }   else if (activeStep === 1) {
      return createSCMConfig();
    }  else if (activeStep === 2) {
      return createBuildConfig();
    }   else if (activeStep === 3)  {
      return createPostBuildConfig();
    }
  }
  //End - Stepper Step Functions
  
  //Job Config information
  const [jobToCreate, setJobToCreate] = useState({
    jobName: "",
    jobDescription: "",
    jobType: "Freestyle",
  });
  
  const [jobConfigId, setJobConfigId] = useState("");
  
  //For debugging purposes
  useEffect(() => {
    console.log("Job Config Id: ", jobConfigId);
  }, [jobConfigId]);
  
  const createJob = async () => {
    const errors = [];
    console.log("Job to create: ", jobToCreate);
    
    // await axiosPrivate.post(routes.jobs.createJob
    //   .replace("{projectId}", projectId), jobToCreate)
    //   .then((response) => {
    //     console.log("Job created successfully");
    //     const jobCreated = response.data;
    //     setJobConfigId(jobCreated.latestJobConfigId);
    //   })
    //   .catch((error) => {
    //     console.log("Job creation failed");
    //     console.log(error);
    //     errors.push(error.response.data.detail);
    //     return errors;
    //   })
    
    return errors;
  }
  
  //End - Job Config information
  
  //SCM
  const [scmConfig, setSCMConfig] = useState({
    repoId: "",
    repoName: "",
    repoUrl: "",
    repoBranch: "",
    gitHubCredentialId: "",
  });
  
  const [scmType, setSCMType] = useState("None");
  
  const createSCMConfig = async () => {
    //If it's not GitHub, then just go to the next step
    if(scmType === "None") {
      return [];
    }
    console.log("SCM Config to create: ", scmConfig);
    console.log("Creating SCM Config...");
    
    const errors = [];
    // await axiosPrivate.post(
    //   routes.jobConfigs.scm.createSCM
    //     .replace("{projectId}", projectId)
    //     .replace("{jobName}", jobToCreate.jobName)
    //     .replace("{configId}", jobConfigId), scmConfig)
    //   .then((response) => {
    //     console.log("SCM Config created successfully");
    //     console.log(response.data);
    //   }).catch((error) => {
    //     console.log("SCM Config creation failed");
    //     console.log(error);
    //     errors.push(error.response.data.detail);
    //     return errors;
    //   });

    
    return errors;
  }

  //End - SCM
  
  //Build Config
  const buildStep = {
    command: "",
    stepType: "",
  };
  
  const [buildConfig, setBuildConfig] = useState({
    buildSteps: [],
  });
  
  const createBuildConfig = async () => {
    console.log("Build Config to create: ", buildConfig);
  }

  //End - Build Config
  
  const [postBuildConfig, setPostBuildConfig] = useState({
    emailNotification: false,
  });
  
  const createPostBuildConfig = async () => {
    console.log("Post Build Config to create: ", postBuildConfig);
  }
  //End - Job Config information

  const navigate = useNavigate();
  
  const navigateToJobs = () => {
    navigate(`/projects/${projectId}/jobs`);
  }

  const handleDisabled = () => {
    if (hasErrors) {
      return true;
    }
    if (activeStep === 0) {
      return jobToCreate.jobName === "";
    }
    else if (activeStep === 1) {
      return scmConfig.repoUrl === "";
    }
    else if (activeStep === 2) {
      return buildConfig.buildSteps.length === 0;
    }
    else if (activeStep === 3) {
      return false;
    }
  }
  
  return (
    <Box sx={{ width: '100%', maxWidth: '800px' }}>
      <Stepper activeStep={activeStep} alternativeLabel color="white" sx={{padding: '24px'}}>
        {steps.map((step, index) => (
          <Step key={step} className="text-white" sx={{
            '& .MuiStepLabel-root .Mui-completed': {
              color: 'rgb(56, 131, 150)', // circle color (COMPLETED)
            },
            '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
              {
                color: 'white', // Just text label (COMPLETED)
              },
            '& .MuiStepLabel-root .Mui-active': {
              color: 'rgb(56, 131, 150)', // circle color (ACTIVE)
            },
            '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
              {
                color: 'white', // Just text label (ACTIVE)
              },
            '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
              fill: 'white', // circle's number (ACTIVE)
            },
            '& .MuiStepLabel-root .Mui-disabled': {
              color: 'rgb(56, 131, 150)', // circle color (DISABLED)
            },
            '& .MuiStepLabel-label.Mui-disabled.MuiStepLabel-alternativeLabel':
              {
                color: 'white', // Just text label (DISABLED)
              },
            '& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-text': {
              fill: 'white', // circle's number (DISABLED)
            }
          }}>
            <StepLabel className="text-white">{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {allStepsCompleted ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }} variant="h6" color="white">
            Job was created!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button variant="contained" onClick={navigateToJobs}>
              See Jobs
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }} variant="h4" color="white">
            {steps[activeStep]}
          </Typography>

          <Box sx={{ mt: 2 }}>
            {stepDisplay()}
            {hasErrors && errorsArr.map((error) => (
                <div className="text-red-500 text-center pt-2">{error}</div>
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ ml: 1 }}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default JobConfigStepper;