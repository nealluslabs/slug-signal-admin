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
  Send 
} from '@mui/icons-material';

const Post2 = () => {
  return (
    <Card sx={{ margin: "12px 0px" }}>
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

      <CardContent>
        <Typography mb={2.5} sx={{ fontWeight: "900", fontSize: 20, fontFamily: "inter" }}>
          Live Listening Session & 1-on-1 Feedback with Music Supervisor Paul Stewart
        </Typography>

        <Typography variant="body2" color="text.primary">
          <Typography sx={{ fontSize: 12, fontFamily: "inter" }} mb={1}>Saturday, May 4</Typography>
          <Typography sx={{ fontSize: 12, fontFamily: "inter" }}>3:00 PM - 4:00 PM</Typography>
        </Typography>

        {/* <Box mt={3} mb={1} sx={{ display: "flex", alignItems: "center" }}>
          <Typography mr={3} sx={{ fontSize: 14 }}>Awarded Members</Typography>
          <Avatar alt="Not available" src="https://material-ui.com/static/images/avatar/7.jpg" sx={{ width: 32, height: 32, marginLeft: "-8px" }} />
          <Avatar alt="Not available" src="https://material-ui.com/static/images/avatar/3.jpg" sx={{ width: 32, height: 32, marginLeft: "-8px" }} />
          <Avatar alt="Not available" src="https://material-ui.com/static/images/avatar/4.jpg" sx={{ width: 32, height: 32, marginLeft: "-8px" }} />
          <Avatar alt="Not available" src="https://material-ui.com/static/images/avatar/3.jpg" sx={{ width: 32, height: 32, marginLeft: "-8px" }} />
          <Avatar sx={{ bgcolor: "#F4D7DA", width: 32, height: 32, marginLeft: "-8px" }}>
            <Typography sx={{ color: "#D25B68", fontSize: 12 }}>+5</Typography>
          </Avatar>
        </Box> */}

        <Box>
          <Typography sx={{ fontSize: 12, marginTop: 4, fontFamily: "inter" }}>View Details</Typography>
        </Box>
      </CardContent>

      <CardMedia
        component="img"
        height="20%"
        image="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Paella dish"
      />
      
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
            sx={{ width: 24, height: 24 }}
          />
          <Typography sx={{ fontFamily: 'inter', fontSize: 14 }}>Like</Typography>
        </IconButton>
        <IconButton aria-label="share">
          <ChatBubbleOutline sx={{ width: 24, height: 24 }} />
          <Typography sx={{ fontFamily: 'inter', fontSize: 14 }}>Comment</Typography>
        </IconButton>
        <Typography ml={2} sx={{ fontSize: 14 }}>4w</Typography>
      </CardActions>

      <Box 
        mb={1} mx={1} px={1} py={0.5} 
        sx={{ display: "flex", alignItems: "center", background: '#252328', borderRadius: 4 }}
      >
        <Avatar 
          alt="Not available" 
          src="https://material-ui.com/static/images/avatar/7.jpg" 
          sx={{ width: 32, height: 32 }} 
        />
        <TextField 
          placeholder="Write a comment..."
          size="small"
          fullWidth
          sx={{ outline: "none", border: "none", fontFamily: "inter" ,
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
            }, 
          }}
        />
        <SentimentVerySatisfied sx={{ width: 18, height: 18, color: "#8D8A8A", margin: "0px 1px", cursor: "pointer" }}  />
        <CameraAlt sx={{ width: 18, height: 18, color: "#8D8A8A", margin: "0px 1px", cursor: "pointer" }} />
        <GifBox sx={{ width: 18, height: 18, color: "#8D8A8A", margin: "0px 1px", cursor: "pointer" }} />
        <Send sx={{ width: 21, height: 21, color: "#8D8A8A", marginX: 1, cursor: "pointer" }} />
      </Box>
    </Card>
  );
};

export default Post2;
