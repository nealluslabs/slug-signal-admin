import React, { useState} from 'react';
import Box from '@mui/material/Box';
import {Stepper, Step, StepButton, TextField, Button, Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Step1 from './Step1';
import Step2 from './Step2'; // Import Step2 component
import Step3 from './Step3'; // Import Step3 component
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createStudent, uploadDocImages } from 'src/redux/actions/student.action';
import { notifyErrorFxn } from 'src/utils/toast-fxn';

const steps = ['Basic Info', 'Additional Info', 'Doc Uploads'];

export default function AddStudent() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    fname:  "",
    lname: "",
    dob: "",
    gender: "",
    studentshipType: "",
    registrationId: "",
    class: "",
    section: "",
    guardianName: "",
    bloodGroup: "",
    religion: "",
    phoneNumber: "",
    email: "",
    skinColor: "",
    eyeColor: "",
    height: "",
    nationality: "",
    admissionDate: "",
    admissionTerminated: "",
    medicalHistory: "",
    specialInstruction: ""
  })

  const [studentPassportFile, setStudentPassportFile] = useState({selectedFile: [], selectedFileName: []});
  const [anotherFieldFile, setAnotherFieldFile] = useState({selectedFile: [], selectedFileName: []});
  const [mothersIdFile, setMothersIdFile] = useState({selectedFile: [], selectedFileName: []});
  const [certificateFile, setCertificateFile] = useState({selectedFile: [], selectedFileName: []});
  const [medicalRecordFile, setMedicalFile] = useState({selectedFile: [], selectedFileName: []});


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  }

  const handleStudentPassportFile = event => {
    setStudentPassportFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
};
  const handleAnotherFieldFile = event => {
    setAnotherFieldFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
};
  const handleMothersIdFile = event => {
    setMothersIdFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
};
  const handleCertificateFile = event => {
    setCertificateFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
};
  const handleMedicalFile = event => {
    setMedicalFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
};


  // Helper function to render the appropriate step content based on the activeStep
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1 state={state} handleChange={handleChange} />;
      case 1:
        return <Step2 state={state} handleChange={handleChange} />;
      case 2:
        return <Step3 
        studentPassportFile={studentPassportFile}
        handleStudentPassportFile={handleStudentPassportFile}
        anotherFieldFile={anotherFieldFile}
        handleAnotherFieldFile={handleAnotherFieldFile}
        mothersIdFile={mothersIdFile}
        handleMothersIdFile={handleMothersIdFile}
        certificateFile={certificateFile}
        handleCertificateFile={handleCertificateFile}
        medicalRecordFile={medicalRecordFile}
        handleMedicalFile={handleMedicalFile}
        />;
      default:
        return 'Unknown step';
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const files = [
      studentPassportFile.selectedFile,
      anotherFieldFile.selectedFile,
      mothersIdFile.selectedFile,
      certificateFile.selectedFile,
      medicalRecordFile.selectedFile,
    ].filter(file => file); 
    
    try {
      setLoading(true);
     const urls = await Promise.all(files.map((file) => {
        if (file) {
          return dispatch(uploadDocImages(file));
        }
        return null;
      }));

  
      const [studentPassportFileUrl, anotherFieldFileUrl, mothersIdFileUrl, certificateFileUrl, medicalRecordFileUrl] = urls;
  
      const studentData = { state,  studentPassportFileUrl, anotherFieldFileUrl, mothersIdFileUrl, certificateFileUrl, medicalRecordFileUrl};
      dispatch(createStudent(studentData, navigate, setLoading));
    } catch (error) {
      // setLoading(false);
      console.error("Error uploading images: ", error);
      // notifyErrorFxn("Error occured uploading Images");
    }
  };
  

  return (
    <Box sx={{ width: '100%' }}>
      <div style={{ display: 'flex', width: '100%' }}>
  <div style={{ flex: 1 }}>
    <Stepper nonLinear activeStep={activeStep} style={{ border: '0px solid red', background: 'white' }}>
      {steps.map((label, index) => (
        <Step key={label} completed={completed[index]}>
          <StepButton color="inherit" onClick={handleStep(index)}>
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  </div>
</div>

      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ mt: 2, mb: 1, py: 1, ml: 5, color: '#000000', fontSize: '18px' }}>
              <b>{activeStep === 0 && 'Basic Information'}</b>
              <b>{activeStep === 1 && 'Additional Information'}</b>
              <b>{activeStep === 2 && 'Document Uploads'}</b>
            </Typography>
            <Divider />
            <br />
            {/* Render the appropriate step content */}
            {getStepContent(activeStep)}
            <br/><br />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
               <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
               <Button
                variant="contained"
                disabled={activeStep === 0 || loading}
                onClick={handleBack}
                style={{
                  display: activeStep === 0 ? 'none' : 'inline-block',
                  minWidth: '125px',
                  backgroundColor: 'transparent',
                  border: '1px solid #000000',
                  color: '#000000',
                  marginLeft: '4rem',
                  paddingTop: '15px',
                  paddingBottom: '15px',
                  paddingLeft: '20px',
                }}
              >
                Previous
              </Button>

                {activeStep === 2 ? <Button disabled={loading} variant="contained" onClick={handleSubmit} style={{ minWidth: '125px', backgroundColor: "#D72A34", marginLeft: activeStep === 0 ? '4rem' : '1rem', paddingTop: '15px', paddingBottom: '15px', paddingLeft: '20px' }}>
               {loading ? "Loading..." : "Save"}
              </Button> :
              <Button disabled={loading} variant="contained" onClick={handleNext} style={{ minWidth: '125px', backgroundColor: "#D72A34", marginLeft: activeStep === 0 ? '4rem' : '1rem', paddingTop: '15px', paddingBottom: '15px', paddingLeft: '20px' }}>
              Next
            </Button>}

              </Grid>
              <Box sx={{ flex: '1 1 auto' }} />
            </Box>
          </>
        )}
      </div>
    </Box>
  );
}
