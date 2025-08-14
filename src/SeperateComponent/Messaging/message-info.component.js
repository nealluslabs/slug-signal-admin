import { Box, Typography } from "@mui/material";

const MessageInfoComponent = () => {

    return (
        <Box my={2.3} px={2.5} py={2} sx={{ background:"#302c34"/* "#252328"*/, borderRadius: "12px",height:"380px",width:"109%" }}>
            <Typography sx={{ fontWeight: "600", fontSize: 16,borderBottom:"1px solid #E61484",width:"max-content" }}>
                Latest News
            </Typography>

           <Box sx ={{display:"flex",justifyContent:"flex-start",flexDirection:"column",gap:"3px",marginTop:"10px"}}>
            <Typography my={0} sx={{ fontWeight: "600", fontSize: 13 }}>
               Instrumental Tracks Needed Asap!
            </Typography>
            <Typography my={0} sx={{ fontWeight: "100", fontSize: 12 }}>
              2h ago | Quick Music Search
            </Typography>
            </Box>

            <Box sx ={{display:"flex",justifyContent:"flex-start",flexDirection:"column",gap:"3px",marginTop:"10px"}}>
            <Typography my={0} sx={{ fontWeight: "600", fontSize: 13 }}>
               Major Placement Alert! Audiovybez Member lands Placement in Season 7 of "The Neighborhood" on CBS
            </Typography>
            <Typography my={0} sx={{ fontWeight: "100", fontSize: 12 }}>
              1w ago | Member Placement
            </Typography>
            </Box>

        </Box>
    )
}

export default MessageInfoComponent;
