import { createTheme, Container, ThemeProvider,Divider } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchCandidateData } from 'src/redux/actions/auth.action';
// @mui
import { useTheme, styled } from '@mui/material/styles';

import UBER from 'src/assets/images/uber.png'
import NETFLIX from 'src/assets/images/netflix.png'
import GITLAB from 'src/assets/images/gitlab2.png'
import CLOUDFLARE from 'src/assets/images/cloudflare.png'
import FOOTBALL from 'src/assets/images/footballcatch.jpeg'
import COCA from 'src/assets/images/coca.png'
import DONKEY from 'src/assets/images/donkey.jpeg'
import POTATO from 'src/assets/images/potato.jpeg'
import OKRA from 'src/assets/images/okra.jpeg'
import TOMATO from 'src/assets/images/tomato.jpeg'
import MUSIC from 'src/assets/images/music-box.jpeg'
import SHEEP from 'src/assets/images/sheep.jpeg'


import { ToastContainer } from 'react-toastify';

//react-icons
import { PiCaretRightBold } from "react-icons/pi"
import { FaPlus } from "react-icons/fa";
import Navbar from 'src/componentsMyNetwork/Navbar';


// const StyledContent = styled('div')(({ theme }) => ({
//   width: "100%",
//   margin: 'auto',
//   backgroundColor:"pink",
//   minHeight: '50vh',
//   display: 'flex',
//   gap:"0px",
//   justifyContent: 'flex-start',
 
//   flexDirection: 'column',
  
//   padding: theme.spacing(5, 5, 12, 5),
// }));


const RespContent = styled('div')(({ theme }) => ({
 
  [theme.breakpoints.up('md')]: {
   width:"100%",
   height:"100%"
  },
 
 
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    width:"100%",
    height:"100%"
  },
}));



// const RespGrid = styled('div')(({ theme }) => ({
//   [theme.breakpoints.down('md')]: {
//     gridTemplateColumns: "repeat(6, 1fr)",
//     justifyItems:"center",
//     alignItems:"center",
//     width:"100%",
    
//   },

//   [theme.breakpoints.up('md')]: {
//     gridTemplateColumns: "repeat(1, 1fr)",
//     width:"100%",
//   },
// }));


// const RespHeading = styled('div')(({ theme }) => ({
//   [theme.breakpoints.down('md')]: {
    
//     marginLeft:"3rem"
    
//   },


//   [theme.breakpoints.up('md')]: {
//     marginLeft:"3.5rem"
//   },

 


// }));

// const RespJoin = styled('div')(({ theme }) => ({
//   [theme.breakpoints.down('md')]: {
//     height:"25rem"
//   },

//   [theme.breakpoints.up('md')]: {
//     height:"81%"
//   },
// }));



export default function SlugDash() {
  const theme = useTheme();
 // const classes = useStyles()
  const [mode, setMode] = useState("dark");
const dispatch = useDispatch()

  const darkTheme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: '#FFF',   // Page background
        
      },
    },
  });
  const navigate = useNavigate();



const {user} = useSelector((state) => state.auth);

const [loading,setLoading] = useState(false)

const [waiting,setWaiting] =  useState(false)

 const [company1,setCompany1] = useState(false)
 const [company2,setCompany2] = useState(false)




// const loadAndNavigate = ()=>{

//   if(user && user.competitions && user.competitions.includes()){

//     setWaiting(true)

