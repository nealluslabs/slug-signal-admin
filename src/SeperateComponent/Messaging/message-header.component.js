import { Box, Typography, Avatar } from "@mui/material";

import { Call, Videocam, MoreVert } from "@mui/icons-material";
import { useSelector } from "react-redux";

const MessageHeaderComponent = () => {

    const {selectedUserToChat} = useSelector((state)=>state.group)

    return (
        <Box py={1.5} px={1} sx={{ display: "flex", justifyContent: "space-between", background: "inherit"/*"#2E2E2E"*/, alignItems: "center",borderBottom:"1px solid #606060" }}>
            
            <Box sx={{ display: "flex",alignItems:"center",opacity:selectedUserToChat?"1":"0" }}>
                <Box sx={{ position: "relative", marginRight: "7px" }}>
                        <Avatar 
                        alt="Not available" 
                        src={selectedUserToChat &&selectedUserToChat.profileImg?selectedUserToChat.profileImg :""}
                        sx={{ width: 42, height: 42, marginRight: "8px", marginTop: "2px" }}
                    />
                   {/* <Box 
                        sx={{ 
                            background: "#53E04E", borderRadius: "50%", position: "absolute", width: 2, 
                            height: 2, padding: "5px", marginTop: "-12px", marginLeft: "36px"
                    }}>

                    </Box>*/}
                </Box>

                <Box>
                    <Typography sx={{ fontSize: "16px", fontFamily: "inter",fontWeight:"600" }}>{selectedUserToChat &&selectedUserToChat.username?selectedUserToChat.username :selectedUserToChat &&selectedUserToChat.firstName && selectedUserToChat.lastName ?selectedUserToChat.firstName + " " +selectedUserToChat.lastName : "Andrea Belita"}</Typography>
                    {/*<Typography sx={{ fontSize: "10px", color: "grey", fontFamily: "inter" }}>Active</Typography>*/}
                </Box>
            </Box>

            {/*
            <Box>
                <Call sx={{ width: 24, height: 24, cursor: "pointer", marginX: "7px" }} />
                <Videocam sx={{ width: 24, height: 24, cursor: "pointer", marginX: "7px" }} />
                <MoreVert sx={{ width: 24, height: 24, cursor: "pointer", marginX: "7px" }} />
            </Box>
            */}

        </Box>
    )
}

export default MessageHeaderComponent;
