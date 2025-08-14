import { 
    Box, Stack, Skeleton, Typography, ImageList, ImageListItem, styled, InputBase, alpha,
    MenuItem,
    Menu
  } from "@mui/material";
  import { Search, ArrowDropDown, GroupAdd, Inbox, MoreVert, ChevronRight } from "@mui/icons-material"
  import React, { useState } from "react";
  /*import Post from "./Post";
  import Post1 from "./Post1";
  import Post2 from "./Post2";
  import Post3 from "./Post3";
  import Post4 from "./Post4";
  import Post5 from "./Post5";
  import Post6 from "./Post6";
  import Post7 from "./Post7";
  import Post8 from "./Post8";*/
  
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
/*import Laza from '../assets/images/lazarra.jpeg';
import Rea from '../assets/images/reaubeau.jpeg';
import Afri from "../assets/images/Afri.jpeg";
import D1 from '../assets/images/D1.jpeg'*/
import { DialogModalComponent } from "src/SeperateComponent/General";
import { Element } from "react-scroll";

  

const Reminders = () => {


    const [openModal, setOpenModal] = React.useState(false);
    const [activeTab, setActiveTab] = useState("Reminders");

    const handleCloseModal = () => {
        setOpenModal(false);
        };

        const chat = [
            { img: "https://material-ui.com/static/images/avatar/7.jpg", username: "Live Listening Session: Jared Causly", date: "May 18th", num:"1" ,time:"3:00 pm"},
            { img: "https://material-ui.com/static/images/avatar/6.jpg", username: "1:1 Strategy Call: Lava Hong", date: "May 20th", num:"2",time:"7:00 pm" },
            { img: "https://material-ui.com/static/images/avatar/5.jpg", username: "1:1 Strategy Call: Daciay Quenah", date: "May 25th", num:"3",time:"6:00 pm" },
            /*{ img: "https://material-ui.com/static/images/avatar/4.jpg", username: "Andrea Belita", date: "Musician/Band", num:"4" },
            { img: "https://material-ui.com/static/images/avatar/3.jpg", username: "Andrea Belita", date: "Musician/Band", num:"5" },
            { img: "https://material-ui.com/static/images/avatar/7.jpg", username: "Andrea Belita", date: "Musician/Band", num:"6" },
            { img: "https://material-ui.com/static/images/avatar/6.jpg", username: "Andrea Belita", date: "Musician/Band", num:"7" },
            { img: "https://material-ui.com/static/images/avatar/5.jpg", username: "Andrea Belita", date: "Musician/Band", num:"8" },
            { img: "https://material-ui.com/static/images/avatar/4.jpg", username: "Andrea Belita", date: "Musician/Band", num:"9" },
            { img: "https://material-ui.com/static/images/avatar/3.jpg", username: "Andrea Belita", date: "Musician/Band", num:"10" }*/
          ]
        

return (
    <Box flex={2} p={{ xs: 0, md: 2 }}>

<Box sx={{ marginTop: "0px" ,background:"inherit"/*"#302c34"*/,borderRadius:"16px",padding:"24px",paddingTop:"0px",paddingLeft:"0px",paddingRight:"0px"}}>
<Box sx={{ display:"flex",gap:"2.4rem",marginLeft:"0px"}}>
<Typography variant="h6" fontWeight={100}
onClick={() => setActiveTab("Reminders")}
mt={2} mb={0} sx={{ 
  //borderBottom: activeTab === "Reminders"?"2px solid #A01565":"none", 
  display: "inline-block", 
  paddingBottom: "2px",
  fontFamily: "inter",
  fontSize: 14,
  fontWeight: "600",
  cursor:"pointer",
}}>
 My Reminders
</Typography>

{/*
<Typography variant="h6" fontWeight={100}
onClick={() => setActiveTab("Following")}
mt={2} mb={2} sx={{ 
  borderBottom: activeTab === "Following"?"2px solid #A01565":"none", 
  display: "inline-block", 
  paddingBottom: "2px",
  fontFamily: "inter",
  fontSize: 16,
  fontWeight: "600",
  cursor:"pointer",
}}>
  Following
</Typography>

<Typography variant="h6" fontWeight={100}
 onClick={() => setActiveTab("Followers")}
mt={2} mb={2} sx={{ 
 borderBottom:activeTab === "Followers"?"2px solid #A01565":"none", 
  display: "inline-block", 
  paddingBottom: "2px",
  fontFamily: "inter",
  fontSize: 16,
  fontWeight: "600",
  cursor:"pointer",
}}>
 Followers
</Typography>
*/}
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

<Box>

  { chat.map( (item, i) => (
    <Box px={1.2} py={2} my={1.5}  mt={0.8}
      sx={{ with:"26rem",display: "flex", justifyContent: "space-between", background: "#302c34"/*"#252328"*/, alignItems: "center",borderRadius:"10px"/*borderBottom:"1px solid #606060"*/ }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/*<Typography mr={2} sx={{ fontSize: 14, fontFamily: "inter" }}>{ item.num }.</Typography>*/}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/*<Avatar
            alt="Trevor Henderson"
            src={ item.img }
            sx={{ width: 40, height: 40 }}
          />*/}
          <Box ml={1}>
            <Typography sx={{ fontSize: 12, fontFamily: "inter" }}>{ item.username }</Typography>
            <Typography sx={{ color:/* "white"*/"#8D8A8A", fontSize: 10, fontFamily: "inter" }}>{ item.date }</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex",gap:"2px",alignItems:"center",justifyContent:"center" }}>
        {/*<Typography sx={{ color: "#8D8A8A", fontFamily: "inter", fontSize: 12 }}>Ignore</Typography>*/}

        <Button
        variant="contained"
        //startIcon={<MdPersonAddAlt1 />}
        sx={{
          marginTop: 0,
          borderRadius: '5rem',
          paddingX: 1,
          paddingY: 0,
          width:"max-content",
          background: "linear-gradient(to right, #A01565, #A01565)",
          color: '#fff',
          textTransform: 'none',
          fontSize: '15px',
          fontWeight:"520",
          scale:"0.8"
        }}
      >
        {item.time}
      </Button>

       
      </Box>
    </Box>
  ) ) }

</Box>

</Box>


</Box>

);
};

export default Reminders;