
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
//import Invitations from "src/componentsMyNetwork/Invitations";
import Reminders from "./reminders.component";
  
const StrategySideBarComponent = ({mode,setMode}) => {
  
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
      <Box flex={2.2} p={2} sx={{ display: { xs: "none", sm: "block", marginTop: 119 } }}>
        <Box 
            position="fixed"
            sx={{
                height: "100vh", // Full viewport height
                overflowY: "auto", // Make the content scrollable
                //width: "25%",
                width:"28vw",
              
                //minWidth:{sm:"22rem",md:"22rem",xl:"25rem"},
               
               // maxWidth:{md:"22rem",lg:"20rem"},
                scrollbarWidth: "none", // For Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // For Chrome, Safari, and Edge
                },
              }}
        >

            <Box sx={{
                height: "146%", // Restrict height for internal content
                overflowY: "hidden", // Prevent scrolling within this box
                paddingLeft:"0%",
                paddingRight:"0%",
            }}>
              {/*   <WelcomeMsgComponent text="Hi, Lily! Welcome back. Ready to land your next sync placement?" />

                <OverlayComponent />

          <HeadCountComponent data={ data1 } message="Edit Page" />

                <HeadCountComponent data={ data2 } message="View Messages" /> */}

                <TryPremiumComponent more={ false } />

                {/*<Invitations/>*/}
                <Reminders/>

                
            </Box>
  
        </Box>
      </Box>
    );
  };
  
  export default StrategySideBarComponent;
  
