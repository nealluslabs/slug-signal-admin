import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
  Box,
  TextField
} from "@mui/material";

// Icons
import { 
  ChatBubbleOutline, 
  SentimentVerySatisfied, 
  CameraAlt, 
  GifBox, 
  Forum,
  Send 
} from '@mui/icons-material';

import { IoChatbubblesOutline } from "react-icons/io5";
import { Bs0CircleFill, BsChatHeart, BsChatHeartFill } from "react-icons/bs";


import panel from 'src/assets/images/panel.jpeg'

const Post1 = () => {
  return (
    <Card sx={{ margin: "12px 0px" ,backgroundColor:"#000",paddingTop:"0rem",paddingBottom:"1.5rem",marginBottom:"1.6rem", borderBottom:"1px solid #606060"}}>
      {/* <CardHeader
        avatar={
          <Avatar src="https://material-ui.com/static/images/avatar/8.jpg" sx={{ bgcolor: "red" }} aria-label="recipe"/>
            
         
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Amelia Spiff"
        subheader="September 14, 2022"
      /> */}
   <Box  sx={{background:"#302C34",borderRadius:"0.6rem",paddingBottom:"0.5rem",paddingTop:"0rem",marginBottom:"1.8rem"}}>
      <CardContent>
        <Typography mb={2.5} sx={{ fontWeight: "900", fontFamily: "inter", fontSize: "20px" }}>New Placement Announcement! 🙌 🙌 🙌</Typography>

        <Typography variant="body2" color="text.primary">
          <Typography sx={{ fontSize: 12, fontFamily: "inter" }} mb={2}>
            Rhythm + Flow Season 2 is back on Netflix with judges DJ Khaled, Ludacris, and Latto. Eminem, Remy Ma, Big Sean, Busta Rhymes, GloRilla and more join the judges to find the next big name in hip-hop.
          </Typography>
          <Typography sx={{ fontSize: 12, fontFamily: "inter" }}>
            Excited to share that @audiovybez has over 40 placements in the upcoming season 🤯 Congratulations to all the members who had their music placed in the show!!
          </Typography>
        </Typography>

        <Box mt={3} mb={1.8} sx={{ display: "flex", alignItems: "center" }}>
          <Typography mr={3} sx={{ fontSize: 14, fontFamily: "inter" }}>Awarded Members</Typography>
          <Avatar alt="Not available" src="https://material-ui.com/static/images/avatar/7.jpg" sx={{ width: 25, height: 25, marginLeft: "-8px" }} />
          <Avatar alt="Not available" src="https://material-ui.com/static/images/avatar/3.jpg" sx={{ width: 25, height: 25, marginLeft: "-8px" }} />
          <Avatar alt="Not available" src="https://material-ui.com/static/images/avatar/4.jpg" sx={{ width: 25, height: 25, marginLeft: "-8px" }} />
          <Avatar alt="Not available" src="https://material-ui.com/static/images/avatar/3.jpg" sx={{ width: 25, height: 25, marginLeft: "-8px" }} />
          <Avatar sx={{ bgcolor: "#F4D7DA", width: 25, height: 25, marginLeft: "-8px" }}>
            <Typography sx={{ color: "#D25B68", fontSize: 12, fontFamily: "inter" }}>+5</Typography>
          </Avatar>
        </Box>
      </CardContent>

      <CardMedia
        component="img"
       
        height="20%"
        image={panel}/*"https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"*/
        alt="social media pic"
        sx={{width:"93%",margin:"0 auto",marginBottom:"1.5rem",marginTop:"0rem",borderRadius:"0.3rem"}}
      />
  </Box>


    <Box sx={{background:"#302C34",borderRadius:"1rem",paddingBottom:"0.5rem",paddingTop:"0rem"}}> 
      <CardActions
       sx={{
        background:"#302C34",
        borderRadius:"1rem"
       }}
      disableSpacing>
        <IconButton aria-label="add to favorites">
         {/* <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
            sx={{ width: 24, height: 24 }}
      />*/}

<BsChatHeartFill style={{fontSize:"16px",marginRight:"8px",fontWeight:"900"}}/>


          <Typography sx={{ fontFamily: 'inter', fontSize: 13 }}>Like</Typography>
        </IconButton>
        <IconButton aria-label="share">
          {/*<Forum sx={{ width: 24, height: 24,marginRight:"8px" }} />*/}
          <IoChatbubblesOutline style={{fontSize:"16px",marginRight:"8px",fontWeight:"900"}}/>

          <Typography sx={{ fontFamily: 'inter', fontSize: 13 }}>Comment</Typography>
        </IconButton>
        <Typography ml={2} sx={{ fontSize: 13, fontFamily: "inter" }}>4w</Typography>
      </CardActions>

      <Box 
        mb={1} mx={1} px={1} py={0.5} 
        sx={{ display: "flex", alignItems: "center"/* background: '#252328'*/, border: "1px solid #606060"  ,background:"#302C34",
        borderRadius:"5rem"}}
      >
        <Avatar 
          alt="Not available" 
          src="https://material-ui.com/static/images/avatar/7.jpg" 
          sx={{ width: 32, height: 32 }} 
        />
        <TextField 
          placeholder="Add a comment..."
          size="small"
          fullWidth
          sx={{ outline: "none", border: "none", fontFamily: "inter",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none", // Removes the border
              },
              "&:hover fieldset": {
                border: "none", // Ensures no border on hover
              },
              "&.Mui-focused fieldset": {
                border: "none", // Ensures no border when focused
              },
              "& .MuiInputBase-input::placeholder": {
                fontStyle: "italic", // ⬅️ italicize the placeholder
                fontSize:"0.8rem"
              },
            },
            
          }}
        />
        <SentimentVerySatisfied sx={{ width: 18, height: 18, color: "#8D8A8A", margin: "0px 1px", cursor: "pointer" }}  />
        <CameraAlt sx={{ width: 18, height: 18, color: "#8D8A8A", margin: "0px 1px", cursor: "pointer" }} />
        <GifBox sx={{ width: 18, height: 18, color: "#8D8A8A", margin: "0px 1px", cursor: "pointer" }} />
        <Send sx={{ width: 21, height: 21, color: "#8D8A8A", marginX: 1, cursor: "pointer" }} />
      </Box>

    </Box>

    </Card>
  );
};

export default Post1;
