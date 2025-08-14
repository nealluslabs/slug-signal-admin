import React, { useState } from "react";

import { Box, Typography } from "@mui/material";
import { FilterList } from "@mui/icons-material";

// Component 
import { PersonMessageComponent } from "../General";

const MessageListComponent2 = () => {

    const [navValue, setNavValue] = useState("all");

    return (
        <Box my={2} px={1} sx={{}}>
            <Typography 
                mb={2}
                sx={{
                    borderBottom: "2px solid #A01565", 
                    display: "inline-block", 
                    paddingBottom: "2px",
                    fontSize:"20px"
                }}
            >Messages</Typography>

            <Box sx={{ display: 'flex', justifyContent: "space-evenly", borderBottom: "2px solid #FFFFFF",fontSize:"12px" }}>
                <Typography 
                    py={1} px={2} 
                    sx={{ borderBottom: `${navValue == "all" ? "2px solid #A01565" : ""}`, marginBottom: "-2px", cursor: "pointer", fontFamily: "inter" }}
                    onClick={ () => setNavValue("all") }
                >All</Typography>

                <Typography 
                    py={1} px={2} 
                    sx={{ borderBottom: `${navValue == "group" ? "2px solid #A01565" : ""}`, marginBottom: "-2px", cursor: "pointer", fontFamily: "inter" }}
                    onClick={ () => setNavValue("group") }
                >Group</Typography>
                
                <Typography 
                    py={1} px={2} 
                    sx={{ borderBottom: `${navValue == "unread" ? "2px solid #A01565" : ""}`, marginBottom: "-2px", cursor: "pointer", fontFamily: "inter" }}
                    onClick={ () => setNavValue("unread") }
                >Unread</Typography>

                <FilterList sx={{ marginTop: "8px", cursor: "pointer" }} />
            </Box>

            <Box 
                my={1.5} 
                sx={{ 
                    maxHeight: "240px", overflow: "scroll",
                    "&::-webkit-scrollbar": {
                        display: "none",
                      },
                }}
            >
                <PersonMessageComponent />
                <PersonMessageComponent />
                <PersonMessageComponent />
                <PersonMessageComponent />
                <PersonMessageComponent />
            </Box>
        </Box>
    )
}

export default MessageListComponent2;
