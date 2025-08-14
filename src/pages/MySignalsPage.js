import Sidebar from "../componentsMyNetwork/Sidebar";
import Feed from "../componentsMyNetwork/Feed";
import Rightbar from "../componentsMyNetwork/Rightbar";
import { Box, createTheme, Divider, IconButton, Stack, ThemeProvider, Typography } from "@mui/material";
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
import { saveMySignals } from "src/redux/reducers/group.slice";
import { useDispatch } from "react-redux";
import DisplayCardSmall from "src/componentsMyNetwork/displayCardSmall";
import { HiOutlineMinusCircle } from "react-icons/hi2";


function MySignalsPage() {
  

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

const user = useSelector((state)=> state.auth)
const [signalsForThisUser ,setSignalsForThisUser]= useState([])

const [randomSignals ,setRandomSignals]= useState([])

const {mySignals,allTrends} = useSelector((state)=> state.group)

console.log(" LOGGED IN USER IS -->",mySignals)
const navigate = useNavigate()
  useEffect(()=>{

  
    if(user && !user.user){
      navigate('/login')
    }


    function getRandomTrends(allTrends, mySignals, setRandomSignals) {
      // Step 1: Filter out trends whose id is in mySignals
      const filteredTrends = allTrends.filter(trend => !mySignals.includes(trend.id));
    
      // Step 2: Shuffle the filtered array using Fisher-Yates
      for (let i = filteredTrends.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredTrends[i], filteredTrends[j]] = [filteredTrends[j], filteredTrends[i]];
      }
    
      // Step 3: Slice out the first 4
      const selectedTrends = filteredTrends.slice(0, 4);
    
      // Step 4: Set the selected trends
      setRandomSignals(selectedTrends);
    }

      getRandomTrends(allTrends,mySignals,setRandomSignals)
   



  if (mySignals && mySignals.length) {
    const allSignalIds = allTrends.map(item => item.id);
    let signalsInterim = []
    console.log("ALL SIGNAL IDS IS-->",allSignalIds)
    mySignals.forEach(signalId => {
      const index = allSignalIds.indexOf(signalId);
    if (index !== -1 /*&& !(signalsForThisUser.map(item => item.id).includes(signalId))*/  ) {
        
       signalsInterim.push(allTrends[index])
      }
    });

    setSignalsForThisUser([...signalsInterim]);
  }

 
 

  },[mySignals])



 




  
  

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"} >
        <Navbar active="my-signals" />

        <ScreenSearchComponent title="Trends" />

        <Box
          mx="88px"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2, 
          }}
        >

          {signalsForThisUser && signalsForThisUser.length ? signalsForThisUser.map((signal,index)=>(  
          <Box display="flex" alignItems="flex-start" mb={2} sx={{flexDirection:"column-reverse"}}>
            <div sx={{display:"flex",justifyContent:"flex-end",width:"100%"}}>
            <IconButton
              sx={{
                //backgroundColor: '#F5F5F5',
                padding: '0.5rem',
                color: 'black',
                marginRight: '1rem',
              }}
            >
              <HiOutlineMinusCircle onClick={()=>{dispatch(saveMySignals(mySignals.filter((item)=>(item !== signal.id))  )    )}} />

              
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
          ))
            :
             
             <Box
               gridColumn="1 /-1"
               display="flex"
               justifyContent="center"
               alignItems="center"
               height="150px" // Adjust as needed
             >
               <Typography variant="h6" sx={{color:"black"}}>
                 No Signals Added Yet ...
               </Typography>
             </Box>

             }
          {/*
          <Box display="flex" alignItems="flex-start" mb={2} sx={{flexDirection:"column-reverse"}}>
            <IconButton
              sx={{
                backgroundColor: '#F5F5F5',
                padding: '0.5rem',
                color: 'black',
                marginRight: '1rem',
              }}
            >
              <RemoveIcon onClick={()=>{console.log("hello")}} />
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

              <RemoveIcon onClick={()=>{console.log("hello")}} />
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

        {/*SIMILAR SIGNALS*/}


        <Divider sx={{ width: '100%', my: 4, borderColor: 'grey.400' }} />


        <Typography variant="p" sx={{ marginTop: "0.5rem", marginBottom: "2rem",marginLeft:"6rem", color: 'black',fontWeight:"600",fontFamily:"Poppins" }}>
           SIMILAR SIGNALS
         </Typography>
        <Box
          mx="88px"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2, 
          }}
        >


     {randomSignals.length && randomSignals.map((signal,index)=>(  
          <Box display="flex" alignItems="flex-start" mb={2} sx={{flexDirection:"column-reverse"}}>
         

            <DisplayCardSmall 
              title={signal.trendName && signal.trendName}
              subtitle={signal.trendSummary && signal.trendSummary}
              link={signal.link}
              image={signal.image}
              data={signal}
              page={"home"}
            />
          </Box>
          ))}
   

      {/*
          <Box display="flex" alignItems="flex-start" mb={2} sx={{flexDirection:"column-reverse"}}>
           
            <DisplayCardSmall 
              title="Afrofuturism"
              subtitle="A surge in Afrofuturist aesthetics in fashion and film."
              link="/home/details/afrofuturism"
              image="https://slugsignal-trends.s3.eu-west-3.amazonaws.com/Afrofuturism.png"
            />
          </Box>
          
          <Box display="flex" alignItems="flex-start" mb={2} sx={{flexDirection:"column-reverse"}}>
          
            <DisplayCardSmall 
              title="Digital Detox"
              subtitle="Rise in #DigitalDetox movements among Gen Z users."
              link="/home/details/digitalDetox"
              image="https://slugsignal-trends.s3.eu-west-3.amazonaws.com/Digital-Detox.jpg" 
            />
          </Box>
          
          <Box display="flex" alignItems="flex-start" mb={2} sx={{flexDirection:"column-reverse"}}>
            
            <DisplayCardSmall 
              title="Retro Tech"
              subtitle="Renewed interest in 90s gaming consoles and retro tech."
              link="/home/details/retroTech"
              image="https://slugsignal-trends.s3.eu-west-3.amazonaws.com/Retro-Tech.jpg"
            />
          </Box>
        */}

        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MySignalsPage;