//    setTimeout( ()=>(navigate('/dashboard/football-goalscorers-results')),1800)
  
   
//   }
//  }



  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar active="slug-dashboard" />
      <Container maxWidth="xl" sx={{ marginTop:"5%", backgroundColor:"",fontFamily:"Inter, Poppins, sans-serif"}}>
        
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
  {
  
  <>

  <RespContent  style={{ display:'flex',  marginTop: '2%',gap:"1rem"}}>

{ 
     
     <Container   style={{display: 'flex',flexDirection:"column", justifyContent: 'flex-start',flex:2,paddingBottom:"1.5rem", border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px', backgroundColor:"#FFFFFF",height:"28rem" }}>    
      
        <div style={{height:"90%",paddingTop:"20px",display: 'flex',flexDirection:"column", justifyContent: 'flex-start'}}>
 
        <div style={{display:"flex", alignItems:"center",justifyContent:"flex-start",gap:"0.5rem"}}>
         
        <b style={{fontSize:"1.2rem"}}>NEW SIGNALS</b>
        
        </div>
 
        <Divider style={{marginTop:"0rem"}}/>
                <div style={{width:"100%",height:"70%",marginTop:"3rem", display:"flex",flexDirection:"column",backgroundColor:"#FBFBFB"}}>
      
      <div style={{width:"100%",flex:1,border:"0.5px solid #F0F0F0", display:"flex",justifyContent:"flex-start",alignItems:"center",padding:"0.5rem",gap:"4rem"}}>
      <img src={DONKEY} alt="company logo" style={{borderRadius:"50%",height:"45px"}}/>
      <p style={{fontSize:"15px"}}>HORSE - Man's First Best Friend</p>
      </div>

      <div  style={{width:"100%",flex:1,border:"0.5px solid #F0F0F0", display:"flex",justifyContent:"flex-start",alignItems:"center",padding:"0.5rem",gap:"4rem"}}>
      <img src={OKRA} alt="company logo" style={{borderRadius:"50%",height:"45px"}}/>
      <p style={{fontSize:"15px", marginLeft: '22px'}}>Okro - Health Benefits Of Okro</p>
      </div>

      <div  style={{width:"100%",flex:1,border:"0.5px solid #F0F0F0", display:"flex",justifyContent:"flex-start",alignItems:"center",padding:"0.5rem",gap:"4rem"}}>
      <img src={FOOTBALL} alt="company logo" style={{borderRadius:"50%",height:"45px"}}/>
      <p style={{fontSize:"15px"}}>  FOOTBALL - Tribute to Jota</p>
      </div>


</div>
   
      </div>




      <div style={{display:"flex",justifyContent:"flex-end",width:"100%"}}>
       <span onClick={()=>{navigate('')}}  style={{width:"3rem",height:"3rem",borderRadius:"50%",color:"white",backgroundColor:/*'#2E2779'*/ '#000000',display:"flex",justifyContent:"center",alignItems:"center"}}> <PiCaretRightBold /> </span>
      
       </div>
 
        
 
      </Container>
     
     }


{ 
     
     <Container   style={{display: 'flex',flexDirection:"column", justifyContent: 'flex-start',flex:2,paddingBottom:"1.5rem", border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px', backgroundColor:"#FFFFFF",height:"28rem" }}>    
     
        <div style={{height:"90%",paddingTop:"20px",display: 'flex',flexDirection:"column", justifyContent: 'flex-start'}}>
 
        <div style={{display:"flex", alignItems:"center",justifyContent:"flex-start",gap:"0.5rem"}}>
         
        <b style={{fontSize:"1.2rem"}}>MY SAVED SIGNALS</b>
        
        </div>
 
        <Divider style={{marginTop:"0rem"}}/>
   

        <div style={{width:"100%",height:"70%",marginTop:"3rem", display:"flex",flexDirection:"column",backgroundColor:"#FBFBFB"}}>
      
      <div style={{width:"100%",flex:1,border:"0.5px solid #F0F0F0", display:"flex",justifyContent:"flex-start",alignItems:"center",padding:"0.5rem",gap:"4rem"}}>
      <img src={POTATO} alt="company logo" style={{borderRadius:"50%",height:"45px", width: '45px'}}/>
      <p style={{fontSize:"15px"}}>POTATO - Hacks & Cooking Tips</p>
      </div>

      <div  style={{width:"100%",flex:1,border:"0.5px solid #F0F0F0", display:"flex",justifyContent:"flex-start",alignItems:"center",padding:"0.5rem",gap:"4rem"}}>
      <img src={NETFLIX} alt="company logo" style={{borderRadius:"50%",height:"45px"}}/>
      <p style={{fontSize:"15px"}}>NETFLIX - New Subscription Plan</p>
      </div>

      <div  style={{width:"100%",flex:1,border:"0.5px solid #F0F0F0", display:"flex",justifyContent:"flex-start",alignItems:"center",padding:"0.5rem",gap:"4rem"}}>
      <img src={COCA} alt="company logo" style={{borderRadius:"50%",height:"45px"}}/>
      <p style={{fontSize:"15px"}}>  GITLAB - Business Development Manager</p>
      </div>


</div>
   
      </div>




      <div style={{display:"flex",justifyContent:"flex-end",width:"100%"}}>
       <span onClick={()=>{navigate("")}}  style={{width:"3rem",height:"3rem",borderRadius:"50%",color:"white",backgroundColor:/*'#2E2779'*/ '#000000',display:"flex",justifyContent:"center",alignItems:"center"}}> <PiCaretRightBold /> </span>
      
       </div>
 
        
 
      </Container>
     
     }
 




</RespContent >


<RespContent  style={{ display:'flex',gap:"1rem", marginBottom: '5%'}}>



{ 
     
     <Container   style={{display: 'flex',flexDirection:"column", justifyContent: 'flex-start',flex:2,paddingBottom:"1.5rem", border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px' , backgroundColor:"#FFFFFF",height:"28rem",fontFamily:"Inter, Poppins, sans-serif" }}>    
      
      
    
       
        <div style={{height:"90%",paddingTop:"20px",display: 'flex',flexDirection:"column", justifyContent: 'flex-start'}}>
 
        <div style={{display:"flex", alignItems:"center",justifyContent:"flex-start",gap:"0.5rem"}}>
         
        <b style={{fontSize:"1.2rem"}}>MOST SAVED SIGNALS</b>
        
        </div>
 
        <Divider style={{marginTop:"0rem"}}/>
   

        <div style={{width:"100%",height:"70%",marginTop:"3rem", display:"flex",flexDirection:"column",backgroundColor:"#FBFBFB"}}>
      
            <div onClick={()=>{navigate('')}}
             style={{cursor:"pointer",width:"100%",flex:1,border:"0.5px solid #F0F0F0", display:"flex",justifyContent:"flex-start",alignItems:"center",padding:"0.5rem",gap:"4rem"}}>
            <img src={CLOUDFLARE} alt="company logo" style={{borderRadius:"50%",height:"45px"}}/>
            <p style={{fontSize:"15px"}}>CLOUDFARE - New Features</p>
            </div>
      
            <div onClick={()=>{navigate('')}}
             style={{cursor:"pointer",width:"100%",flex:1,border:"0.5px solid #F0F0F0", display:"flex",justifyContent:"flex-start",alignItems:"center",padding:"0.5rem",gap:"4rem"}}>
            <img src={UBER} alt="company logo" style={{borderRadius:"50%",height:"45px"}}/>
            <p style={{fontSize:"15px"}}>UBER - 20% Off All Rides This Month</p>
            </div>
      
            <div onClick={()=>{navigate('')}}
             style={{cursor:"pointer",width:"100%",flex:1,border:"0.5px solid #F0F0F0", display:"flex",justifyContent:"flex-start",alignItems:"center",padding:"0.5rem",gap:"4rem"}}>
            <img src={GITLAB} alt="company logo" style={{borderRadius:"50%",height:"45px"}}/>
            <p style={{fontSize:"15px"}}>  GITLAB - Better Than BitBucket ?</p>
            </div>


      </div>
   
      </div>

     




      <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
       <span onClick={()=>{setCompany1(true);setCompany2(false)}}  style={{width:"3rem",height:"3rem",borderRadius:"50%",color:"white",backgroundColor:/*'#2E2779'*/ '#000000',display:"flex",justifyContent:"center",alignItems:"center"}}> <FaPlus /> </span>
       <span onClick={()=>{navigate("")}}  style={{width:"3rem",height:"3rem",borderRadius:"50%",color:"white",backgroundColor:/*'#2E2779'*/ '#000000',display:"flex",justifyContent:"center",alignItems:"center"}}> <PiCaretRightBold /> </span>
       </div>
 
        
 
      </Container>
     
     }



{ 
     
     <Container   style={{display: 'flex',flexDirection:"column", justifyContent: 'flex-start',flex:2,paddingBottom:"1.5rem", border: '1px solid #0000001A',   marginTop: '2%', marginBottom: '2%', borderRadius: '15px' , backgroundColor:"#FFFFFF",height:"28rem" }}>    
      
      
    
       
        <div style={{height:"90%",paddingTop:"20px",display: 'flex',flexDirection:"column", justifyContent: 'flex-start'}}>
 
        <div style={{display:"flex", alignItems:"center",justifyContent:"flex-start",gap:"0.5rem"}}>
         
        <b style={{fontSize:"1.2rem"}}>TOP VIEWED SIGNALS</b>
        
        </div>
 
        <Divider style={{marginTop:"0rem"}}/>
   

        <div style={{width:"100%",height:"70%",marginTop:"3rem", display:"flex",flexDirection:"column",backgroundColor:"#FBFBFB"}}>
      
            <div onClick={()=>{navigate('')}}
             style={{cursor:"pointer",width:"100%",flex:1,border:"0.5px solid #F0F0F0", display:"flex",justifyContent:"flex-start",alignItems:"center",padding:"0.5rem",gap:"4rem"}}>
            <img src={SHEEP} alt="company logo" style={{borderRadius:"50%",height:"45px", width: '45px'}}/>
            <p style={{fontSize:"15px"}}>CATTLE - The Price Surge</p>
            </div>
      
            <div onClick={()=>{navigate('')}}
             style={{cursor:"pointer",width:"100%",flex:1,border:"0.5px solid #F0F0F0", display:"flex",justifyContent:"flex-start",alignItems:"center",padding:"0.5rem",gap:"4rem"}}>
            <img src={MUSIC} alt="company logo" style={{borderRadius:"50%",height:"45px", width: '45px'}}/>
            <p style={{fontSize:"15px"}}>BET - BET 20th Anniversary</p>
            </div>
      
            <div onClick={()=>{navigate('')}}
             style={{cursor:"pointer",width:"100%",flex:1,border:"0.5px solid #F0F0F0", display:"flex",justifyContent:"flex-start",alignItems:"center",padding:"0.5rem",gap:"4rem"}}>
            <img src={TOMATO} alt="company logo" style={{borderRadius:"50%",height:"45px", width: '45px'}}/>
            <p style={{fontSize:"15px"}}>  TOMATOHOLIC - Addicted To Ketchup?</p>
            </div>


      </div>
   
      </div>

     




      <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
       <span onClick={()=>{setCompany1(true);setCompany2(false)}}  style={{width:"3rem",height:"3rem",borderRadius:"50%",color:"white",backgroundColor:/*'#2E2779'*/ '#000000',display:"flex",justifyContent:"center",alignItems:"center"}}> <FaPlus /> </span>
       <span onClick={()=>{navigate("")}}  style={{width:"3rem",height:"3rem",borderRadius:"50%",color:"white",backgroundColor:/*'#2E2779'*/ '#000000',display:"flex",justifyContent:"center",alignItems:"center"}}> <PiCaretRightBold /> </span>
       </div>
 
        
 
      </Container>
     
     }
</RespContent>


</>
}
      </Container>
    </ThemeProvider>
  );
}