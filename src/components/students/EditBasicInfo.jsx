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

const EditBasicInfo = ({state, handleChange, handleUpdate, loading}) => {
  const classes = useStyles();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="subtitle1" style={{color: '#000000'}}><b>Basic Information</b></Typography>
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
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">First Name</Typography>
          <TextField
            name="fname"
            placeholder="First name"
            fullWidth
            value={state.fname}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Last Name</Typography>
          <TextField
            name="lname"
            placeholder="Last name"
            fullWidth
            value={state.lname}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Date Of Birth</Typography>
          <TextField
            type="date"
            name="dob"
            placeholder="01/01/1999"
            fullWidth
            value={state.dob}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Gender</Typography>
          <select
            name="gender"
            value={state.gender}
            onChange={handleChange}
            className={classes.searchInput}
            style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Registration ID</Typography>
          <TextField
            name="registrationId"
            type="number"
            placeholder="00037278488"
            fullWidth
            value={state.registrationId}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Studentship Type</Typography>
          <select
            name="studentshipType"
            value={state.studentshipType}
            onChange={handleChange}
            className={classes.searchInput}
            style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
            required
          >
            <option value=""></option>
            <option value="Male">Boarding</option>
            <option value="Female">Day</option>
          </select>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Class</Typography>
          <select
            name="class"
            value={state.class}
            onChange={handleChange}
            className={classes.searchInput}
            style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
            required
          >
            <option value="">Select Class</option>
            <option value="JSS 1">JSS 1</option>
            <option value="JSS 2">JSS 2</option>
            <option value="JSS 3">JSS 3</option>
            <option value="SS 1">SS 1</option>
            <option value="SS 2">SS 2</option>
            <option value="SS 3">SS 3</option>
            {/* {Array.from({ length: 12 }, (_, index) => (
              <option key={`level-${index + 1}`} value={`Level ${index + 1}`}>
                Level {index + 1}
              </option>
            ))} */}
          </select>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Section</Typography>
          <select
            name="section"
            value={state.section}
            onChange={handleChange}
            className={classes.searchInput}
            style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
            required
          >
            <option value=""></option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Guardian Name (if any)</Typography>
          <TextField
            name="guardianName"
            placeholder="Enter name"
            fullWidth
            value={state.guardianName}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
      </Grid>
    </div>
    </>
  );
};

export default EditBasicInfo;
