import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, MenuItem, Select, FormControl } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomToggleSwitch from 'src/components/buttons/CustomToogleSwitch';
import EditStudentToggleSwitch from 'src/components/buttons/EditStudentToggleSwitch';
import EditBasicInfo from 'src/components/students/EditBasicInfo';
import EditAdditionalInfo from 'src/components/students/EditAdditionalInfo';
import EditDocInfo from 'src/components/students/EditDocInfo';
import { updateStudent, uploadDocImages } from 'src/redux/actions/student.action';
import ProfileInfo from 'src/components/students/ProfileInfo';

export default function EditStudentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const studentData = location.state?.student;
  const [loading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState('');
  const [activeButton, setActiveButton] = useState('1');

  const handleOne = () => {
    setActiveButton('1');
  };

  const handleTwo = () => {
    setActiveButton('2');
  };

  const handleThree = () => {
    setActiveButton('3');
  };

  const handleAddStudentsClick = () => {
    setActiveButton('addStudents');
  };

  const [state, setState] = useState({
    studentId: studentData.studentId,
    paymentStatus: studentData.paymentStatus,
    fname: studentData.fname,
    lname: studentData.lname,
    dob: studentData.dob,
    gender: studentData.gender,
    studentshipType: studentData.studentshipType,
    registrationId: studentData.registrationId,
    class: studentData.class,
    section: studentData.section,
    guardianName: studentData.guardianName,
    bloodGroup: studentData.bloodGroup,
    religion: studentData.religion,
    phoneNumber: studentData.phoneNumber,
    email: studentData.email,
    skinColor: studentData.skinColor,
    eyeColor: studentData.eyeColor,
    height: studentData.height,
    nationality: studentData.nationality,
    admissionDate: studentData.admissionDate,
    admissionTerminated: studentData.admissionTerminated,
    medicalHistory: studentData.medicalHistory,
    specialInstruction: studentData.specialInstruction,
    studentPassportFile: studentData.studentPassportFileUrl,
    anotherFieldFile: studentData.anotherFieldFileUrl,
    mothersIdFile: studentData.mothersIdFileUrl,
    medicalRecordFile: studentData.medicalRecordFileUrl,
  });

  const [studentPassportFile, setStudentPassportFile] = useState({ selectedFile: null, selectedFileName: null });
  const [anotherFieldFile, setAnotherFieldFile] = useState({ selectedFile: null, selectedFileName: null });
  const [mothersIdFile, setMothersIdFile] = useState({ selectedFile: null, selectedFileName: null });
  const [certificateFile, setCertificateFile] = useState({ selectedFile: null, selectedFileName: null });
  const [medicalRecordFile, setMedicalFile] = useState({ selectedFile: null, selectedFileName: null });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleStudentPassportFile = (event) => {
    if (event.target.files[0]) {
      setStudentPassportFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name,
      });
    } else {
      setStudentPassportFile({ selectedFile: null, selectedFileName: null });
    }
  };
  const handleAnotherFieldFile = (event) => {
    if (event.target.files[0]) {
    setAnotherFieldFile({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name,
    });
  }else{
    setAnotherFieldFile({ selectedFile: null, selectedFileName: null });
  }
  };
  const handleMothersIdFile = (event) => {
    if (event.target.files[0]) {
    setMothersIdFile({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name,
    });
  }else{
    setMothersIdFile({ selectedFile: null, selectedFileName: null });
  }
  };
  const handleCertificateFile = (event) => {
    if (event.target.files[0]) {
    setCertificateFile({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name,
    });
  }else{
    setCertificateFile({ selectedFile: null, selectedFileName: null });
  }
  };
  const handleMedicalFile = (event) => {
    if (event.target.files[0]) {
    setMedicalFile({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name,
    });
  }else{
    setMedicalFile({ selectedFile: null, selectedFileName: null });
  }
  };

  const handleUpdate = async (e) => {
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

      const [studentPassportFileUrl, anotherFieldFileUrl, mothersIdFileUrl, certificateFileUrl, medicalRecordFileUrl] =
        urls;
       

      const studentData = {
        state,
        studentPassportFileUrl: studentPassportFileUrl ? studentPassportFileUrl : state.studentPassportFileUrl,
        anotherFieldFileUrl: anotherFieldFileUrl ? anotherFieldFileUrl : state.anotherFieldFileUrl,
        mothersIdFileUrl: mothersIdFileUrl ? mothersIdFileUrl : state.mothersIdFileUrl,
        certificateFileUrl: certificateFileUrl ? certificateFileUrl : state.certificateFileUrl,
        medicalRecordFileUrl: medicalRecordFileUrl ? medicalRecordFileUrl : state.medicalRecordFileUrl,
      };
      setLoading(true);
      dispatch(updateStudent(studentData, navigate, setLoading));
    } catch (error) {
      // setLoading(false);
      console.error('Error uploading images: ', error);
      // notifyErrorFxn("Error occured uploading Images");
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2} alignItems="center">
          <EditStudentToggleSwitch
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            handleOne={handleOne}
            handleTwo={handleTwo}
            handleThree={handleThree}
          />
          <Grid item sx={{ mb: 2 }}></Grid>
          <Grid item sx={{ mb: 2 }}></Grid>
        </Grid>
        <br />

        <Grid container spacing={2}>
          <Grid item xs={8} md={12} lg={12}>
          {activeButton === '1' && ( <ProfileInfo studentData={state} handleUpdate={handleUpdate} handleChange={handleChange} loading={loading}/> )}
            <br /><br/>
            <div style={{ background: '#F8F8F8', padding: '10px' }}>
              {activeButton === '1' && (
                <EditBasicInfo
                  state={state}
                  handleChange={handleChange}
                  handleUpdate={handleUpdate}
                  loading={loading}
                />
              )}
              {activeButton === '2' && (
                <EditAdditionalInfo
                  state={state}
                  handleChange={handleChange}
                  handleUpdate={handleUpdate}
                  loading={loading}
                />
              )}
              {activeButton === '3' && (
                <EditDocInfo
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
                  state={state}
                  handleChange={handleChange}
                  handleUpdate={handleUpdate}
                  loading={loading}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
