import { Box, Typography } from "@mui/material";

// Icons
import { Add, Warning } from "@mui/icons-material";

const OwnerHeaderComponent = ({ title, warning,AddParty,setParty,party }) => {

    return (
        <Box py={0.5} px={1} mt={3} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "white" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Add sx={{ color: "#A01565", marginRight: "2px",cursor:"pointer" }} onClick={()=>(AddParty(setParty,party))} />
                <Typography 
                    sx={{ color: "black", fontSize: 12, fontFamily: "inter", fontWeight: "bold" }}
                >
                    { title }
                </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", }}>
                <Typography 
                    sx={{ color: "black", fontWeight: "bold", fontSize: 12, fontFamily: "inter" }}
                >
                    Split%
                </Typography>
                {
                    warning && <Warning sx={{ color: "#FBC756" }} />
                }
            </Box>
        </Box>
    )
}

export default OwnerHeaderComponent;
