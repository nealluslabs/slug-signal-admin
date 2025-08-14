import Sidebar from "../componentsMyNetwork/Sidebar";
import Feed from "../componentsMyNetwork/Feed";
import Rightbar from "../componentsMyNetwork/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../componentsMyNetwork/Navbar";
import Add from "../componentsMyNetwork/Add";
import { useEffect, useState } from "react";

// Components
import { MessageSideBarComponent, MessageFeedComponent, MessageRightBarComponent } from "src/SeperateComponent/Messaging";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MessagePage() {

  const user = useSelector((state)=> state.auth)
  const navigate = useNavigate()
    useEffect(()=>{
  
    
      if(user && !user.user){
        navigate('/login')
      }
  
    },[])


  const [mode, setMode] = useState("dark");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
      background:"#00000"
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"} >
        <Navbar active="message" />
        <Stack direction="row" mt={1} spacing={2} justifyContent="space-between" style={{scale:"0.95",marginTop:"7px"}}>
          <MessageSideBarComponent setMode={setMode} mode={mode}/>
          <MessageFeedComponent />
          <MessageRightBarComponent />
        </Stack>
        {/* <Add /> */}
      </Box>
    </ThemeProvider>
  );
}

export default MessagePage;
