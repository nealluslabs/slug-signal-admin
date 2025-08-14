import React ,{useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './letter.css'
import Nav from '../nav/Nav'
//import { setRecruiter,setDemo } from 'src/redux/reducers/auth.slice'
import { useDispatch } from 'react-redux'
import { Box, Button, Grid } from '@mui/material'
/*import laptop from 'src/assets/images/laptop.svg'



import LoanSlider from './LoanSlider'*/

import CustomSearchBar from 'src/components/global/CustomSearchBar'

const Letter = () => {

   const [input,setInput] = useState(1000)
   const navigate= useNavigate()
   const dispatch = useDispatch()

   const handleChange = (e) => {
    setInput(e.target.value);
    console.log("this is the parent speaking,we are in letter")
  };

  return (
    
   
    <header className="letter-pm">
    {/*<Nav/>*/}
    <div className="container-pm letter__container-1">
      

      <div className="letterExplainer">
         <h2 className="text-light" style={{marginBottom:"0rem",color:"black"}}>Join Our Newsletter </h2>
   
         
            <p className="text-light" style={{maxWidth:"50%",margin:"0 auto",marginBottom:"-1rem",marginTop:"1rem",color:"grey",fontSize:"22px"}}>
            The modern approach to engaging sports audiences digitally
           </p>
        
   
           <div className="letter-btn-placement" >
           
           
   
             {/* <button onClick ={()=>{navigate('/login')}} className="btn">
                Register
  </button> */}

              <Grid item xs={12} sx={{ display: 'flex',alignItems: 'center',marginTop:"2rem" }}>
               <Box sx={{ width: '21rem' }}>
                 <CustomSearchBar title=" "/>
               </Box>
               
               <Box  sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                 <Button
                 
                   variant="contained"
                   onClick={()=>{navigate('/login')}}
                   style={{ minHeight: '50px', minWidth: '230px', backgroundColor:'#D72A34' ,fontSize:"1.1rem"}}
                 >
                   Register
                 </Button>
               </Box>
             </Grid>
     
     
             
            </div>

      </div>
     
    

    </div>


    </header>
    
  )
}

export default Letter