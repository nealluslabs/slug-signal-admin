import { 
    Box, Stack, Skeleton, Typography, ImageList, ImageListItem, styled, InputBase, alpha, Avatar
  } from "@mui/material";
  import { Search, ArrowDropDown, GroupAdd, Inbox, MoreVert } from "@mui/icons-material"
  import React, { useState } from "react";
//   import Post from "./Post";
//   import Post1 from "./Post1";
//   import Post2 from "./Post2";
//   import Post3 from "./Post3";
//   import Post4 from "./Post4";
//   import Post5 from "./Post5";
//   import Post6 from "./Post6";
//   import Post7 from "./Post7";
//   import Post8 from "./Post8";

import Post1 from "src/componentsMyNetwork/Post1";
import Post2 from "src/componentsMyNetwork/Post2";
  
  // Feed images
  import Laza from '../../assets/images/lazarra.jpeg';
  import Rea from '../../assets/images/reaubeau.jpeg';
  import Afri from "../../assets/images/Afri.jpeg";
  import D1 from '../../assets/images/D1.jpeg'
import { Element } from "react-scroll";
  
  const SearchBox = styled("div")(({ theme }) => ({
    backgroundColor: "white", // Completely white background
    border: "1px solid #ccc", // Optional: Add a subtle border
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "5px 10px", // Inner padding
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional: Subtle shadow
  }));
  
  const SearchInput = styled(InputBase)(({ theme }) => ({
    flex: 1,
    marginLeft: theme.spacing(1),
    "& .MuiInputBase-input": {
      padding: "5px 0",
      color: "#333", // Dark text for input
    },
  }));
  
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#333", // Icon color
    padding: theme.spacing(0, 1),
  }));
  
  const DashboardFeedComponent = () => {
    const [loading, setLoading] = useState(false);
  
    const data = [
      { img: Afri, name: "Africaine" },
      { img: D1, name: "D1WAV" },
      { img: Rea, name: "Reau Beau" },
      { img: Laza, name: "La Zarra" }
    ];
  
    const chat = [
      { img: "https://material-ui.com/static/images/avatar/7.jpg", username: "Andrea Belita", role: "Artist", num:"1" },
      { img: "https://material-ui.com/static/images/avatar/6.jpg", username: "Andrea Belita", role: "Artist", num:"2" },
      { img: "https://material-ui.com/static/images/avatar/5.jpg", username: "Andrea Belita", role: "Artist", num:"3" },
      { img: "https://material-ui.com/static/images/avatar/4.jpg", username: "Andrea Belita", role: "Artist", num:"4" },
      { img: "https://material-ui.com/static/images/avatar/3.jpg", username: "Andrea Belita", role: "Artist", num:"5" },
      { img: "https://material-ui.com/static/images/avatar/7.jpg", username: "Andrea Belita", role: "Artist", num:"6" },
      { img: "https://material-ui.com/static/images/avatar/6.jpg", username: "Andrea Belita", role: "Artist", num:"7" },
      { img: "https://material-ui.com/static/images/avatar/5.jpg", username: "Andrea Belita", role: "Artist", num:"8" },
      { img: "https://material-ui.com/static/images/avatar/4.jpg", username: "Andrea Belita", role: "Artist", num:"9" },
      { img: "https://material-ui.com/static/images/avatar/3.jpg", username: "Andrea Belita", role: "Artist", num:"10" }
    ]
  
    setTimeout(() => {
      setLoading(false);
    }, [3000]);

  
  
    return (
      <Box flex={5} p={{ xs: 0, md: 2 }} >

       {/* ml={{md:2,lg:4,xl:0}} mr={{lg:-2,xl:0}}*/}

        <Box mt={1} ml={{md:2,lg:4,xl:0}} mr={{lg:-2,xl:0}}  >
        <Element name="scrollContainer" style={{ overflowY: 'auto', maxHeight: '150vh', scrollbarWidth: 'none', 
    msOverflowStyle: 'auto' }}>
            <Post1 />
            <Post1 />
            </Element>
        </Box>
        
  
        {/* {loading ? (
          <Stack spacing={1}>
            <Skeleton variant="text" height={100} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="text" height={20} />
            <Skeleton variant="rectangular" height={300} />
          </Stack>
        ) : (
          <>
            <Post />
            <Post1 />
            <Post2 />
            <Post3 />
            <Post4 />
            <Post5 />
            <Post6 />
            <Post7 />
            <Post8 />
          </>
        )} */}
      </Box>
    );
  };
  
  export default DashboardFeedComponent;
  