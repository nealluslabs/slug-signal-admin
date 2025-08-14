import Sidebar from "../componentsMyNetwork/Sidebar";
import Feed from "../componentsMyNetwork/Feed";
import Rightbar from "../componentsMyNetwork/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../componentsMyNetwork/Navbar";
import Add from "../componentsMyNetwork/Add";
import { useEffect, useState } from "react";

// Components
import { MusicalBioFeedComponent, MusicalBioRightBarComponent, MusicalBioSideBarComponent } from "src/SeperateComponent/MusicalBio";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function MusicalBioPage() {
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
      <Box bgcolor={"background.default"} color={"text.primary"} style={{scale:"0.95"}}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <MusicalBioSideBarComponent setMode={setMode} mode={mode}/>
          <MusicalBioFeedComponent />
          <MusicalBioRightBarComponent />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default MusicalBioPage;
