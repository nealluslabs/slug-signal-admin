import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, FormControl, Box, Select, MenuItem, Button, TextField } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyGroups } from 'src/redux/actions/group.action';
import { fetchUserData, updateProfile  /*, updateUserSettings, uploadProfileSettings*/ } from 'src/redux/actions/auth.action';

import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';





export default function SettingsPage() {


  const theme = useTheme();

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '4rem',
      paddingRight: '4rem',
    },
    searchInput: {
      background: 'white',
      border: '0px solid #00000026',
      padding: '0px',
     
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
    
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [loading, setLoading] = useState(false);

  const {user} = useSelector((state) => state.auth)

  

  const classes = useStyles();

  const [state, setState] = useState({
    /*fname:  "",
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
    specialInstruction: "",*/
    oldPassword:" ",
    password:" "
  })

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  }



  return (
    <>

      <Container maxWidth="xl">
    
          <br/>
          
        <Grid container spacing={2}>
            <Grid item xs={8} md={12} lg={12}>
              <div style={{background: '#F8F8F8',  padding: '10px'}}>
              <Typography sx={{ mt: 2, mb: 1, py: 1, ml: 5, color: '#000000', fontSize: '18px' }}>
              <b>{'Set Password'}</b>
            
            </Typography>
            {/*<Divider />*/}
            <br />
            
            <Grid container spacing={4} style={{display:"flex",justifyContent:"center",gap:"2rem",paddingBottom:"3rem"}}>
        <Grid item xs={5}>
          <Typography variant="subtitle1" style={{marginBottom:"1rem"}}>Old Password</Typography>
          <TextField
            name="oldPassword"
            placeholder="Old Password"
            fullWidth
            value={state.oldPassword}
            onChange={handleChange}
            className={classes.searchInput}
           
            InputProps={{
              
              style:{
               
                width:"100%",
                height:"3rem",
                backgroundColor:"white",
                border:"0px solid lightgrey",
                padding:"10px"
              }
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="subtitle1" style={{marginBottom:"1rem"}}>New Password</Typography>
          <TextField
            name="password"
            placeholder="New Password"
            fullWidth
            value={state.password}
            onChange={handleChange}
            className={classes.searchInput}
            InputProps={{
              disableUnderline: true,
              style:{
                height:"3rem",
                backgroundColor:"white",
                width:"100%",
                border:"0px solid lightgrey",
                padding:"10px"
              }
            }}
          />
         </Grid>
        </Grid>
                </div>
                
                 <br/>
                

              


          <center style={{marginTop:"1rem"}}>
            <Button disabled={false} variant="contained" onClick={()=>{
              //dispatch(updateProfile(state, user.id))
            }}
              style={{ minWidth: '125px', backgroundColor: "#21712E", marginLeft:  '1rem', paddingTop: '15px', paddingBottom: '15px', paddingLeft: '20px' }}>
              Submit
            </Button>
          </center>

            </Grid>
            
          </Grid>
      </Container>
    </>
  );
}
