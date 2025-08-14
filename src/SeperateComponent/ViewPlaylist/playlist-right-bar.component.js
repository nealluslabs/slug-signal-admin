import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Divider,
    ImageList,
    ImageListItem,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { FaLock } from "react-icons/fa";
  import meltycanon from 'src/assets/images/meltycanon.jpeg'
  import lazarra from 'src/assets/images/lazarra.jpeg'
  import natashagrey from 'src/assets/images/natashagrey.jpeg'
  import reaubeau from 'src/assets/images/reaubeau.jpeg'
  
  import Image from '../../assets/images/Side/Latest.png';
  
  // Components
  import { DropDownContainerComponent, BriefComponent, HeadCountComponent } from "../General";
  
  const PlaylistRightbarComponent = () => {

    const data1 = [
        { title: "Activate your sync representation agreement" },
        { title: "Complete your profile" },
        { title: "Invite your collaborators" },
        { title: "Start building your pitch catalog" },
        { title: "Browse music briefs and submit to oportunities" }
    ];

    const data2 = [
        { text: "MTV Search - Caught in The Act: DOUBLE LIFE", mini1: "Payout: $1-2K/all-in", mini2: "Deadline: 11/07/24" },
        { text: "Authentic 2018 R&B and Hip-Hop Releases", mini1: "Payout: $5-10K/all-in", mini2: "Deadline: 11/07/24" },
        { text: "Authentic 2018 R&B and Hip-Hop Releases", mini1: "Payout: $5-10K/all-in", mini2: "Deadline: 11/07/24" }
    ];

    const data3 = [
      { title: "Total Files", number: "50" },
      { title: "Total Songs", number: "25" },
      { title: "Approved Songs", number: "10" },
      { title: "Draft Songs", number: "10" },
      { title: "Playlists", number: "4" },
      { title: "Albums", number: "8" },
      { title: "Brief Submissions", number: "8" }
    ]
  
    return (
      <Box flex={2} p={2} sx={{ display: { sm: "block" } }}>
        <Box width={400} 
            sx={{ 
                position: "fixed", height: "100%", overflow: "scroll",
                scrollbarWidth: "none", 
                "&::-webkit-scrollbar": {
                    display: "none", 
                },
            }}
        >
          
            <HeadCountComponent data={ data3 } text="Playlist Overview" message="Manage Playlist" storage={true} />

            
        </Box>
      </Box>
    );
  };
  
  export default PlaylistRightbarComponent;
  