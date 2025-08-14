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
import { WelcomeMsgComponent, OverlayComponent } from "./";
  
const DashboardSidebar = ({mode,setMode}) => {
  
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
      <Box mt={-1} flex={2.8} p={2} sx={{ display: { xs: "none", sm: "block", marginTop: "0px"} }}>
        <Box 
            position="fixed"
            sx={{
                height: "150vh", // Full viewport height
                overflowY: "auto", // Make the content scrollable
                width: "29%",
               // minWidth:"24rem",
               // maxWidth:"27.5rem",
                scrollbarWidth: "none", // For Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // For Chrome, Safari, and Edge
                },
              }}
        >

            <Box sx={{
                height: "100%", // Restrict height for internal content
                overflowY: "hidden", // Prevent scrolling within this box
            }}>
                <WelcomeMsgComponent text="Hi, Lily! Welcome back. Ready to land your next sync placement?" />

                <OverlayComponent />

                <HeadCountComponent data={ data1 } message="Edit Page" />

                <HeadCountComponent data={ data2 } message="View Messages" />

                <TryPremiumComponent more={ false } />
            </Box>
  
        </Box>
      </Box>
    );
  };
  
  export default DashboardSidebar;
  