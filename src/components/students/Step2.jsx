import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, TextareaAutosize, Typography, Button, MenuItem, Select } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import { countriesList } from 'src/utils/countries';

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

const Step2 = ({state, handleChange}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Blood Group</Typography>
          <select
            name="bloodGroup"
            value={state.bloodGroup}
            onChange={handleChange}
            className={classes.searchInput}
            style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Religion</Typography>
          <select
            name="religion"
            value={state.religion}
            onChange={handleChange}
            className={classes.searchInput}
            style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
            required
          >
            <option value="">Select Religion</option>
            <option value="Islam">Islam</option>
            <option value="Christianity">Christianity</option>
          </select>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Phone Number</Typography>
          <TextField
            name="phoneNumber"
            type="number"
            placeholder="+234 903825810"
            fullWidth
            value={state.phoneNumber}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Email Address</Typography>
          <TextField
            name="email"
            type="email"
            placeholder="Enter Email"
            fullWidth
            value={state.email}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Skin Colour</Typography>
          <select
            name="skinColor"
            value={state.skinColor}
            onChange={handleChange}
            className={classes.searchInput}
            style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
            required
          >
            <option value="">Select Skin Color</option>
            <option value="Fair">Fair</option>
            <option value="Light">Light</option>
            <option value="Medium">Medium</option>
            <option value="Olive">Olive</option>
            <option value="Brown">Brown</option>
            <option value="Dark">Dark</option>
            <option value="Black">Black</option>
          </select>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Eye Colour</Typography>
          <select
            name="eyeColor"
            value={state.eyeColor}
            onChange={handleChange}
            className={classes.searchInput}
            style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
            required
          >
            <option value="">Select Eye Color</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Brown">Brown</option>
            <option value="Hazel">Hazel</option>
            <option value="Gray">Gray</option>
            <option value="Amber">Amber</option>
            <option value="Black">Black</option>
          </select>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Height</Typography>
          <select
            name="height"
            value={state.height}
            onChange={handleChange}
            className={classes.searchInput}
            style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
            required
          >
            <option value="">Select Height</option>
            <option value="Below 5'0">Below 5'0"</option>
            <option value="5'0 to 5'4">5'0" to 5'4"</option>
            <option value="5'5 to 5'8">5'5" to 5'8"</option>
            <option value="5'9 to 6'0">5'9" to 6'0"</option>
            <option value="Above 6'0">Above 6'0"</option>
          </select>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Nationality</Typography>
          <select
            name="nationality"
            value={state.nationality}
            onChange={handleChange}
            className={classes.searchInput}
            style={{ minHeight: '50px', fontSize: '17px', outline: '1px solid #eee' }}
            required
          >
            <option value="">Select Nationality</option>
            {countriesList.map((nationality) => (
              <option key={nationality.code} value={nationality.name}>
                {nationality.name}
              </option>
            ))}
          </select>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1">Admission Date</Typography>
          <TextField
            name="admissionDate"
            type="date"
            placeholder="02/12/2020"
            fullWidth
            value={state.admissionDate}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Admission Terminated</Typography>
          <TextField
            name="admissionTerminated"
            type="date"
            placeholder="02/12/2020"
            fullWidth
            value={state.admissionTerminated}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Medical History</Typography>
          <TextField
            name="medicalHistory"
            placeholder="Give detailed info"
            fullWidth
            multiline
            rows={4} // Set the initial number of rows
            maxRows={6} // Set the maximum number of rows
            value={state.medicalHistory}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
              style: {
                minHeight: '100px', // Set the minHeight to your desired value
                fontSize: '16px',
                padding: '8px',
                //   border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical', // Allow vertical resizing
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Any Special Instruction</Typography>
          <TextField
            name="specialInstruction"
            placeholder="Give detailed info"
            fullWidth
            multiline
            rows={4} // Set the initial number of rows
            maxRows={6} // Set the maximum number of rows
            value={state.specialInstruction}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
              style: {
                minHeight: '100px', // Set the minHeight to your desired value
                fontSize: '16px',
                padding: '8px',
                //   border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical', // Allow vertical resizing
              },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Step2;
