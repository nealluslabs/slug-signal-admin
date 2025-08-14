import React, { useState } from "react";

import { Box, Typography } from "@mui/material";

// Icons
import { ArrowDropDown } from "@mui/icons-material";

import painfulGirl from 'src/assets/images/painful-girl.jpg'

// Component
//import SearchBarComponent from "./search.component";
//import BriefDetailsModalComponent from "../Dashboard/brief-details-modal.component";

const SongFullDetailComponent = () => {



    const data = [
        { text: "MTV Search - Caught in The Act: DOUBLE LIFE", mini1: "Payout: $1-2K/all-in", mini2: "Deadline: 11/07/24" },
        { text: "Authentic 2018 R&B and Hip-Hop Releases", mini1: "Payout: $5-10K/all-in", mini2: "Deadline: 11/07/24" },
        { text: "Authentic 2018 R&B and Hip-Hop Releases", mini1: "Payout: $5-10K/all-in", mini2: "Deadline: 11/07/24" }
    ];

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box  flex={1.34} p={2} pl={0} pr={0} pb={2.5} my={2} sx={{ background:/*"#302C34"*/ "#252328", borderRadius: 3,position:"relative",top:"1rem" }}>
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
                Painful Euphoria
            </Typography>

            {/*<SearchBarComponent />*/}

           {/* <Box my={1} sx={{ display: "flex" }}>
                <Box py={1} px={1} mr={1} sx={{ background: "#49454F", cursor: "pointer", display: "flex", borderRadius: "5px" }}>
                    <Typography sx={{ fontFamily: "inter", fontSize: 12 }}>Sort by</Typography>
                    <ArrowDropDown mx={1} />
                </Box>
            </Box>
         */}

            <Box sx={{width:"100%",overflowX: 'hidden' ,paddingLeft:"0px",paddingRight:"0px"}}>
                {
                    <>
                        <Box 
                            my={0} 
                            mt={-0.8}
                            p={0}
                            mx={0}
                            sx={{ cursor: "pointer", /*":hover": { background:"#3b3640" },*/borderBottom:"1px solid #606060" ,position:"relative",left:"-0px",paddingLeft:"10px",paddingRight:"70px",paddingTop:"15px",paddingBottom:"15px"}}
                            onClick={ handleClickOpen }
                        >
                            <Typography sx={{ fontWeight: "700", marginBottom: "8px", fontFamily: "inter", fontSize: 14 }}>
                                { "SONG INFO"}
                            </Typography>
                           


                        <Box sx={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",gap:"2rem",width:"100%",position:"relative"}}>
                         <Box sx={{flex:"1"}}>

                         <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "2px" }}>
                            Title: Painful Euphoria
                            
                            </Typography>

                            <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "2px" }}>
                            
                            Artist: Lilyisthatyou
                           
                            </Typography>


                            <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "2px" }}>
                           
                            BPM: 120
                           
                            </Typography>


                            <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "2px" }}>
                           
                            Length: 1:50
                           
                            </Typography>


                            <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "2px" }}>
                            
                            Key:A minor
                            
                            </Typography>


                            <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "2px" }}>
                           
                            Cover Song: No
                            
                            </Typography>

                            <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "2px" }}>
                           
                            Instrumental: No
                           
                            </Typography>


                            <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "2px" }}>
                           
                            Description:
                           
                            </Typography>

                            <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "2px" }}>
                            
                            Sounds Like:
                            </Typography>
                        </Box>
                      
                       <Box sx={{flex:"1"}}>

                        <img  style ={{height:"140px",width:"130px",position:"absolute",right:"-3rem",top:"0.5rem"}} src={painfulGirl}/>
                       </Box>
                       
                        

                       </Box>

                          
                          
                        </Box>


                      <Box 
                      my={0} 
                      mt={0}
                      p={0}
                      mx={0}
                      sx={{ cursor: "pointer", /*":hover": { background:"#3b3640" },*/borderBottom:"1px solid #606060" ,position:"relative",left:"-0px",paddingLeft:"10px",paddingRight:"70px",paddingTop:"15px",paddingBottom:"15px"}}
                      onClick={ handleClickOpen }
                      >
                      <Typography sx={{ fontWeight: "700", marginBottom: "8px", fontFamily: "inter", fontSize: 14 }}>
                          { "RIGHTS HOLDERS"}
                      </Typography>
                      <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "3px" }}>
                          { 
                          "Songwriter(s) & Composer(s):"
                          }
                      </Typography>

                      <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "3px" }}>
                          { 
                          "Kevin Arthur Gordon (ASCAP #432305499) - 50%"
                          }
                      </Typography>

                      <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "3px",marginBottom: "3px" }}>
                          { 
                          "Danielle Deighton (SOCAN #738916108) - 50%"
                          }
                      </Typography>

                      <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "3px" }}>
                          { " Publisher(s):" }
                      </Typography>

                      <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "3px" }}>
                          { " Kevin Gordon (ASCAP #376267430) - 50" }
                      </Typography>


                      <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "3px" ,marginBottom: "3px"}}>
                          { "  Deighton Music Publishing (SOCAN #1147983715) - 50%" }
                      </Typography>


                      <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "3px" }}>
                        {"Master Owner(s):"}
                      </Typography>

                      <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "3px" }}>
                        {"Kevin Arthur Gordon - 50%"}
                      </Typography>

                      <Typography sx={{ color: "#CCCCCC", fontSize: 10, fontFamily: "inter", marginTop: "3px" }}>
                        {" Danielle Deighton - 50%"}
                      </Typography>

                      </Box>

                      </>
                
                }
            </Box>

            {/*<BriefDetailsModalComponent handleClose={ handleClose } open={ open } />*/}

            <Typography sx={{ fontWeight: "700", paddingTop: "20px", marginLeft: "10px", marginBottom: "0px", cursor: "pointer", fontFamily: "inter", fontSize: 14 }}>See More</Typography>
            
        </Box>
    );
}

export default SongFullDetailComponent;
