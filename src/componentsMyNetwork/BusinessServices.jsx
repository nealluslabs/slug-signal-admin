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

  import foreverFan from "src/assets/images/foreverfan.png"

  import equalizer from "src/assets/images/equalizer.png"
  
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

  

const BusinessServices = () => {


    const [openModal, setOpenModal] = React.useState(false);
    const [activeTab, setActiveTab] = useState("Business Services");

    const handleCloseModal = () => {
        setOpenModal(false);
        };

        const chat = [
            { img: foreverFan,title:"ForeverFan",  description:"Find new fans, increase streams and build an audience. Use promo code: FIRSTMONTH01" },
            { img:equalizer,title:"Equalizer Consulting", description:"Navigate the complexitixes of metadata,rights ownership,song registration, and royalties. Use Promo Code: AV20" },
         
           
          ]
        

return (
    <Box flex={2} p={{ xs: 0, md: 2 }}>

<Box sx={{ marginTop: "-10px" ,background:"#302c34",borderRadius:"8px",padding:"24px",paddingTop:"0px",height:"450px",paddingLeft:"0px",paddingRight:"0px"}}>
<Box sx={{ display:"flex",gap:"1rem"}}>
<Typography variant="h6" fontWeight={100}
onClick={() => setActiveTab("Business Services")}
mt={2} mb={2} sx={{ 
  borderBottom: activeTab === "Business Services"?"2px solid #A01565":"none", 
  display: "inline-block", 
  paddingBottom: "2px",
  marginLeft: "15px",
  fontFamily: "inter",
  fontSize: 16,
  fontWeight: "600",
  cursor:"pointer",
}}>
  Business Services
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
      <Box sx={{ display: "flex", justifyContent:"flex-start",alignItems: "flex-end",flex:"1.25",width:"100%" }}>
        {/*<Typography mr={2} sx={{ fontSize: 14, fontFamily: "inter" }}>{ item.num }.</Typography>*/}
       
         <Box component="img" src={ item.img }  alt="business logo" sx={{backgroundColor:"#000",height:"60px",width:"240px"}} /> 
       
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

export default BusinessServices;