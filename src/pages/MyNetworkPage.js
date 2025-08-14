import Sidebar from "../componentsMyNetwork/Sidebar";
import Feed from "../componentsMyNetwork/Feed";
import Rightbar from "../componentsMyNetwork/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../componentsMyNetwork/Navbar";
import Add from "../componentsMyNetwork/Add";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function MyNetworkPage() {
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
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar active="network" /> 
        <Stack direction="row" spacing={0} justifyContent="space-between" style={{scale:"0.9",marginTop:"-24px",position:"relative",left:"4rem"}}>
       
      
          <Sidebar setMode={setMode} mode={mode}/>
      
          
         <span style={{position:"relative",left:"-1.2rem",scale:"1.04",marginTop:"18px"}}>
          <Feed />
          </span>

          <Rightbar />
        </Stack>
        {/* <Add /> */}
      </Box>
    </ThemeProvider>
  );
}

export default MyNetworkPage;
