import { Box, Typography } from "@mui/material";

// Image
import Image from '../../assets/images/whiteman.jpeg';

const CardComponent = () => {

    return (
        <Box mr={1} px={1.5} sx={{ background: "#252328", width: 250, flexShrink: 0,  }}>
            <Box component="img" src={ Image } mt={3} alt="Just an image" sx={{ height: 256, width: 242 }} />

            <Typography mt={2} sx={{ fontFamily: "inter", fontWeight: "900", fontSize: 20 }}>Paul Stewart</Typography>
            <Typography mb={2} sx={{ fontFamily: "inter", fontWeight: "200", fontSize: "14px" }}>Music Supervisor</Typography>
        </Box>
    )
}

export default CardComponent;
