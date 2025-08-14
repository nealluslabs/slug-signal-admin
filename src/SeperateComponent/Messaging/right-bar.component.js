import { Box, Typography } from "@mui/material";

// Image
import Image from "../../assets/images/msgCover.png";

// Component 
import MessageInfoComponent from "./message-info.component";

const MessageRightBarComponent = () => {

    return (
        <Box flex={1.3} p={2} sx={{ position:"relative",left:"-0.8rem",display: { xs: "none", sm: "block" } }}>
           
            <MessageInfoComponent />
            <Box component="img" src={ Image } mt={3} alt="Just an image"  sx={{borderRadius:"1rem"}} style={{width:"31rem"}}/>
        </Box>
    )
}

export default MessageRightBarComponent;
