import { 
    Box, Typography
  } from "@mui/material";

// Components
import MessageHeaderComponent from "./message-header.component";
import MessageBoxComponent from "./message-box.component";
import AllMessagesContentComponent from "./all-messages-content.component";
  
  const MessageFeedComponent = () => {
  
    return (
      <Box   my={2.5} mt={0} ml={0/*-2.5*/} flex={2.1} p={{ xs: 0, md: 2 }} style={{position:"relative",left:"-0.6rem"}}  >
         
        {/* ml={{md:2,lg:4,xl:0}} mr={{lg:-2,xl:0}}*/}

        <Box sx={{background:"#302C34",borderRadius:"0.5rem",width:"100.5%" }}   >
            
            <Box mt={2} >
                <MessageHeaderComponent />
                <AllMessagesContentComponent />
                <MessageBoxComponent />
            </Box>

        </Box>

      </Box>
    );
  };
  
  export default MessageFeedComponent;
  