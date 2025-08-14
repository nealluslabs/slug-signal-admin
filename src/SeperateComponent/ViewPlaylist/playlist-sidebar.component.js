import {
    AccountBox,
    Article,
    Group,
    Home,
    ModeNight,
    Person,
    Settings,
    Storefront,
    Star
  } from "@mui/icons-material";
  import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
    Typography,
  } from "@mui/material";
  import React from "react";


// Components
import { HeadCountComponent, TryPremiumComponent } from "../General";
// import { WelcomeMsgComponent, OverlayComponent } from "./";
  
const PlaylistSidebar = ({mode,setMode}) => {
  
    const data1 = [
      { title: "Page Views", number: 20 },
      { title: "Followers", number: 130 },
      { title: "Following", number: 22 }
    ];

    const data2 = [
        { title: "Notifications", number: 2 },
        { title: "Unread Messages", number: 1 }
      ]
  
    return (
      <Box flex={1.5} p={2} sx={{ display: { sm: "block", marginTop: 119 } }}>
        <Box 
            position="fixed"
            sx={{
                height: "100vh", // Full viewport height
                overflowY: "auto", // Make the content scrollable
                width: "26%",
                scrollbarWidth: "none", // For Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // For Chrome, Safari, and Edge
                },
              }}
        >

            <Box sx={{
                height: "146%", // Restrict height for internal content
                overflowY: "hidden", // Prevent scrolling within this box
            }}>
               

             

                <HeadCountComponent data={ data1 } message="Edit Page" />

               

                <TryPremiumComponent more={ false } />
            </Box>
  
        </Box>
      </Box>
    );
  };
  
  export default PlaylistSidebar;
  