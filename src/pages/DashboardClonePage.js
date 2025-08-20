import Sidebar from "../componentsMyNetwork/Sidebar";
import Feed from "../componentsMyNetwork/Feed";
import Rightbar from "../componentsMyNetwork/Rightbar";
import { Box, Button, createTheme, IconButton, Stack, ThemeProvider,Typography } from "@mui/material";
import Navbar from "../componentsMyNetwork/Navbar";
import Add from "../componentsMyNetwork/Add";
import { useState,useEffect } from "react";

// Components
import { DashboardSidebar, DashboardFeedComponent, DashboardRightbarComponent } from "src/SeperateComponent/Dashboard";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import ScreenSearchComponent from "src/componentsMyNetwork/screenSearchComponent";
import DisplayCard from "src/componentsMyNetwork/displayCard";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from "react-redux";
import { saveMySignals, saveTrendInFocus } from "src/redux/reducers/group.slice";
import { fetchAllTrends } from "src/redux/actions/group.action";
import { approveSignals, disapproveSignals, updateUserSignals } from "src/redux/actions/auth.action";
import { FaPlus, FaRegCheckCircle, FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { IoMdCloseCircleOutline } from "react-icons/io";



function DashboardClonePage() {
  
 const dispatch = useDispatch()
  const [mode, setMode] = useState("dark");


  const darkTheme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: '#FFF',   // Page background
        
      },
    },
  });

  useEffect(()=>{
    
   dispatch(fetchAllTrends())


  },[])

const user = useSelector((state)=> state.auth)
const {mySignals,allTrends,filteredTrends} = useSelector((state)=> state.group)
console.log(" LOGGED IN USER IS -->",user)
const navigate = useNavigate()
  useEffect(()=>{

  
    if(user && !user.user){
      navigate('/login')
    }

  },[])

  const defaultSignals  = filteredTrends?filteredTrends:   [{
    id:"1",
    trendName:"Digital Detox",
   trendSummary:"Rise in #DigitalDetox movements among Gen Z users.",
    link:"/home/details/digitalDetox",
    image:"https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fc8.alamy.com%2Fcomp%2F2C3WE55%2Fwoman-sitting-lotus-pose-and-meditating-digital-detox-offline-activities-concept-girl-spending-time-without-gadgets-abandoning-internet-social-networks-full-length-vertical-vector-illustration-2C3WE55.jpg"
    },{
      id:"2",
      trendName:"Afrofuturism",
     trendSummary:"A surge in Afrofuturist aesthetics in fashion and film.",
      link:"/home/details/afrofuturism",
      image:"https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F52fd6682e4b0209674952cb5%2F904b3a82-e3a2-44d1-9fbd-32b6b7a2824d%2FAfricanFuturism%2BNew.jpg",
    
    },{
      id:"3",
      trendName:"Retro Tech",
     trendSummary:"Renewed interest in 90s gaming consoles and retro tech.",
      link:"/home/details/retroTech",
      image:"https://static.vecteezy.com/system/resources/thumbnails/037/494/086/large/vertical-retro-futuristic-1980s-technology-background-animation-with-multicolored-blinking-led-data-display-lights-this-tech-motion-background-is-full-hd-and-a-seamless-loop-free-video.jpg"
    }]


  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}  style={{height:"100vh", marginLeft: '10%', width: 'calc(100% - 20%)',}}>
        <Navbar active="dashboard" />

        {/* <ScreenSearchComponent title="Trends" /> */}
         { 
                   <Box sx={{ display: "flex", justifyContent: "flex-start", px: "88px",pt: "58px", mb: 2 }}>

                        <Button 
                            sx={{ 
                                display: "flex", alignItems: "center",justifyContent:"center", cursor: "pointer", borderRadius: "8px", 
                                border: "1px solid gray"
                            }}
                            onClick={() => navigate('/create-signal')}
                        >
                            <FaPlus style={{color:"black"}} />
                            <Typography sx={{ ml: 1,color:"black" }}>Add Signal</Typography>
                        </Button>
                        </Box>
                    }


        <Box
          mx="88px"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2, 
          }}
        >

            

