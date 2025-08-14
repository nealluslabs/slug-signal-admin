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

import Image from '../assets/images/Side/Latest.png';
import Invitations from "./Invitations";
import BusinessServices from "./BusinessServices";


const Rightbar = () => {

  const [active, setActive] = useState("recommended");

  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" },position:"relative",left:"-0.2rem" }}>
      <Box position="relative" width={410}>
        {/* <Typography variant="h6" fontWeight={100}>
          Contacts
        </Typography>
        <AvatarGroup max={7}>
          <Avatar
            alt="Remy Sharp"
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <Avatar
            alt="Travis Howard"
            src="https://material-ui.com/static/images/avatar/2.jpg"
          />
          <Avatar
            alt="Cindy Baker"
            src="https://material-ui.com/static/images/avatar/3.jpg"
          />
          <Avatar alt="Agnes Walker" 
           src="https://material-ui.com/static/images/avatar/4.jpg" />
         
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/5.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/6.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/7.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/8.jpg"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://material-ui.com/static/images/avatar/9.jpg"
          />
        </AvatarGroup>
        <Typography variant="h6" fontWeight={100} mt={2} mb={2}>
          New Followers
        </Typography>
        <ImageList cols={3} rowHeight={100} gap={5}>
          <ImageListItem>
            <img
              src="https://material-ui.com/static/images/image-list/breakfast.jpg"
              alt=""
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src="https://material-ui.com/static/images/image-list/burgers.jpg"
              alt=""
            />
          </ImageListItem>
          <ImageListItem>
            <img
              src="https://material-ui.com/static/images/image-list/camera.jpg"
              alt=""
            />
          </ImageListItem>
        </ImageList> */}

        {/*<Box component="img" src={ Image } mt={3} alt="earbuds advertisement" /> formerly the earbuds ad*/}

           <Invitations/>
           <Box sx={{ position:"relative",top:"-0.5rem"}}>
           <BusinessServices/>
           </Box>

        {/* THIS USED TO BE A LIST OF ARTISTS/PRODUCERS YOU CAN MESSAGE
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={100} mt={2} sx={{
            borderBottom: `${active == "recommended" ? "2px solid #A01565" : ""}`, 
            display: "inline-block", 
            paddingBottom: "2px",
            fontFamily: "inter",
            fontSize: 20,
            fontWeight: "500"
          }}
          onClick={ () => setActive("recommended") } 
          >
            Recommended
          </Typography>

          <Typography variant="h6" fontWeight={100} mt={2} sx={{
            borderBottom: `${active == "discover" ? "2px solid #A01565" : ""}`, 
            display: "inline-block", 
            paddingBottom: "2px",
            fontFamily: "inter",
            fontSize: 20,
            fontWeight: "500"
          }}
          onClick={ () => setActive("discover") }
          >
          Discover
        </Typography>
        </Box>
        <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper',fontSize:"12px" }}>
      <ListItem alignItems="flex-start" sx={{display:"flex",justifyContent:"space-between",fontSize:"12px"}}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={lazarra} />
        </ListItemAvatar>
        
        <ListItemText
          primary="La Zarra"
          secondary={
            <React.Fragment>
            
              {" Artist"}
            </React.Fragment>
          }
        />

         <Paper>
           <Button sx={{px:"2rem",borderRadius:"5rem",border:"2px solid #49454F",fontSize:"12px"}}>
             <Paper sx={{marginRight:"0.7rem",borderRadius:"50%",py:"0.1rem",px:"0.4rem",border:"1px solid #49454F",fontSize:"12px"}}>
              <FaLock /> 
             </Paper>
             Message
           </Button>
         </Paper>
      </ListItem>


      <Divider variant="inset" component="li" />
    
    
      <ListItem alignItems="flex-start" sx={{display:"flex",justifyContent:"space-between",fontSize:"12px"}}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={reaubeau} />
        </ListItemAvatar>
        
        <ListItemText
          primary="Reau Beau"
          secondary={
            <React.Fragment>
            
              {"Producer"}
            </React.Fragment>
          }
        />

         <Paper>
           <Button sx={{px:"2rem",borderRadius:"5rem",border:"2px solid #49454F"}}>
             <Paper sx={{marginRight:"0.7rem",borderRadius:"50%",py:"0.1rem",px:"0.4rem",border:"1px solid #49454F"}}>
              <FaLock /> 
             </Paper>
             Message
           </Button>
         </Paper>
      </ListItem>


      <Divider variant="inset" component="li" />
      
      
      <ListItem alignItems="flex-start" sx={{display:"flex",justifyContent:"space-between"}}>
        <ListItemAvatar>
          <Avatar alt="Natasha Gray" src={natashagrey} />
        </ListItemAvatar>
        
        <ListItemText
          primary="Natasha Gray"
          secondary={
            <React.Fragment>
            
              {" Artist"}
            </React.Fragment>
          }
        />

         <Paper>
           <Button sx={{px:"2rem",borderRadius:"5rem",border:"2px solid #49454F"}}>
             <Paper sx={{marginRight:"0.7rem",borderRadius:"50%",py:"0.1rem",px:"0.4rem",border:"1px solid #49454F"}}>
              <FaLock /> 
             </Paper>
             Message
           </Button>
         </Paper>
      </ListItem>

      <Divider variant="inset" component="li" />

      <ListItem alignItems="flex-start" sx={{display:"flex",justifyContent:"space-between",fontSize:"12px"}}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={meltycanon} />
        </ListItemAvatar>
        
        <ListItemText
          primary="Meltycanon"
          secondary={
            <React.Fragment>
            
              {"Artist/Producer"}
            </React.Fragment>
          }
        />

         <Paper>
           <Button sx={{px:"2rem",borderRadius:"5rem",border:"2px solid #49454F"}}>
             <Paper sx={{marginRight:"0.7rem",borderRadius:"50%",py:"0.1rem",px:"0.4rem",border:"1px solid #49454F"}}>
              <FaLock /> 
             </Paper>
             Message
           </Button>
         </Paper>
      </ListItem>

   


    </List>
    */}
      </Box>
    </Box>
  );
};

export default Rightbar;
