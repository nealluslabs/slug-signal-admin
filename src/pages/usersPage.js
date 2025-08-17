import Sidebar from "../componentsMyNetwork/Sidebar";
import Feed from "../componentsMyNetwork/Feed";
import Rightbar from "../componentsMyNetwork/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../componentsMyNetwork/Navbar";
import Add from "../componentsMyNetwork/Add";
import { useState,useEffect } from "react";

// Components
import { DashboardSidebar, DashboardFeedComponent, DashboardRightbarComponent } from "src/SeperateComponent/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import ScreenSearchComponent from "src/componentsMyNetwork/screenSearchComponent";
import DisplayCard from "src/componentsMyNetwork/displayCard";
import UserDisplayCard from "src/componentsMyNetwork/UserDisplayCard";
import UserStatsTable from "src/components/home/user-stats-table";

function UsersPage() {
  

  const [mode, setMode] = useState("dark");


  const darkTheme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: '#FFF',   // Page background
        
      },
    },
  });

const user = useSelector((state)=> state.auth)
console.log(" LOGGED IN USER IS -->",user)
const navigate = useNavigate()
  useEffect(()=>{

  
    if(user && !user.user){
      navigate('/login')
    }

  },[])

const { allUsers, isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
const dummyUsers = [
  {
    id: 1,
    user: "Alice Johnson",
    email: "alice.johnson@example.com",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    user: "Bob Smith",
    email: "bob.smith@example.com",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 3,
    user: "Charlie Davis",
    email: "charlie.davis@example.com",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 4,
    user: "Diana Prince",
    email: "diana.prince@example.com",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 5,
    user: "Ethan Clark",
    email: "ethan.clark@example.com",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];



console.log("Fetched All Users ===========>>>>>>>>>>", allUsers);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} sx={{height:"100vh"}} >
        <Navbar active="users" />

        <ScreenSearchComponent title="Users" />
 {/* <FarmerStatsLong farmers={pastCampaigns} /> */}

        <Box
          mx="88px"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2, 
          }}
        >
            {/* <UserDisplayCard /> */}
            <UserStatsTable user={dummyUsers}/>
            
        </Box>

        {/* <Add /> */}
      </Box>
    </ThemeProvider>
  );
}

export default UsersPage;
