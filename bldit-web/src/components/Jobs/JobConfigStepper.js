import React, { useState } from 'react';
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
import { styled } from '@mui/material/styles';

const steps = ["General", 'SCM', 'Build', 'Post Build'];
const stepDescriptions = [<General/>, <SCMConfig/>, <ConfigBuild/>, <PostBuild/>];

const JobConfigStepper = ({projectId}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = steps.length;
  const completedSteps = Object.keys(completed).length;
  const allStepsCompleted = completedSteps === totalSteps;

  const handleNext = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

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
            <Button variant="contained" onClick={handleReset}>
              Create Another Job
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }} variant="h4" color="white">
            {steps[activeStep]}
          </Typography>

          <Box sx={{ mt: 2 }}>
            {stepDescriptions[activeStep]}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button onClick={handleBack} disabled={activeStep === 0} variant="contained">
              Back
            </Button>
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