{defaultSignals.length && defaultSignals.map((signal,index)=>(  
          <Box display="flex" alignItems="flex-start" mb={2} sx={{flexDirection:"column-reverse"}}>
            <div style={{display:"flex",justifyContent:"space-between",width:"70%",minWidth:"17rem"}}>  
            <IconButton
              sx={{
                //backgroundColor: '#F5F5F5',
                backgroundColor: 'white',
               
                color: 'black',
                marginRight: '1rem',
                
                
              }}
            >
             
              <FaPencil style={{fontSize:"0.7rem"}} onClick={()=>{dispatch(saveTrendInFocus(signal));setTimeout(()=>{navigate('/update-signal')},1000)   }} />
            </IconButton>



            <IconButton
              sx={{
                //backgroundColor: '#F5F5F5',
                backgroundColor: 'white',
               
                color: 'black',
                marginRight: '1rem',
                
                
              }}
            >
             
              <FaTrashAlt style={{fontSize:"0.7rem"}} onClick={()=>{}} />
            </IconButton>





            <IconButton
              sx={{
                //backgroundColor: '#F5F5F5',
                padding: '0.5rem',
                color: 'black',
                marginRight: '1rem',
                
              }}
            >
            {signal.status === "Approved"?
            <IoMdCloseCircleOutline style={{fontSize:"0.95rem"}} onClick={()=>{dispatch(disapproveSignals(signal.id)) }} />
               :

              <FaRegCheckCircle style={{fontSize:"0.85rem"}} onClick={()=>{dispatch(approveSignals(signal.id)) }} />
            }
            </IconButton>
       </div>

            <DisplayCard 
              title={signal.trendName && signal.trendName}
              subtitle={signal.trendSummary && signal.trendSummary}
              link={signal.link}
              image={signal.image}
              data={signal}
            />
          </Box>
          ))}

        
           



      { /*
         <Box display="flex" alignItems="flex-start" mb={2} sx={{flexDirection:"column-reverse"}}>
            <IconButton
              sx={{
                backgroundColor: '#F5F5F5',
                padding: '0.5rem',
                color: 'black',
                marginRight: '1rem',
              }}
            >
              <AddIcon onClick={()=>{console.log("hello")}} />
            </IconButton>
            <DisplayCard 
              title="Afrofuturism"
              subtitle="A surge in Afrofuturist aesthetics in fashion and film."
              link="/home/details/afrofuturism"
              image="https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fimages.squarespace-cdn.com%2Fcontent%2Fv1%2F52fd6682e4b0209674952cb5%2F904b3a82-e3a2-44d1-9fbd-32b6b7a2824d%2FAfricanFuturism%2BNew.jpg"
            />
          </Box>
          
          <Box display="flex" alignItems="flex-start" mb={2} sx={{flexDirection:"column-reverse"}}>
            <IconButton
              sx={{
                backgroundColor: '#F5F5F5',
                padding: '0.5rem',
                color: 'black',
                marginRight: '1rem',
              }}
            >
              <AddIcon onClick={()=>{console.log("hello")}} />
            </IconButton>
            <DisplayCard 
              title="Digital Detox"
              subtitle="Rise in #DigitalDetox movements among Gen Z users."
              link="/home/details/digitalDetox"
              image="https://res.cloudinary.com/glide/image/fetch/f_auto,w_500,c_limit/https%3A%2F%2Fc8.alamy.com%2Fcomp%2F2C3WE55%2Fwoman-sitting-lotus-pose-and-meditating-digital-detox-offline-activities-concept-girl-spending-time-without-gadgets-abandoning-internet-social-networks-full-length-vertical-vector-illustration-2C3WE55.jpg"
            />
          </Box>
          
          <Box display="flex" alignItems="flex-start" mb={2} sx={{flexDirection:"column-reverse"}}>
            <IconButton
              sx={{
                backgroundColor: '#F5F5F5',
                padding: '0.5rem',
                color: 'black',
                marginRight: '1rem',
              }}
            >

              <AddIcon onClick={()=>{console.log("hello")}} />
            </IconButton>
            <DisplayCard 
              title="Retro Tech"
              subtitle="Renewed interest in 90s gaming consoles and retro tech."
              link="/home/details/retroTech"
              image="https://static.vecteezy.com/system/resources/thumbnails/037/494/086/large/vertical-retro-futuristic-1980s-technology-background-animation-with-multicolored-blinking-led-data-display-lights-this-tech-motion-background-is-full-hd-and-a-seamless-loop-free-video.jpg"
            />
          </Box>
    */}
        </Box>

        {/* <Add /> */}
      </Box>
    </ThemeProvider>
  );
}

export default DashboardClonePage;
