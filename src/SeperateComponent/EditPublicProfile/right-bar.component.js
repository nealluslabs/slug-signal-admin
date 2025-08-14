import { Box, Typography } from "@mui/material";

// Icons
import { BiDownArrow } from "react-icons/bi";

const EditPublicProfileRightBar = () => {

    return (
        <Box  flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>

            <Box
                sx={{ background: "#252328", borderRadius: "14px" }}
                py={3} px={2.5}
            >
                
                <Box
                    sx={{ background: "#A01565", marginX: 'auto', textAlign: "center", width: "90%", borderRadius: "8px" }}
                    my={ 1 } p={0.5}
                >
                    <Typography
                        sx={{ fontSize: "14px", fontFamily: "inter" }}
                    >Follow</Typography>
                </Box>

                <Box
                    sx={{ background: "#A01565", marginX: 'auto', textAlign: "center", width: "90%", borderRadius: "8px" }}
                    my={ 1 } p={0.5}
                >
                    <Typography
                        sx={{ fontSize: "14px", fontFamily: "inter" }}
                    >Message</Typography>
                </Box>

                <Box ml={1.5} my={3}>
                    <Typography
                        sx={{ fontSize: "12px", fontWeight: "bold", fontFamily: "inter" }}
                    >Artist Tags</Typography>

                    <Box sx={{ display: "flex" }} mt={1}>
                        <Box sx={{ background: "#A01565", borderRadius: "8px" }} px={1.5} py={0.5} mr={1}>
                            <Typography sx={{fontSize:"12px"}} >Pop</Typography>
                        </Box>

                        <Box sx={{ background: "#A01565", borderRadius: "8px" }} px={1.5} py={0.5} mr={1}>
                            <Typography sx={{fontSize:"12px"}}>EDM</Typography>
                        </Box>

                        <Box sx={{ background: "#A01565", borderRadius: "8px" }} px={1.5} py={0.5} mr={1}>
                            <Typography sx={{fontSize:"12px"}}>LQBTQ+</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box ml={1.5} my={3}>
                    <Typography
                        sx={{ fontSize: "12px", fontWeight: "bold", fontFamily: "inter" }}
                    >Location</Typography>

                    <Typography sx={{ color: "grey", fontFamily: "inter", fontSize: "12px" }}>
                        Los Angeles, CA
                    </Typography>

                    <Typography
                        sx={{ fontSize: "12px", fontWeight: "bold", fontFamily: "inter" }}
                        mt={1.5}
                    >Originally From</Typography>

                    <Typography sx={{ color: "grey", fontFamily: "inter", fontSize: "12px" }}>
                        Toronto, Canada
                    </Typography>

                    <Typography
                        sx={{ fontSize: "12px", fontWeight: "bold", fontFamily: "inter" }}
                        mt={2.5}
                    >Proud Accomplishments</Typography>

                    <Typography sx={{ fontFamily: "inter", fontSize: "12px" }} mt={0.5}>
                        Rose to viral stardom with her sex-positive anthem “FMRN,” 
                        which gained millions of plays on TikTok and a feature on Rolling Stone 
                        ahead of its release in July 2021.
                    </Typography>
                </Box>

            </Box>

            <Box
                sx={{ background: "#252328", borderRadius: "14px" }}
                py={3} px={2.5} mt={2}
            >
                <Typography 
                    sx={{ display: "inline-block", borderBottom: "2px solid #A01565", fontSize: "20px", fontWeight: "bold", fontFamily: "inter" }}
                    mb={2.5}
                >
                    Filter
                </Typography>

                <Box>

                    {
                        [ "Keyword", "Tempo", "Version", "Release Year", "Lyrics", "BPM" ].map( item => (
                            <Box 
                                sx={{ display: "flex", justifyContent: "space-between", background: "#49454F", borderRadius: '5px', cursor: "pointer" }}
                                px={1.5} py={1} my={1}
                            >
                                <Typography sx={{ fontSize: "12px", fontFamily: "inter" }}>{ item }</Typography>
                                <BiDownArrow style={{ marginTop: "4px" }} />
                            </Box>
                        ) )
                    }

                </Box>
            </Box>
            
        </Box>
    )
}

export default EditPublicProfileRightBar;
