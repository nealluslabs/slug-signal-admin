import { 
  Mail, Notifications, Diamond, Dashboard, Group, Message, Laptop, CalendarToday, KeyboardArrowDown, LibraryMusic,
  Person, MusicNote, TaskAlt
} from "@mui/icons-material";

import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { TbMessage } from "react-icons/tb";

// Share Icon
import { FaPowerOff, FaShare } from "react-icons/fa6";
import { TiFlowMerge } from "react-icons/ti";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  ToggleButtonGroup,
  ToggleButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";

// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';

// Navigation
import { useNavigate } from "react-router-dom";

// Logo Image
import Logo from '../assets/images/logo/circle 1.png';
import { logout } from "src/redux/actions/auth.action";
import { useDispatch } from "react-redux";
import { clearUser, logoutFxn } from "src/redux/reducers/auth.slice";
import { notifySuccessFxn } from "src/utils/toast-fxn";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  background:"white",
  position:"relative",
  color:"black"
  //background:"white"

});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
const Navbar = ({ active }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const openClick = Boolean(anchorEl);

  const openClick2 = Boolean(anchorEl2);

  const handleClick = (event) => {
    //setAnchorEl(event.currentTarget);
    setAnchorEl(customAnchorRef.current);
  };


  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
    setOpen(true)
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };


  const notificationsList = [
    { icon: <Person sx={{ color: "#E61484", marginRight: 2 }} />, title: "You have a new follower!", subtitle: "October 30 at 4:23PM" },
    { icon: <Mail sx={{ color: "#E61484", marginRight: 2 }} />, title: "You have a new Message!", subtitle: "October 22 at 3:13PM" },
    { icon: <MusicNote sx={{ color: "#E61484", marginRight: 2 }} />, title: "New music brief posted!", subtitle: "October 30 at 3:13PM" },
    { icon: <MusicNote sx={{ color: "#E61484", marginRight: 2 }} />, title: "Your song has been posted", subtitle: "October 30 at 3:13PM" },
    { icon: <MusicNote sx={{ color: "#E61484", marginRight: 2 }} />, title: "You've earned $10 in AudioVybez credit for inviting Jason Grant!", subtitle: "October 30 at 3:1 3PM" }
  ]

  const navigate = useNavigate();
   const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const customAnchorRef = useRef(null);

  console.log(active);

  return (
    <AppBar 
      position="sticky"
      sx={{ borderBottom: "0.5px solid grey", background: "white", boxShadow: "none" }}
    >
      <StyledToolbar>
        {/* First Section  */}
        
        <Box
          mx="80px"
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 2fr", // 3 columns
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Left: Slug Signal (1/3) */}
          <Box
            sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
            onClick={() => navigate("/home")}
          >
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "inline" },
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              SLUG SIGNAL
            </Typography>
          </Box>

          {/* Center: Trends (2/3) */}
          <Box sx={{ display: "flex" }}>
            <Box
              py={1} px={3} mx={1}
              onClick={() => navigate("/users")}
              sx={{ 
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                borderRadius: "8px",
                width:"max-content",
                transition: "all 0.3s ease",
                backgroundColor: active === "users" ? "#D3D3D355" : "transparent",
                "&:hover": {
                  backgroundColor: active === "users" ? "#D3D3D355" : "#D3D3D325"
                },
              }}
            >
              {/*<FaShare />*/}
              <Typography sx={{ ml: 1 }}>Users</Typography>
            </Box>


            <Box
              py={1} px={3} mx={1}
              onClick={() => navigate("/my-signals")}
              sx={{ 
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                borderRadius: "8px",
                width:"max-content",
                transition: "all 0.3s ease",
                backgroundColor: active === "my-signals" ? "#D3D3D355" : "transparent",
                "&:hover": {
                  backgroundColor: active === "my-signals" ? "#D3D3D355" : "#D3D3D325"
                },
              }}
            >
              <FaShare />
              <Typography sx={{ ml: 1 }}>All Signals</Typography>
            </Box>


            <Box
              py={1} px={3} mx={1}
              onClick={() => navigate("/settings")}
              sx={{ 
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                borderRadius: "8px",
                width:"max-content",
                transition: "all 0.3s ease",
                backgroundColor: active === "settings" ? "#D3D3D355" : "transparent",
                "&:hover": {
                  backgroundColor: active === "settings" ? "#D3D3D355" : "#D3D3D325"
                },
              }}
            >
              {/*<FaShare />*/}
              <Typography sx={{ ml: 1 }}>Settings</Typography>
            </Box>

            {/*<Box
              py={1} px={3} mx={1}
              onClick={() => navigate("/dash")}
              sx={{ 
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                borderRadius: "8px",
                width:"max-content",
                transition: "all 0.3s ease",
                backgroundColor: active === "dash" ? "#D3D3D355" : "transparent",
                "&:hover": {
                  backgroundColor: active === "dash" ? "#D3D3D355" : "#D3D3D325"
                },
              }}
            >
              
              <Typography sx={{ ml: 1 }}>Saved Signals</Typography>
            </Box>*/}
           {/*
            <Box
              py={1} px={3} mx={1}
              onClick={() => navigate("/users")}
              sx={{ 
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                backgroundColor: active === "users" ? "#D3D3D355" : "transparent",
                "&:hover": {
                  backgroundColor: active === "users" ? "#D3D3D355" : "#D3D3D325"
                },
              }}
            >
              <TiFlowMerge />
              <Typography sx={{ ml: 1 }}>Users</Typography>
            </Box>
            */}
          </Box>

          {/* Right: Can be empty or something later */}
          <Box>
         
         {
            <Box
              py={1} px={3} mx={1}
              onClick={() => {dispatch(clearUser()); navigate('/login') ; notifySuccessFxn("Logged Out!") } }
              sx={{ 
                position:"relative",
                left:"60%",
                width:"10rem",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                backgroundColor: active === "users" ? "#D3D3D355" : "transparent",
                "&:hover": {
                  backgroundColor: active === "users" ? "#D3D3D355" : "#D3D3D325"
                },
              }}
            >
              <FaPowerOff />
              <Typography sx={{ ml: 1 }}>Log out</Typography>
            </Box>
            }


          </Box>
        </Box>

    
        
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
