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

import MessageListComponent from "./messages-list.component";
import { HeadCountComponent, TryPremiumComponent } from "../General";

const MessageSideBarComponent = () => {

    const data = [
        { title: "Notification", number: 2 },
        { title: "Unread Messages", number: 1 }
    ]

    return (
        <Box  mt={2} flex={1.5} p={2} sx={{ display: { xs: "none", sm: "block", marginTop: 119 } }}  style={{marginTop:"1rem"}}>
            <Box 
                sx={{ 
                    /*position: "fixed",*/ overflow: "scroll", height: "94.8%", width: "99%",borderRadius:"5px",/*width: "26%",*/ /*minWidth:"24rem",maxWidth:{lg:"24rem",xl:"28rem"}*/
                    "&::-webkit-scrollbar": {
                        display: "none",
                      }, 
                }}
            >

                <MessageListComponent />
                
              {/*  <Box px={1} sx={{ paddingBottom: "100px" }}>
                    <HeadCountComponent data={ data } />
                    <TryPremiumComponent />    
                </Box>
            */}

            </Box>
        </Box>
    )
}

export default MessageSideBarComponent;
