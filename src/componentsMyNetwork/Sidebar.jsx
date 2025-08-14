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

import Image from "../assets/images/Side/happening.png";
import StarIcon from "../assets/images/Side/stars.png"
import { useNavigate } from "react-router-dom";

const Sidebar = ({mode,setMode}) => {

  const data = [
    { title: "Invitations", number: 8 },
    { title: "Followers", number: 10 },
    { title: "Following", number: 4 },
    { title: "Collaborators", number: 7 }
  ]
  const navigate = useNavigate()

  return (
    <Box flex={2.5} p={2} sx={{ display: { xs: "none", sm: "block" },  position:"relative", right:"8.5rem",width:"30%" }}>
      <Box position="fixed" style={{width:"30%"}}>
        {/* <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Invitations" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="Followers" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Following" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="Collaborators" />
            </ListItemButton>
          </ListItem> */}
          
          {/*  <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
           <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
             <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
            </ListItemButton>
          </ListItem>*/}

        {/* </List> */}

        <Box onClick={ () => navigate('/try-audiovybez')}
          sx={{
            maxWidth: '27.5rem',
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
          maxWidth: '27.5rem', 
          with:"90%",
          padding: "24px 14px",
          marginTop: "18px",
          borderRadius: "14px" 
        }}>
          
          { data.map( (item) => (
            <Box sx={{ display: "flex", justifyContent: "space-between", margin: "6px 2px",paddingRight:"20px"}}>
              <Typography sx={{ fontSize: 12, fontFamily: "inter", textAlign: "center" }}>{ item.title }</Typography>
              <Typography sx={{ fontSize: 12, fontFamily: "inter", textAlign: "center" }}>{ item.number }</Typography>
            </Box>
          ) ) }

        </Box>

      </Box>
    </Box>
  );
};

export default Sidebar;
