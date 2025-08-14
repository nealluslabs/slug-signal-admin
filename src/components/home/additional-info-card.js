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

export default function AdditionalInfoCard({data/* headerOne, headerTwo, value, type,image,farmerName,farmName,phoneNumber,email,city*/ }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  console.log("addITIONAL INFO HOMEPAGE FARMER DATA--->",data)
  return (
    <>
      <Grid container alignItems="center" style={{ padding: '10px' }}>
        <Grid item xs={6}>
          <Typography color="textPrimary" variant="h6" component="p" style={{ color: '#000000', fontSize: '22.23px' }}>
            {/*headerOne*/'Additional Info'}
          </Typography>
          <Typography color="textPrimary" variant="h6" component="p" style={{ color: '#000000', fontSize: '24.33px' }}>
            <b>{/*headerTwo*/}</b>
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
           {/* THESE USED TO BE THE WORDS AT THE FAR RIGHT OF THE CARD BUT I AM NOT USING THEM ANYMORE
            <Typography
              color="textPrimary"
              variant="h6"
              component="p"
              style={{ color: '#9291A5', fontSize: '16.23px' }}
            >
              Deal Expense
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
              component="p"
              style={{ color: '#000000', fontSize: '20.33px' }}
            >
              <b>{value}</b>
            </Typography>
           */
           }
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <br />

      <Grid container alignItems="center"  style={{display:"flex",justifyContent:"center"}}>
        <Grid item xs={12} style={{ textAlign: 'center',height:"10rem",display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem",width:"90%",fontSize:"1rem" ,paddingLeft:"3rem"}}>
          
         
       
         
          
           
            <div style={{display:"flex",width:"40%",flexDirection:"column",justifyContent:"center",gap:"2rem"}}>
            
            <div style={{display:"flex",justifyContent:"space-between",width:"80%"}}> 
            <div  style={{width:"50%",textAlign:"left"}}>Age</div>   <div  style={{width:"50%",textAlign:"left"}}>{data && data.age && data.age}</div> 
           </div>

           <div style={{display:"flex",justifyContent:"space-between",width:"80%"}}> 
            <div  style={{width:"50%",textAlign:"left"}}>Harvest Size </div>   <div  style={{width:"50%",textAlign:"left"}}>{data && data.lastHarvest ? data.lastHarvest: data && data.harvestSize? data.harvestSize:"0"} {((data.lastHarvest && !data.lastHarvest.includes("ons")) || (data.harvestSize && !data.harvestSize.includes("on")) )&& "Ton(s)"}</div> 
           </div>


           <div style={{display:"flex",justifyContent:"space-between",width:"80%"}}> 
            <div  style={{width:"50%",textAlign:"left"}}>Farm Size </div>   <div  style={{width:"50%",textAlign:"left"}}>{data && data.farmSize ? data.farmSize:data.farm_size ? data.farm_size:"0"}  {((data.farmSize && !data.farmSize.includes("ectares")) || (data.farm_size && !data.farm_size.includes("ectare")) ) && " Hectare(s)"} </div> 
           </div>


            </div>

          

         


          <div style={{display:"flex",flexDirection:"column",width:"40%",alignItems:"center",justifyContent:"center",gap:"2rem",position:"relative",left:"-5rem"}}>
           
           <div style={{display:"flex",justifyContent:"space-between",width:"80%"}}> 
            <div  style={{width:"50%",textAlign:"left"}}>Chemicals</div>   <div  style={{width:"50%",textAlign:"left"}}>{data && data.typeOfChemical && data.typeOfChemical}</div> 
           </div>

           <div style={{display:"flex",justifyContent:"space-between",width:"80%"}}> 
            <div  style={{width:"50%",textAlign:"left"}}>Organic Farming </div>   <div  style={{width:"50%",textAlign:"left"}} >{data && data.organicFarmingInterest && data.organicFarmingInterest}</div> 
           </div>


           <div style={{display:"flex",justifyContent:"space-between",width:"80%"}}> 
            <div style={{width:"50%",textAlign:"left"}} >Distribution </div>   <div style={{width:"50%",textAlign:"left"}} >{data && data.market && data.market}</div> 
           </div>

          </div>
        </Grid>

        <Grid item xs={10} style={{ textAlign: 'center',height:"3rem",display:"flex",justifyContent:"flex-start",alignItems:"flex-end",gap:"1rem",fontSize:"1rem",paddingLeft:"3rem",position:"relative",left:"0.5rem"}}>
         
         <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"flex-start",justifyContent:"flex-start",gap:"2rem",position:"relative",left:"0rem"}}>
          
         <div style={{display:"flex",justifyContent:"flex-start",width:"100%"}}> 
          <div style={{width:"100%",textAlign:"left"}} >GPS Stamp:&nbsp;&nbsp;&nbsp;  {data && data.location
           && data.location.split(',').map((item,index)=>(
           <span style={{marginRight:"1rem"}}> {item}{index !== data.location.split(',').length ? ',':'.'} </span>

           ))

           } 
           
           
           </div>  
         </div>

         </div>


      </Grid>


      </Grid>
      <br />
    </>
  );
}
