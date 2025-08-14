import Sidebar from "../componentsMyNetwork/Sidebar";
import Feed from "../componentsMyNetwork/Feed";
import Rightbar from "../componentsMyNetwork/Rightbar";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "../componentsMyNetwork/Navbar";
import Add from "../componentsMyNetwork/Add";
import { useState,useEffect } from "react";

import { useParams } from "react-router-dom"; // Params

// Components
import { DashboardSidebar, DashboardFeedComponent, DashboardRightbarComponent } from "src/SeperateComponent/Dashboard";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import BackOption from "src/componentsMyNetwork/backOption";
import UserDetails from "src/componentsMyNetwork/UserDetails";
import TrendDetails from "src/componentsMyNetwork/TrendDetails";


function TrendDetailsPage() {
  

  const [mode, setMode] = useState("dark");

  const { type } = useParams();

  const darkTheme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: '#FFF',   // Page background
        
      },
      color:"white"
    },
  });

const user = useSelector((state)=> state.auth)
const {trendInFocus} = useSelector((state)=> state.group)

console.log(" LOGGED IN USER IS -->",user)
const navigate = useNavigate()
  useEffect(()=>{

    if(user && !user.user){
      navigate('/login')
    }

  },[])

  const afrofuturism = [
    {
      label1: "id",
      value1: "1",
      label2: "Case Study Example",
      value2: "Nike launched a sneaker collection inspired by Afrofuturist themes.",
      label3: "Audience Profile",
      value3: "Gen Z, Black Creatives, Afro-Caribbean diaspora"
    },
    {
      label1: "detected_at",
      value1: "7/9/2025 2:34 PM",
      label2: "Thought Starters",
      value2: "Collaborate with Afrocentric artists; Create branded sci-fi visual campaigns.",
      label3: "Geographic Hotspots",
      value3: "Atlanta, Johannesburg, London"
    },
    {
      label1: "platforms",
      value1: "Instagram, TikTok",
      label2: "Cultural Significance Score",
      value2: "8.7",
      label3: "Brand Sentiment Impact",
      value3: "Highly positive for authenticity; risky if performative"
    },
    {
      label1: "impact_level",
      value1: "High",
      label2: "Brands On This Trend",
      value2: "Nike, Marvel, Netflix",
    },
  ];
  
  
  const digitalDetox = [
    {
      label1: "id",
      value1: "2",
      label2: "Case Study Example",
      value2: "Headspace partnered with Spotify for mindfulness playlists.",
      label3: "Audience Profile",
      value3: "Millennial Parents, Gen Z Students, Wellness Seekers"
    },
    {
      label1: "detected_at",
      value1: "7/9/2025 1:15 PM",
      label2: "Thought Starters",
      value2: `Build "offline challenges" on social media; Partner with wellness influencers.`,
      label3: "Geographic Hotspots",
      value3: "LA, Toronto, Sydney"
    },
    {
      label1: "platforms",
      value1: "TikTok",
      label2: "Cultural Significance Score",
      value2: "7.9",
      label3: "Brand Sentiment Impact",
      value3: "Strong for wellness brands; low risk"
    },
    {
      label1: "impact_level",
      value1: "Medium",
      label2: "Brands On This Trend",
      value2: "Headspace, Calm, Pinterest",
    },
  ];

  const retroTech = [
    {
      label1: "id",
      value1: "2",
      label2: "Case Study Example",
      value2: "Nintendo reissued limited-edition Game Boys.",
      label3: "Audience Profile",
      value3: "Millennials, Gen X, Male Gamers"
    },
    {
      label1: "detected_at",
      value1: "7/9/2025 12:05 PM",
      label2: "Thought Starters",
      value2: `Host a 90s nostalgia pop-up event; Launch retro-themed ad campaigns.`,
      label3: "Geographic Hotspots",
      value3: "Tokyo, Portland, Berlin"
    },
    {
      label1: "platforms",
      value1: "YouTube, Reddit",
      label2: "Cultural Significance Score",
      value2: "7.2",
      label3: "Brand Sentiment Impact",
      value3: "Nostalgic, fun; great for heritage activations"
    },
    {
      label1: "impact_level",
      value1: "Low",
      label2: "Brands On This Trend",
      value2: "Nintendo, Polaroid, Sega",
    },
  ];

  

  const dataMap = {
    "afrofuturism": {
      data: afrofuturism, title: "Afrofuturism", subTitle: "A surge in Afrofuturist aesthetics in fashion and film.",
      image: "https://slugsignal-trends.s3.eu-west-3.amazonaws.com/Afrofuturism.png"

    },
    "digitalDetox": { 
      data: digitalDetox, title: "Digital Detox", subTitle: "Rise in #DigitalDetox movements among Gen Z users.", 
      image: "https://slugsignal-trends.s3.eu-west-3.amazonaws.com/Digital-Detox.jpg" 
    },
    "retroTech": {
      data: retroTech, title: "Retro Tech", subTitle: "Renewed interest in 90s gaming consoles and retro tech.",
      image: "https://slugsignal-trends.s3.eu-west-3.amazonaws.com/Retro-Tech.jpg"
    },
  };
  
  const trendData = dataMap[type] || {
    data: [],
    title: "Not Found",
    subTitle: "No trend data available for this category.",
    image: "https://via.placeholder.com/500x300?text=No+Image",
  };

  const breadcrumbs = [
    { label: "Trends", path: "/home" },
    { label: trendData.title, path: "/home/details" },
  ];


  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"} >
        <Navbar active="dashboard" />

        <BackOption items={ breadcrumbs } title={ trendInFocus.trendName } />

        <TrendDetails trendData={ trendInFocus } />

        {/* <Add /> */}
      </Box>
    </ThemeProvider>
  );
}

export default TrendDetailsPage;
