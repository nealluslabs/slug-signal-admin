import Sidebar from "../componentsMyNetwork/Sidebar";
import Feed from "../componentsMyNetwork/Feed";
import Rightbar from "../componentsMyNetwork/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../componentsMyNetwork/Navbar";
import Add from "../componentsMyNetwork/Add";
import { useState,useEffect } from "react";

// Components
import { DashboardSidebar, DashboardFeedComponent, DashboardRightbarComponent } from "src/SeperateComponent/Dashboard";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import ScreenSearchComponent from "src/componentsMyNetwork/screenSearchComponent";
import DisplayCard from "src/componentsMyNetwork/displayCard";
import UserDisplayCard from "src/componentsMyNetwork/UserDisplayCard";
import BackOption from "src/componentsMyNetwork/backOption";
import UserDetails from "src/componentsMyNetwork/UserDetails";


function UserDetailPage() {
  

  const [mode, setMode] = useState("dark");


  const darkTheme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: '#FFF',   // Page background
        
      },
    },
  });

const user = useSelector((state)=> state.auth)
console.log(" LOGGED IN USER IS -->",user)
const navigate = useNavigate()
  useEffect(()=>{

  
    if(user && !user.user){
      navigate('/login')
    }

  },[])

  const breadcrumbs = [
    { label: "Users", path: "/users" },
    { label: "Kelvin Gumbo", path: "/users/kevin-gumbo" },
  ];


  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} sx={{height:"100vh"}}  >
        <Navbar active="users" />

        <BackOption items={ breadcrumbs } />

        <UserDetails />

        {/* <Add /> */}
      </Box>
    </ThemeProvider>
  );
}

export default UserDetailPage;
