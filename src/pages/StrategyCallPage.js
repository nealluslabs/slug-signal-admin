import Sidebar from "../componentsMyNetwork/Sidebar";
import Feed from "../componentsMyNetwork/Feed";
import Rightbar from "../componentsMyNetwork/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../componentsMyNetwork/Navbar";
import Add from "../componentsMyNetwork/Add";
import { useEffect, useState } from "react";

// Components
import { StrategySideBarComponent, StrategyRightBarComponent, StrategyFeedComponent } from "src/SeperateComponent/Strategy";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function StrategyCallPage() {
  const [mode, setMode] = useState("dark");

  const user = useSelector((state)=> state.auth)
  const navigate = useNavigate()
    useEffect(()=>{
  
    
      if(user && !user.user){
        navigate('/login')
      }
  
    },[])

  const darkTheme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: '#000000',   // Page background
        
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"} >
        <Navbar active="strategy" />
        <Stack direction="row" spacing={4} justifyContent="space-between" sx={{marginLeft:"-4%",scale:"0.85",width:"108%",marginTop:"-55px"}}>
          
          <StrategySideBarComponent setMode={setMode} mode={mode}/>
         

          <StrategyFeedComponent />
          <StrategyRightBarComponent />
        </Stack>
        {/* <Add /> */}
      </Box>
    </ThemeProvider>
  );
}

export default StrategyCallPage;
