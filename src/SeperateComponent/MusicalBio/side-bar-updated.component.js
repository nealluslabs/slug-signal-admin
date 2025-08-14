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
import { useNavigate } from "react-router-dom";
  
  import Image from "src/assets/images/Side/happening.png";
  import StarIcon from "src/assets/images/Side/stars.png"
  
  const SidebarUpdated = ({mode,setMode}) => {
  
    const data = [
      { title: "Invitations", number: 8 },
      { title: "Followers", number: 10 },
      { title: "Following", number: 4 },
      { title: "Collaborators", number: 7 }
    ]

    const navigate = useNavigate()
  
    return (
      <Box flex={1.3} p={2} sx={{ display: { xs: "none", sm: "block" },  position:"relative", left:"1.3rem",width:"30%" }}>
        <Box position="fixed" style={{width:"30%"}}>
         
  
          {/* </List> */}
  
          <Box  onClick={ () => navigate('/try-audiovybez') } 
            sx={{
              maxWidth: '22rem',
              width:"90%",
              height: '209px',
              backgroundImage: `url(${Image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              padding: "24px 8px",
              borderRadius: "14px",
              marginTop: 1,
              cursor:"pointer"
             
             
              
            }}  
          >
            <Box
              sx={{ display: "flex", justifyContent: "center", marginBottom: "10px", marginTop: "24px" }}
            >
              <img src={ StarIcon } width={24} height={24} style={{ marginRight: "12px", marginTop: "4px" }} />
              <Typography sx={{ textAlign: "center", fontFamily: "inter", fontWeight: 700, fontSize: 20 }}>Try Audiovybez PRO for $0</Typography>
            </Box>
  
            <Typography sx={{ fontSize: "12px", textAlign: "center", fontFamily: "inter" }}>
              Unlock advanced AI cataloging  features, discounted pricing on events and more!
            </Typography>
  
  
            <Box sx={{ display: "flex", justifyContent: "space-between", margin: "6px 2px",marginTop:"17px"}}>
                <Typography sx={{ fontSize: 12, fontFamily: "inter", textAlign: "center",color:"#E61484" }}>{ "Current Plan" }</Typography>
                <Typography sx={{ fontSize: 12, fontFamily: "inter", textAlign: "center" }}>{ "Free" }</Typography>
              </Box>
          </Box>
  
          <Box sx={{ 
            background: "#252328", 
            maxWidth: '22rem', 
            with:"90%",
            padding: "24px 14px",
            marginTop: "18px",
            borderRadius: "14px" 
          }}>
            
            {/* data.map( (item) => (
              <Box sx={{ display: "flex", justifyContent: "space-between", margin: "6px 2px",paddingRight:"20px"}}>
                <Typography sx={{ fontSize: 12, fontFamily: "inter", textAlign: "center" }}>{ item.title }</Typography>
                <Typography sx={{ fontSize: 12, fontFamily: "inter", textAlign: "center" }}>{ item.number }</Typography>
              </Box>
            ) ) */}

<Box sx={{ display: "flex", justifyContent: "flex-start", margin: "6px 2px",paddingRight:"20px",flexDirection:"column",gap:"1rem"}}>
<Typography sx={{ fontSize: 14,fontWeight:700, fontFamily: "inter", textAlign: "left" }}>What's Happening with Lilyisthatyou</Typography>
  
<Typography sx={{ fontSize: 13,fontWeight:400, fontFamily: "inter", textAlign: "left" }}>Lilyisthatyou tour dates</Typography>

<Typography sx={{ fontSize: 13,fontWeight:400, fontFamily: "inter", textAlign: "left" }}>Variety Article</Typography>
</Box>
          </Box>
  
        </Box>
      </Box>
    );
  };
  
  export default SidebarUpdated;
  