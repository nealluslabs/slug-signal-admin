import React, { useState } from "react";

import { Box, Typography } from "@mui/material";

// Icons
import { ArrowDropDown } from "@mui/icons-material";

// Component
import SearchBarComponent from "./search.component";
import BriefDetailsModalComponent from "../Dashboard/brief-details-modal.component";

const BriefComponent = ({ data }) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box p={2} pl={0} pr={0} pb={2.5} my={2} sx={{ background:"#302C34" /*"#252328"*/, borderRadius: 3,marginTop:"1.3rem" }}>
            <Typography 
                mb={2}
                sx={{
                    borderBottom: "2px solid #A01565", 
                    display: "inline-block", 
                    paddingBottom: "2px",
                    marginLeft: "20px",
                    fontFamily: "inter",
                    fontWeight: "600",
                    fontSize: "16px"
                }}
            >
                Music Briefs
            </Typography>

            <SearchBarComponent />

           {/* <Box my={1} sx={{ display: "flex" }}>
                <Box py={1} px={1} mr={1} sx={{ background: "#49454F", cursor: "pointer", display: "flex", borderRadius: "5px" }}>
                    <Typography sx={{ fontFamily: "inter", fontSize: 12 }}>Sort by</Typography>
                    <ArrowDropDown mx={1} />
                </Box>
            </Box>
         */}

            <Box sx={{width:"100%",overflowX: 'hidden' ,paddingLeft:"0px",paddingRight:"0px"}}>
                {
                    data.map( (item, key) => (
                        <Box 
                            my={0} 
                            mt={key ===0 ?2:0}
                            p={0}
                            mx={0}
                            sx={{ cursor: "pointer", ":hover": { background:"#3b3640"/*"#40343c"*/ /*"#29272b"*/ },borderBottom:"1px solid #606060" ,position:"relative",left:"-0px",paddingLeft:"10px",paddingRight:"70px",paddingTop:"15px",paddingBottom:"15px"}}
                            onClick={ handleClickOpen }
                        >
                            <Typography sx={{ fontWeight: "900", marginBottom: "4px", fontFamily: "inter", fontSize: 14 }}>
                                { item.text }
                            </Typography>
                            <Typography sx={{ color: "#CCCCCC", fontSize: 12, fontFamily: "inter", marginTop: "3px" }}>
                                { item.mini1 }
                            </Typography>
                            <Typography sx={{ color: "#CCCCCC", fontSize: 12, fontFamily: "inter", marginTop: "3px" }}>
                                { item.mini2 }
                            </Typography>
                        </Box>
                    ) )
                }
            </Box>

            <BriefDetailsModalComponent handleClose={ handleClose } open={ open } />

            <Typography sx={{ fontWeight: "900", paddingTop: "20px", marginLeft: "10px", marginBottom: "60px", cursor: "pointer", fontFamily: "inter", fontSize: 14 }}>See More</Typography>
            
        </Box>
    );
}

export default BriefComponent;
