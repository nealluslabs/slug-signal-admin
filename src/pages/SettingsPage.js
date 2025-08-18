import { Helmet } from 'react-helmet-async';
import {
  Grid,
  createTheme,
  Container,
  ThemeProvider,
   Typography,
  FormControl,
  Box,
  Select,
  MenuItem,
  Button,
  TextField,
  Input,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyGroups } from 'src/redux/actions/group.action';
import {
  fetchUserData,
  updateProfile /*, updateUserSettings, uploadProfileSettings*/,
} from 'src/redux/actions/auth.action';
import Navbar from 'src/componentsMyNetwork/Navbar';
import Header from 'src/layouts/dashboard/header';

import merge from 'lodash/merge';
// @mui
import { useTheme, styled } from '@mui/material/styles';

export default function SettingsPage() {
  const theme = useTheme();

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      paddingRight: '4rem',
      fontFamily: 'Poppins',
      backgroundColor: '#d71111ff',
      minHeight: '100vh',
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

  const { user } = useSelector((state) => state.auth);

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
    oldPassword: '',
    password: '',
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("dark");
  
  
    const darkTheme = createTheme({
      palette: {
        mode: mode,
        background: {
          default: '#FFF',   // Page background
          
        },
      },
    });

  return (
    <ThemeProvider  theme={darkTheme}>
      <Navbar active="settings" />
      <Container
        maxWidth="xl"
        style={{width: '100%', backgroundColor: '#ffffff', fontFamily: 'Poppins' }}
      >
        {/* <Header onOpenNav={() => setOpen(true)} style={{ fontFamily: 'Poppins' }} /> */}
      </Container>
      <Container
        maxWidth="xl"
        style={{  marginLeft: '15%', width: 'calc(100% - 15%)', backgroundColor: '#ffffff', fontFamily: 'Poppins' }}
      >
        <br />
        <Grid container spacing={3}>
          <Grid item xs={8} md={12} lg={12}>
            <div style={{ background: '#ffffff', padding: '10px', width: '100%', minHeight: '100vh' }}>
              <Typography
                sx={{ mt: 12, mb: 1, py: 1,ml:2, color: '#000000', fontSize: '18px', fontFamily: 'Poppins' }}
              >
                <b>Reset Password</b>
              </Typography>
              {/*<Divider />*/}
              <br />

              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-around"
                paddingRight={15}
                style={{ paddingBottom: '3rem', fontFamily: 'poppins' }}
              >
                <Grid item xs={12} md={3} lg={4.5}>
               
                  <Input
                    name="oldPassword"
                    placeholder="Old Password"
                    autoComplete="current-password"
                    value={state.oldPassword}
                    onChange={handleChange}
                    InputProps={{
                      disableUnderline: true,
                    }}                
                    style={{
                      width: '100%',
                      height: '2.91rem',
                      border: '1px solid #000000',
                      color: '#000000',
                      fontSize: '1rem',
                      padding: '0.5rem',
                      fontFamily: 'poppins',
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={3} lg={4.5}>
                    <Input
                    name="password"
                    fullWidth
                    value={state.password}
                    onChange={handleChange}
                    placeholder="New Password"
                    InputProps={{
                      disableUnderline: true,
                    }}               
                    style={{
                      width: '100%',
                      height: '2.91rem',
                      border: '1px solid #000000',
                      color: '#000000',
                      fontSize: '1rem',
                      padding: '0.5rem',
                      fontFamily: 'poppins',
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={2} style={{}}>
                  <Button
                    variant="contained"
                    // fullWidth
                    style={{
                      backgroundColor: '#000000',
                      height: '3rem',
                      textTransform: 'none',
                      width: '14.25rem',
                      color: '#ffffff'
                    }}
                    onClick={() => {
                      dispatch(updateProfile(state, user.id))
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
