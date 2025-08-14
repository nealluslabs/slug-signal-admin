import { Box, Typography, Avatar } from "@mui/material";

const PersonMessageComponent = () => {

    return (
        <Box my={1.5} sx={{ display: "flex", cursor: "pointer" }}>
            
            <Box sx={{ position: "relative" }}>
                <Avatar 
                    alt="Not available" src="https://material-ui.com/static/images/avatar/3.jpg"
                    sx={{ width: 52, height: 52, marginRight: "8px", marginTop: "2px" }}
                />
                <Box 
                    sx={{ 
                        background: "#53E04E", borderRadius: "50%", position: "absolute", width: 2, 
                        height: 2, padding: "5px", marginTop: "-12px", marginLeft: "42px"
                }}></Box>
            </Box>

            <Box>
                <Box sx={{ display: "flex" }}>
                    <Typography sx={{ fontSize: 12 }}>Ope</Typography>
                    <Typography ml={1.5} mt={0.5} sx={{ fontSize: 8, color: "grey" }}>4:27pm</Typography>
                </Box>

                <Typography sx={{ fontSize: "10px", marginRight: "4px" }}>
                    Gee, its been good news all day. i met someone special today. she's really pretty.
                </Typography>
            </Box>
        </Box>
    )
}

export default PersonMessageComponent;
