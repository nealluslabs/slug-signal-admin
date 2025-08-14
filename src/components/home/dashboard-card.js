import * as React from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Button, Divider, FormControl, Grid, MenuItem,Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fCurrency } from 'src/utils/formatNumber';

import FormControlContext from '@mui/material/FormControl/FormControlContext';


function preventDefault(event) {
  event.preventDefault();
}

export default function DashboardCard({header, value, img, type}) {
  const { user } = useSelector((state) => state.auth);
  return (
    <div  >
     <Grid container alignItems="flex-start"  style={{position:"relative"}} >
      <Grid item xs={type === "last"?6:12}>
      <Typography color="textPrimary" variant="h6" component="p" style={{color: '#000000', fontSize: '17px'}}>
        <b>{header}</b>
      </Typography>
      </Grid>
      {type === "last" && (
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', border: '0px solid red', minHeight: '35px', minWidth: '200px',position:"absolute",top:"-0.5rem",right:"0rem"}}>
      


          <FormControl sx={{ minWidth: 140, background: 'white' }}>
          <Select
            value={"Monthly"}
            onChange={(e) => {console.log(e.target.value)}}
            displayEmpty
            label=""
            sx={{
              height: 45,
              minWidth: 120,
              p: 1,
            }}
          >
            <MenuItem value="">
              Filter By
            </MenuItem>
            <MenuItem value={"Monthly"}>Monthly</MenuItem>
            <MenuItem value={"Annually"}>Annually</MenuItem>
           
          </Select>
        </FormControl>

        </Grid>
      )}
    </Grid>

      <br/>
      <Grid container alignItems="center" justifyContent="center" style={{marginTop:"-1.4rem"}} >
      <Grid item xs={12} >
        <Typography color="textPrimary" variant="h1" component="p" style={{color: '#000000', fontSize: '40px'}}>
          <b>{value}</b>
        </Typography>
      </Grid>

     {/* <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', border: '0px solid red' }}>
        <img src={img} alt="Your Image" style={{ maxWidth: '100%', height: 'auto', border: '0px solid green' }} />
        </Grid> */}

    </Grid>
     {/* <br />*/}
    </div>
  );
}
