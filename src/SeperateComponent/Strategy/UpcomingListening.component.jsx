import { 
    Box, Stack, Skeleton, Typography, ImageList, ImageListItem, styled, InputBase, alpha,
    MenuItem,
    Menu
  } from "@mui/material";
  import { Search, ArrowDropDown, GroupAdd, Inbox, MoreVert, ChevronRight } from "@mui/icons-material"
  import React, { useState } from "react";

  import foreverFan from "src/assets/images/jared.jpg"

  import equalizer from "src/assets/images/lava.jpg"
  
  import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
  import 'react-horizontal-scrolling-menu/dist/styles.css';
  
  
  import {
    Card,
    CardContent,
   
    Avatar,
    Button,
    
    IconButton
  } from "@mui/material"
  import { FaTimes } from "react-icons/fa"
  import { MdPersonAddAlt1 } from "react-icons/md"



// Feed images

import { DialogModalComponent } from "src/SeperateComponent/General";
import { Element } from "react-scroll";

  

const UpcomingListeningComponent = () => {


    const [openModal, setOpenModal] = React.useState(false);
    const [activeTab, setActiveTab] = useState("Upcoming Listening Sessions");

    const handleCloseModal = () => {
        setOpenModal(false);
        };

        const chat = [
            { img: foreverFan,title:"Jared Causly",  description:"May 10th | 3PM PDT | RSVP" },
            { img:equalizer,title:"Lava Hong", description:"August 10th | 2PM PDT | RSVP" },
         
           
          ]
        

return (
    <Box flex={2.4} p={{ xs: 0, md: 2 }} style={{width:"26rem",position:"absolute",left:"-1rem"}}>

<Box sx={{ marginTop: "0px" ,background:"#302c34",borderRadius:"16px",padding:"24px",paddingTop:"0px",height:"450px",paddingLeft:"0px",paddingRight:"0px",position:"relative"}}>
<Box sx={{ display:"flex",gap:"1rem"}}>
<Typography variant="h6" fontWeight={100}
onClick={() => setActiveTab("Upcoming Listening Sessions")}
mt={2} mb={2} sx={{ 
  borderBottom: activeTab === "Upcoming Listening Sessions"?"2px solid #A01565":"none", 
  display: "inline-block", 
  paddingBottom: "2px",
  marginLeft: "15px",
  fontFamily: "inter",
  fontSize: 16,
  fontWeight: "700",
  cursor:"pointer",
}}>
  Upcoming Listening Sessions
</Typography>


</Box>

{/*<SearchBox>
  <SearchInput placeholder="search or filter collaborators..." />
  <SearchIconWrapper>
    <Search />
  </SearchIconWrapper>
</SearchBox>*/}

<Box my={0} sx={{ display: "flex" }}>
<DialogModalComponent open={ openModal } handleClose={ handleCloseModal }  />
 

 
</Box>

<Box sx={{marginTop:"-10px", boxSizing: "borderBox",padding:"0px"}}>

  { chat.map( (item, i) => (
    <Box px={1.5} py={0} my={0} 
      sx={{paddingRight:"20px",paddingBottom:"0px", paddingTop:"10px",display: "flex", justifyContent: "flex-start", background: "inherit"/*"#252328"*/, alignItems: "flex-start",gap:"1rem",borderBottom:"1px solid #606060",width:"100%" }}
    >
      <Box sx={{ display: "flex", justifyContent:"flex-start",alignItems: "flex-end",flex:"0.7",width:"100%" }}>
        {/*<Typography mr={2} sx={{ fontSize: 14, fontFamily: "inter" }}>{ item.num }.</Typography>*/}
       
         <Box component="img" src={ item.img }  alt="artist pic" sx={{backgroundColor:"#000",height:"60px",width:"200px"}} /> 
       
      {/*  <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt="Trevor Henderson"
            src={ item.img }
            sx={{ width: 44, height: 44 }}
          />
          <Box ml={1}>
            <Typography sx={{ fontSize: 12, fontFamily: "inter" }}>{ item.username }</Typography>
            <Typography sx={{ color: "#8D8A8A", fontSize: 12, fontFamily: "inter" }}>{ item.role }</Typography>
          </Box>
  </Box>*/}
     
     
      </Box>

      <Box sx={{ display: "flex",gap:"0px",alignItems:"flex-start",justifyContent:"flex-start",flex:"1.25",flexDirection:"column",height:"90px"}}>
             <Typography sx={{ fontWeight: "600", fontSize: 15, position:"relative"  }}>
                {item.title}
            </Typography>

            <Typography my={2.5} sx={{ fontWeight: "400", fontSize: 10, position:"relative",top:"-1rem"}}>
                {item.description}
            </Typography>

           {/* <Typography sx={{ fontWeight: "100", fontSize: 13, marginBottom: 6 }}>
                Live listening session with music supervisor Lava Hong Monday November 11, 2025
            </Typography>*/}
       
      </Box>
    </Box>
  ) ) }

</Box>

</Box>


</Box>

);
};

export default UpcomingListeningComponent;