import { 
    Box, Stack, Skeleton, Typography, ImageList, ImageListItem, styled, InputBase, alpha,
    MenuItem,
    Menu
  } from "@mui/material";
  import { Search, ArrowDropDown, GroupAdd, Inbox, MoreVert, ChevronRight } from "@mui/icons-material"
  import React, { useState } from "react";
  import Post from "./Post";
  import Post1 from "./Post1";
  import Post2 from "./Post2";
  import Post3 from "./Post3";
  import Post4 from "./Post4";
  import Post5 from "./Post5";
  import Post6 from "./Post6";
  import Post7 from "./Post7";
  import Post8 from "./Post8";
  
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
import Laza from '../assets/images/lazarra.jpeg';
import Rea from '../assets/images/reaubeau.jpeg';
import Afri from "../assets/images/Afri.jpeg";
import D1 from '../assets/images/D1.jpeg'
import { DialogModalComponent } from "src/SeperateComponent/General";
import { Element } from "react-scroll";

  

const Invitations = () => {


    const [openModal, setOpenModal] = React.useState(false);
    const [activeTab, setActiveTab] = useState("Invitations");

    const handleCloseModal = () => {
        setOpenModal(false);
        };

        const chat = [
            { img: "https://material-ui.com/static/images/avatar/7.jpg", username: "DaVyne Truth", role: "Musician/Band", num:"1" },
            { img: "https://material-ui.com/static/images/avatar/6.jpg", username: "JBwai", role: "Musician/Band", num:"2" },
            { img: "https://material-ui.com/static/images/avatar/5.jpg", username: "Bebe Boy", role: "Musician/Band", num:"3" },
            /*{ img: "https://material-ui.com/static/images/avatar/4.jpg", username: "Andrea Belita", role: "Musician/Band", num:"4" },
            { img: "https://material-ui.com/static/images/avatar/3.jpg", username: "Andrea Belita", role: "Musician/Band", num:"5" },
            { img: "https://material-ui.com/static/images/avatar/7.jpg", username: "Andrea Belita", role: "Musician/Band", num:"6" },
            { img: "https://material-ui.com/static/images/avatar/6.jpg", username: "Andrea Belita", role: "Musician/Band", num:"7" },
            { img: "https://material-ui.com/static/images/avatar/5.jpg", username: "Andrea Belita", role: "Musician/Band", num:"8" },
            { img: "https://material-ui.com/static/images/avatar/4.jpg", username: "Andrea Belita", role: "Musician/Band", num:"9" },
            { img: "https://material-ui.com/static/images/avatar/3.jpg", username: "Andrea Belita", role: "Musician/Band", num:"10" }*/
          ]
        

return (
    <Box flex={2} p={{ xs: 0, md: 2 }}>

<Box sx={{ marginTop: "0px" ,background:"#302c34",borderRadius:"8px",padding:"24px",paddingTop:"0px",paddingLeft:"0px",paddingRight:"0px"}}>
<Box sx={{ display:"flex",gap:"2.4rem",marginLeft:"15px"}}>
<Typography variant="h6" fontWeight={100}
onClick={() => setActiveTab("Invitations")}
mt={2} mb={2} sx={{ 
  borderBottom: activeTab === "Invitations"?"2px solid #A01565":"none", 
  display: "inline-block", 
  paddingBottom: "2px",
  fontFamily: "inter",
  fontSize: 16,
  fontWeight: "600",
  cursor:"pointer",
}}>
  Invitations
</Typography>

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
    <Box px={1.2} py={1} my={0} 
      sx={{ display: "flex", justifyContent: "space-between", background: "inherit"/*"#252328"*/, alignItems: "center",borderBottom:"1px solid #606060" }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/*<Typography mr={2} sx={{ fontSize: 14, fontFamily: "inter" }}>{ item.num }.</Typography>*/}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt="Trevor Henderson"
            src={ item.img }
            sx={{ width: 40, height: 40 }}
          />
          <Box ml={1}>
            <Typography sx={{ fontSize: 12, fontFamily: "inter" }}>{ item.username }</Typography>
            <Typography sx={{ color: "white"/*"#8D8A8A"*/, fontSize: 10, fontFamily: "inter" }}>{ item.role }</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex",gap:"2px",alignItems:"center",justifyContent:"center" }}>
        <Typography sx={{ color: "#8D8A8A", fontFamily: "inter", fontSize: 12 }}>Ignore</Typography>

        <Button
        variant="contained"
        //startIcon={<MdPersonAddAlt1 />}
        sx={{
          marginTop: 0,
          borderRadius: '5rem',
          paddingX: 3,
          background: "linear-gradient(to right, #A01565, #3E256E)",
          color: '#fff',
          textTransform: 'none',
          fontSize: '15px',
          fontWeight:"520",
          scale:"0.8"
        }}
      >
        Accept
      </Button>

       
      </Box>
    </Box>
  ) ) }

</Box>

</Box>


</Box>

);
};

export default Invitations;