import { Avatar, Box, Button, Typography } from "@mui/material";

// React Icons
import { FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";

// Image
import Smoke from "../../assets/images/smoke.jpeg";
import painfulGirl from "../../assets/images/painful-girl.jpg";

// Components
import FeaturedSongsComponent from "./featured-songs.component";
import { useState } from "react";
import AboutMusicianComponent from "./about-musician.component";

const MusicalBioFeedComponent = () => {

    const [activeTab,setActiveTab] = useState("Top Tracks")


    const chat = [
        { img: "https://material-ui.com/static/images/avatar/7.jpg", username: "DaVyne Truth", role: "Musician/Band", num:"1" },
        { img: "https://material-ui.com/static/images/avatar/6.jpg", username: "JBwai", role: "Musician/Band", num:"2" },
        { img: "https://material-ui.com/static/images/avatar/5.jpg", username: "Bebe Boy", role: "Musician/Band", num:"3" },
        /*{ img: "https://material-ui.com/static/images/avatar/4.jpg", username: "Andrea Belita", role: "Musician/Band", num:"4" },
        { img: "https://material-ui.com/static/images/avatar/3.jpg", username: "Andrea Belita", role: "Musician/Band", num:"5" },
        { img: "https://material-ui.com/static/images/avatar/7.jpg", username: "Andrea Belita", role: "Musician/Band", num:"6" },
        { img: "https://material-ui.com/static/images/avatar/6.jpg", username: "Andrea Belita", role: "Musician/Band", num:"7" },
        { img: "https://material-ui.com/static/images/avatar/5.jpg", username: "Andrea Belita", role: "Musician/Band", num:"8" },
        { img: "https://material-ui.com/static/images/avatar/4.jpg", username: "Andrea Belita", role: "Musician/Band", num:"9" },
        { img: "https://material-ui.com/static/images/avatar/3.jpg", username: "Andrea Belita", role: "Musician/Band", num:"10" }*/
      ]

    return (
        <Box flex={2} p={{ xs: 0, md: 2, }} sx={{backgroundColor:"inherit"/*"#252328"*/,position:"relative",left:"-0.15rem"}}>
          
           <Box sx={{backgroundColor:"#252328",borderRadius:"10px",padding:"10px",height:"28rem"}}>
            <Box
                sx={{
                    maxWidth: '100%',
                    height: '185px',
                    backgroundImage: `url(${Smoke})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: "14px",
                    position: 'relative',
                }}
                mb={1}
            >



           
             <Box
                sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start",flexDirection:"column" ,paddingLeft:"17px",position:"relative",top:"50%"}}
            >
                <Typography
                    sx={{ fontFamily: "inter", fontSize: "28px", fontWeight: "bold" }}
                >Lilyisthatyou</Typography>

               <Box
                    sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}
                >

                   <Typography
                        sx={{ fontFamily: "inter", fontSize: "12px",paddingX:"0.5rem",paddingY:"0.35rem",borderRadius:"5px",color:"white",backgroundColor:"#A01565", cursor: "pointer",  }}
                        mr={2}
                    >Pop</Typography>

                     <Typography
                        sx={{ fontFamily: "inter", fontSize: "12px",paddingX:"0.5rem", paddingY:"0.35rem",borderRadius:"5px",color:"white",backgroundColor:"#A01565",cursor: "pointer",  }}
                        mr={2}
                    >EDM</Typography>

                  <Typography
                        sx={{ fontFamily: "inter", fontSize: "12px",paddingX:"0.5rem",paddingY:"0.35rem",borderRadius:"5px",color:"white",backgroundColor:"#A01565", cursor: "pointer",  }}
                        mr={2}
                    >LGBTQ+</Typography>
               </Box>
              
               {/* COMMENTED THIS OUT JUST IN CASE WE NEED TO RE-USE
                <Box
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                    <Typography
                        sx={{ fontFamily: "inter", fontSize: "12px", cursor: "pointer", '&:hover': { textDecoration: "underline" } }}
                        mr={2}
                    >View Public Profile</Typography>

                    <Box
                        mt={0.5}
                    >
                        <FaInstagram style={{ marginLeft: "7px", fontSize: "18px", cursor: "pointer" }} />
                        <FaYoutube style={{ marginLeft: "7px", fontSize: "18px", cursor: "pointer" }} />
                        <FaSpotify style={{ marginLeft: "7px", fontSize: "18px", cursor: "pointer" }} />
                    </Box>
                </Box>
            */}


            </Box>


            </Box>
            


            <Box sx={{ display:"flex",gap:"1rem",marginLeft:"15px",width:"60%"}}>
             <Typography variant="h6" fontWeight={100}
             onClick={() => setActiveTab("Top Tracks")}
             mt={2} mb={2} sx={{ 
               borderBottom: activeTab === "Top Tracks"?"2px solid #A01565":"none", 
               display: "inline-block", 
               paddingBottom: "2px",
               fontFamily: "inter",
               fontSize: 12,
               fontWeight: "600",
               cursor:"pointer",
             }}>
               Top Tracks
             </Typography>
             
             <Typography variant="h6" fontWeight={100}
             onClick={() => setActiveTab("Playlists")}
             mt={2} mb={2} sx={{ 
               borderBottom: activeTab === "Playlists"?"2px solid #A01565":"none", 
               display: "inline-block", 
               paddingBottom: "2px",
               fontFamily: "inter",
               fontSize: 12,
               fontWeight: "600",
               cursor:"pointer",
             }}>
               Playlists
             </Typography>
             
             <Typography variant="h6" fontWeight={100}
              onClick={() => setActiveTab("Albums")}
             mt={2} mb={2} sx={{ 
              borderBottom:activeTab === "Albums"?"2px solid #A01565":"none", 
               display: "inline-block", 
               paddingBottom: "2px",
               fontFamily: "inter",
               fontSize: 12,
               fontWeight: "600",
               cursor:"pointer",
             }}>
              Albums
             </Typography>


             <Typography variant="h6" fontWeight={100}
              onClick={() => setActiveTab("Videos")}
             mt={2} mb={2} sx={{ 
              borderBottom:activeTab === "Videos"?"2px solid #A01565":"none", 
               display: "inline-block", 
               paddingBottom: "2px",
               fontFamily: "inter",
               fontSize: 12,
               fontWeight: "600",
               cursor:"pointer",
             }}>
              Videos
             </Typography>

           </Box>


           <Box px={1.2} py={1} my={0} 
      sx={{ display: "flex", justifyContent: "space-between", background: "inherit"/*"#252328"*/, alignItems: "center",borderBottom:"1px solid #606060" }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/*<Typography mr={2} sx={{ fontSize: 14, fontFamily: "inter" }}>{ item.num }.</Typography>*/}
      
          <Avatar
            alt="track cover art"
            src={ painfulGirl }
            sx={{ width: 40, height: 40,borderRadius:"3px" }}
          />

      <Box sx={{scale:"0.9", display: "flex", justifyContent: "space-between",alignItems: "flex-start", width:"max-content",position:"relative",left:"0rem",gap:"1rem"}}>
          <Box >
            <Typography sx={{ fontSize: 11.5, fontFamily: "inter" }}>{ "Painful Euphoria"}</Typography>
            <Typography sx={{ color: "white"/*"#8D8A8A"*/, fontSize: 10, fontFamily: "inter" }}>{ "Lilyisthatyou" }</Typography>
          </Box>

          <Box >
            <Typography sx={{ fontSize: 11.5, fontFamily: "inter" }}>{ "120BPM"}</Typography>
            <Typography sx={{ color: "white"/*"#8D8A8A"*/, fontSize: 10, fontFamily: "inter" }}>{ "Key: A minor" }</Typography>
          </Box>

          <Typography  sx={{ color: /*"#8D8A8A"*/"white", fontFamily: "inter", fontSize: 11.5 }}>Upbeat,EDM,Explicit</Typography>


        </Box>
      </Box>

      <Box sx={{ display: "flex",gap:"2px",alignItems:"center",justifyContent:"center" }}>
       

        <Button
        variant="contained"
        //startIcon={<MdPersonAddAlt1 />}
        sx={{
          marginTop: 0,
          borderRadius: '5rem',
          paddingX: 2,
          background: "linear-gradient(to right, #A01565, #3E256E)",
          color: '#fff',
          textTransform: 'none',
          fontSize: '12px',
          fontWeight:"520",
          scale:"0.8",
          minWidth:"max-content"
        }}
      >
        Add to DISCO
      </Button>

       
      </Box>
    </Box>
</Box>

        <AboutMusicianComponent/>
            {/*commented it out incase we need to re-use it - dagogo -2025 may 8th
            <FeaturedSongsComponent />*/}
        </Box>
    )
}

export default MusicalBioFeedComponent;
