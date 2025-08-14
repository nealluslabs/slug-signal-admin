import { useState, useEffect } from 'react';
import { Button, Typography, TextField, Grid,Container, FormControl, Select, MenuItem} from '@mui/material';
import {Box,Icon,CardMedia,CssBaseline, makeStyles} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProfile, uploadImage, uploadProfileImage } from 'src/redux/actions/auth.action';


const useStyles = makeStyles((theme) => ({
  textField: {
  padding: '8px',
   border: '0px solid grey',
  },
  paper: {
    display: "flex",
    width: "auto",
  },
  grid: {
    width: "auto",
  },
  arrow: {
    padding: theme.spacing(3),
  },
  box: {
  //   padding: theme.spacing(3),
    paddingLeft: theme.spacing(8),
  },
}));

export default function ProfileInfo({studentData, handleUpdate, handleChange, loading}) {
  const classes = useStyles();
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    let today = new Date().toISOString().slice(0, 10);
    let nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    let nextMonthDate = nextMonth.toISOString().slice(0, 10);

  

useEffect(() => {
  console.log("STUDENDT_DATA::", studentData);
}, [])


   
  return (
    <>
  <Container maxWidth="xl" style={{height: '35%', background: '#F9F9F9', border: '0px solid red' }}>
  <CssBaseline />
  <form>
    <Grid container spacing={2} style={{paddingTop: '2%'}}>
        <Grid item>
        <CardMedia
            style={{ border: '0.2px solid black', backgroundColor: '#fff', width: '240px' }}
            component="img"
            height="240"
            width="540"
            image={studentData.studentPassportFile}
            alt="IMG"
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div" style={{fontWeight: '600', fontSize: '32px', lineHeight: '36px', color: '#000000'}}>
                {studentData?.fname + ' ' + studentData?.lname}
              </Typography>
              <Typography style={{fontWeight: '400', fontSize: '25px', lineHeight: '26px', color: '#000000', marginBottom: '20px'}}>
              {studentData?.class}
              </Typography>
              <Typography style={{fontWeight: '400', fontSize: '25px', lineHeight: '26px', color: '#000000', marginBottom: '20px'}}>
                ID: {studentData?.studentId}
              </Typography>
              <Typography style={{fontWeight: '400', fontSize: '25px', lineHeight: '26px', color: '#000000', marginBottom: '20px'}}>
                Guardian: {studentData?.guardianName}
              </Typography>
              <Typography style={{fontWeight: '600', fontSize: '32px', lineHeight: '36px', color: '#D72A34', marginBottom: '20px'}}>
               <b>{studentData?.paymentStatus}</b>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs container direction="column" spacing={2}>
          <Grid item xs  style={{marginTop: '30px'}}>
          <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={studentData.paymentStatus}
            name="paymentStatus"
            onChange={handleChange}
            displayEmpty
            label=""
            sx={{
              minHeight: 30,
              minWidth: 250,
              p: 1,
            }}
          >
            <MenuItem value={"Not Paid"}>Not Paid</MenuItem>
            <MenuItem value={"Paid"}>Paid</MenuItem>
          </Select>
        </FormControl>
        <br/><br/>
          <FormControl sx={{ minWidth: 200 }}>
          <Button onClick={handleUpdate} disabled={loading} component="label" variant="contained" style={{ minHeight: '45px', minWidth: '250px', backgroundColor: 'black' }}>
            <b>{loading ? 'Loading...' : 'UPDATE'}</b>
          </Button>
        </FormControl>
            </Grid>
           
          </Grid>
      
        </Grid>
      </Grid>
  </form>
</Container>

    </>
  );
}
