import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography, Button, Select, MenuItem } from '@mui/material';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '4rem',
    paddingRight: '4rem',
  },
  searchInput: {
    background: 'white',
    border: '1px solid #00000026',
    padding: '10px',
    borderRadius: '8px',
    // marginRight: theme.spacing(2),
    width: '100%',
    minWidth: '100%',
    '& .MuiInputBase-input': {
      color: 'grey',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'grey',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'grey',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'grey',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'grey',
    },
  },
  searchButton: {
    color: '#fff',
    padding: '15px',
    minWidth: '45%',
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const EditDocInfo = ({
   state,  
   studentPassportFile,
  handleStudentPassportFile,
  anotherFieldFile,
  handleAnotherFieldFile,
  mothersIdFile,
  handleMothersIdFile,
  certificateFile,
  handleCertificateFile,
  medicalRecordFile,
  handleMedicalFile,
   handleChange, 
   handleUpdate, 
   loading}) => {
  const classes = useStyles();
console.log("STATE:::", state);


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="subtitle1">Doc Info</Typography>
      <div>
        <Button
          variant="contained"
          style={{
            minWidth: '125px',
            backgroundColor: 'transparent',
            border: '1px solid #000000',
            paddingTop: '15px',
            paddingBottom: '15px',
            paddingLeft: '20px',
            color: '#000000'
          }}
          disabled={loading}
          onClick={handleUpdate}
        >
          {loading ? "Loading..." : "Edit"}
        </Button>
        <Button
          variant="contained"
          style={{
            minWidth: '125px',
            backgroundColor: '#D72A34',
            marginLeft: '1rem',
            paddingTop: '15px',
            paddingBottom: '15px',
            paddingLeft: '20px',
            color: 'white'
          }}
        >
          Delete Info
        </Button>
      </div>
    </div>
     <br/>
     <div className={classes.root}>
<Grid container spacing={4} alignItems="center">
  {/* First set of TextField and Button */}
  <Grid item container xs={6} direction="row" alignItems="center">
    <Grid item xs={8}>
      <Typography variant="subtitle1">
        Student Passport (Format: PNG, JPEG, JPG)
      </Typography>
      <TextField
        name="fname"
        placeholder="Select a file"
        disabled
        fullWidth
        value={studentPassportFile.selectedFileName ? studentPassportFile.selectedFileName : state.studentPassportFile}
        onChange={handleChange}
        className={classes.searchInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Grid>
    <Grid item xs={4}>
      <Button
        component="label"
        variant="contained"
        style={{
          minHeight: '52px',
          minWidth: '145px',
          backgroundColor: '#000000',
          marginTop: '20px',
        }}
      >
        <b>Choose</b>
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handleStudentPassportFile}
        />
      </Button>
    </Grid>
  </Grid>

  {/* Second set of TextField and Button */}
  <Grid item container xs={6} direction="row" alignItems="center">
    <Grid item xs={8}>
      <Typography variant="subtitle1">
        Another Field (Format: PNG, JPEG, JPG)
      </Typography>
      <TextField
        name="anotherField"
        placeholder="Select a file"
        disabled
        fullWidth
        value={anotherFieldFile.selectedFileName ? anotherFieldFile.selectedFileName : state.anotherFieldFile}
        onChange={handleChange}
        className={classes.searchInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Grid>
    <Grid item xs={4}>
      <Button
        component="label"
        variant="contained"
        style={{
          minHeight: '52px',
          minWidth: '145px',
          backgroundColor: '#000000',
          marginTop: '20px',
        }}
      >
        <b>Choose</b>
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handleAnotherFieldFile}
        />
      </Button>
    </Grid>
  </Grid>

  {/* Third set of TextField and Button */}
  <Grid item container xs={6} direction="row" alignItems="center">
    <Grid item xs={8}>
      <Typography variant="subtitle1">
      Mother’s ID (Format: PNG,JPEG, JPG)
      </Typography>
      <TextField
        name="fname"
        placeholder="Select a file"
        disabled
        fullWidth
        value={mothersIdFile.selectedFileName ? mothersIdFile.selectedFileName : state.mothersIdFile}
        onChange={handleChange}
        className={classes.searchInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Grid>
    <Grid item xs={4}>
      <Button
        component="label"
        variant="contained"
        style={{
          minHeight: '52px',
          minWidth: '145px',
          backgroundColor: '#000000',
          marginTop: '20px',
        }}
      >
        <b>Choose</b>
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handleMothersIdFile}
        />
      </Button>
    </Grid>
  </Grid>

  {/* Fouth set of TextField and Button */}
  <Grid item container xs={6} direction="row" alignItems="center">
    <Grid item xs={8}>
      <Typography variant="subtitle1">
      All Certificates (Format: PDF)
      </Typography>
      <TextField
        name="anotherField"
        placeholder="Select a file"
        disabled
        fullWidth
        value={certificateFile.selectedFileName ? certificateFile.selectedFileName : state.certificateFile}
        onChange={handleChange}
        className={classes.searchInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Grid>
    <Grid item xs={4}>
      <Button
        component="label"
        variant="contained"
        style={{
          minHeight: '52px',
          minWidth: '145px',
          backgroundColor: '#000000',
          marginTop: '20px',
        }}
      >
        <b>Choose</b>
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handleCertificateFile}
        />
      </Button>
    </Grid>
  </Grid>

  {/* Fifth set of TextField and Button */}
  <Grid item container xs={6} direction="row" alignItems="center">
    <Grid item xs={8}>
      <Typography variant="subtitle1">
      All Relevant Medical Records (Format: PDF)
      </Typography>
      <TextField
        name="anotherField"
        placeholder="Select a file"
        disabled
        fullWidth
        value={medicalRecordFile.selectedFileName ? medicalRecordFile.selectedFileName : state.medicalRecordFile}
        onChange={handleChange}
        className={classes.searchInput}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Grid>
    <Grid item xs={4}>
      <Button
        component="label"
        variant="contained"
        style={{
          minHeight: '52px',
          minWidth: '145px',
          backgroundColor: '#000000',
          marginTop: '20px',
        }}
      >
        <b>Choose</b>
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handleMedicalFile}
        />
      </Button>
    </Grid>
  </Grid>


</Grid>
</div>
    </>
  );
};

export default EditDocInfo;
