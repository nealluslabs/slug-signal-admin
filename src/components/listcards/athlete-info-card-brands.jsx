import * as React from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Button, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fCurrency } from 'src/utils/formatNumber';
//import PieChartOne from './pie-chart-one';
//import PieChartTwo from './pie-chart-two';
import redboy from 'src/assets/images/redboy.jpeg';
import { FaFacebook, FaInstagramSquare, FaTwitter } from 'react-icons/fa';

function preventDefault(event) {
  event.preventDefault();
}

export default function AthleteInfoCardBrands({ headerOne, headerTwo, value, type,image }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  
  return (
    <>
      <Grid container alignItems="center" style={{ padding: '10px' }}>
        <Grid item xs={6}>
          <Typography color="textPrimary" variant="h6" component="p" style={{ color: '#9291A5', fontSize: '16.23px' }}>
            {headerOne}
          </Typography>
          <Typography color="textPrimary" variant="h6" component="p" style={{ color: '#000000', fontSize: '20.33px' }}>
            <b>{headerTwo}</b>
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            border: '0px solid red',
            minHeight: '25px',
            minWidth: '100px',
          }}
        >
          <Grid item xs={6} sx={{  textAlign: 'right',display:"flex",flexDirection:"column",justifyContent:"flex-end", alignItems:"flex-end"}}>
            <Typography
              color="textPrimary"
              variant="h6"
              component="p"
              style={{ color: '#9291A5', fontSize: '16.23px',width:"10rem",display:"flex",flexDirection:"column",justifyContent:"flex-end" }}
            >
              Contract Fee
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
              component="p"
              style={{ color: '#000000', fontSize: '20.33px' }}
            >
              <b>{value}</b>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <br />

      <Grid container alignItems="center">
        <Grid item xs={12} style={{ textAlign: 'center',height:"10rem",display:"flex", }}>
          
          {/*<img src={image} style={{marginLeft:"2rem",marginBottom:"1rem",height:"8rem",width:"10rem",borderRadius:"1.5rem"}} alt="athlete image"/>*/}
       
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"0rem",fontSize:"1rem",paddingLeft:"1rem"}}>
           <p style={{marginTop:"-0.7rem"}}>587 CONTINUUM ARC STREET</p>
           <p style={{marginTop:"-0.7rem"}}>ATLANTA, GEORGIA 23005</p>
           <p style={{marginTop:"-0.7rem"}}>UNITED STATES</p>
           <p style={{marginTop:"-0.7rem"}}>701-555-0000</p>
           <p style={{marginTop:"-0.7rem"}}>NORMANSTEVEN@GMAIL.COM</p>

           <div style={{display:"flex",flexDirection:"row",gap:"0.6rem",marginTop:"-0.3rem"}}>
          <FaFacebook  style={{fontSize:"1.9rem"}}/>
          <FaInstagramSquare style={{fontSize:"1.9rem"}} />
          <FaTwitter style={{fontSize:"1.9rem"}} />

          </div>

          </div>


      


        </Grid>
      </Grid>
      <br />
    </>
  );
}
