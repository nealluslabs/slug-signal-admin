import * as React from 'react';
import Typography from '@mui/material/Typography';
// import Title from './title';
import { Button, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fCurrency } from 'src/utils/formatNumber';
import PieChartOne from './pie-chart-one';
import PieChartTwo from './pie-chart-two';
import redboy from 'src/assets/images/redboy.jpeg';

function preventDefault(event) {
  event.preventDefault();
}

export default function CropDetailsCard({ headerOne, headerTwo, value, type,image,farmerName,farmName,phoneNumber,email,city }) {
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
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
           
            <Typography
              color="textPrimary"
              variant="h6"
              component="p"
              style={{ color: '#9291A5', fontSize: '16.23px' }}
            >
              Deposits
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
          
          <img src={image} style={{marginLeft:"2rem",marginBottom:"1rem",height:"9rem",width:"11rem",borderRadius:"1.5rem"}} alt="athlete image"/>
       
         
          <div style={{display:"flex",flexDirection:"column",width:"50%",alignItems:"center",justifyContent:"center",gap:"1rem"}}>
           
            <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-start",textAlign:"left"}}>
            
            <div> 
           {farmerName}
            </div>
       
         {type==="one" &&
            <div>
           {farmName}
            </div>
         }
            <div>
            {phoneNumber}
            </div>


           {/* <div>
            {email}
            </div>
        */}

        {type==="one" &&
            <div>
            {city}
            </div>
          }

            </div>

            

           
        {type!=="one" &&
            <Button
                variant={'contained'}
                style={{
                  minHeight: '30px',
                  minWidth: '120px',
                  backgroundColor: '#2DA840',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  marginRight: '4px',
                }}
               onClick={()=>{navigate('/dashboard/individual-campaign')}}
              >
               Contact
              </Button>
           }


          </div>
        </Grid>
      </Grid>
      <br />
    </>
  );
}
