import { Box, Typography } from "@mui/material";

import { PlayCircleOutline, Star } from "@mui/icons-material";

// Image
import Image from "../../assets/images/whiteman.jpeg";

const BookSessionComponent = () => {

    return (
        <Box mt={2}>
            <Box sx={{display:"flex",justifyContent:"space-between"}}>
            <Typography 
                mb={2}
                sx={{
                    borderBottom: "2px solid #A01565", 
                    display: "inline-block", 
                    paddingBottom: "2px",
                    fontSize:"16px",
                    fontWeight:"700"
                }}
            > 1:1 With Industry Experts</Typography>

            <Typography 
                mb={2}
                sx={{
                   
                    display: "inline-block", 
                    paddingBottom: "2px",
                    fontSize:"15px"
                }}
            > 
             View All
            </Typography>
            </Box>


            <Box sx={{ display: 'flex' ,backgroundColor:"#302C34",borderTopRightRadius:"15px",borderBottomRightRadius:"15px"}}>

                <Box 
                    sx={{
                        // maxWidth: '50%',
                        height: '302px',
                        backgroundImage: `url(${Image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderTopLeftRadius: "14px",
                        borderBottomLeftRadius: "14px",
                        position: 'relative',
                        cursor: "pointer"
                    }}
                    flex={1}
                >
                    <Box
                        px={3}
                        py={1}
                        sx={{
                            position: "absolute",
                            zIndex: 2,
                            color: 'white',
                            background: "rgba(0,0,0,0.4)",
                            height: "100%",
                            width: "100%"
                        }}
                    >
                        <PlayCircleOutline sx={{ width: "75px", height: "75px", marginTop: "50%", marginLeft: "27%" }} />
                    </Box>
                </Box>

                <Box flex={1} ml={2} my={0.7} style={{}}>
                    <Typography sx={{ fontFamily: "inter", fontWeight: "900", fontSize: 20 }}>Paul Stewart</Typography>
                    <Typography sx={{ fontFamily: "inter", fontSize: 14, fontWeight: "200", marginTop: "-8px" }}>Music Supervisor</Typography>

                    <Typography my={1} sx={{ fontFamily: "inter" }}>About</Typography>

                    <Typography mb={1} sx={{ fontFamily: "inter", fontSize: 12 }}>
                        Music industry titan Paul Stewart, whose groundbreaking journey as a DJ, promoter, and manager in Hip Hop has left an indelible mark on the culture. 
                        <span 
                            style={{ fontFamily: "inter", color: "#A01565", fontWeight: "900", fontSize: 12, marginLeft: "6px", cursor: "pointer" }}
                        >
                            Read more
                        </span>
                    </Typography>

                    <Typography sx={{ fontFamily: "inter", fontWeight: "900", fontSize: 14 }}>$75/hr</Typography>
                    <Box sx={{ display: "flex" }}>
                        <Star sx={{ width: "21px", height: "21px", color: "#F7871B" }} />
                        <Star sx={{ width: "21px", height: "21px", color: "#F7871B" }} />
                        <Star sx={{ width: "21px", height: "21px", color: "#F7871B" }} />
                        <Star sx={{ width: "21px", height: "21px", color: "#F7871B" }} />
                        <Star sx={{ width: "21px", height: "21px", color: "#F7871B" }} />
                    </Box>
                    <Typography sx={{ fontFamily: "inter", fontSize: 10 }}>upgrade to PRO for booking access </Typography>

                    <Box mt={1.5} p={1} sx={{ background: "linear-gradient(to right, #A01565, #3E256E)", borderRadius: "22px", textAlign: "center", cursor: "pointer",width:"10rem" }}>
                        <Typography>Book Session</Typography>
                    </Box>
                </Box>
            </Box>
            
        </Box>
    )
}

export default BookSessionComponent;
