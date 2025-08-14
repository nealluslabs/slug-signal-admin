import { Box, Typography } from "@mui/material";

import { MessageInfoComponent } from "../Messaging";

// Image
import Image from "../../assets/images/jarred-promo.jpg"
import UpcomingListeningComponent from "./UpcomingListening.component";

const StrategyRightBarComponent = () => {

    return (
        <Box flex={2.4} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
            <Box 
                sx={{
                    maxWidth: '100%',
                    height: '283px',
                    backgroundImage: `url(${Image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: "14px",
                    position: 'relative',
                }}
            >
                <Box
                    px={3}
                    py={1}
                    sx={{
                        position: "absolute",
                        zIndex: 2,
                        color: 'white',
                        //background: "rgba(0,0,0,0.4)",
                       
                        height: "100%",
                        width: "100%"
                    }}
                >
                   {/*
                    <Typography >
                        <Typography variant="h6" mt={4} sx={{ fontWeight: "900", fontFamily: "inter" }}>
                            Grow your fanbase,
                        </Typography>
                        <Typography  variant="h6" mb={1} sx={{ fontWeight: "900", fontFamily: "inter" }}>
                            the smart way.
                        </Typography>
                    </Typography>
                    <Typography mt={2} sx={{ fontSize: 12, maxWidth: "180px", fontFamily: "inter" }}>
                        Find new fans, increase your stream, and build an audience that grows your revenue.
                    </Typography>
                    */}

                    {/* <Typography sx={{ fontSize: 14, textDecoration: "underline", cursor: "pointer" }}>Pitch Page</Typography> */}
                </Box>
            </Box>
            <Box style={{position:"relative"}}>
            <UpcomingListeningComponent/>
            </Box>
            {/*<MessageInfoComponent />*/}
        </Box>
    )
}

export default StrategyRightBarComponent;
