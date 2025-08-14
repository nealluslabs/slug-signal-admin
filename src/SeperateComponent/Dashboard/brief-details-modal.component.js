import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Menu,MenuItem,Popper,ClickAwayListener,Paper,Popover, FormControl, Autocomplete, TextField, InputAdornment } from "@mui/material";

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { IoSearch } from "react-icons/io5";
import { Element } from "react-scroll";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FileCreatorSelectComponent from "../MusicCatalog/file-creator-select.component";

import { fetchAllSongs,fetchAllPlaylists ,uploadMediaFileTemporary, fetchAllSongsForOneUser, fetchAllPlaylistsForOneUser,fetchAllFilesForOneUser, uploadAllMediaFilesTemporaryForOneSong } from "src/redux/actions/group.action";
import { useDispatch } from "react-redux";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

const BriefDetailsModalComponent = ({ handleClose, open }) => {

    const customAnchorRef =useRef(null)

    const [anchorEl,setAnchorEl] = useState(null);
  const dispatch = useDispatch()
   

   const open2 = Boolean(anchorEl);

    const [open3,setOpen3] = useState(false)

    const { allPlaylists } = useSelector((state) => state.group);
    const { user } = useSelector((state) => state.auth);
    console.log("ALL PLAYLISTS ARE-->",allPlaylists)


    const [anchorElNewList, setAnchorElNewList] = useState(null);

    const handleClick = (event) => {
    //setAnchorElNewList(event.currentTarget);
    //setAnchorElNewList(customAnchorRef.current);
   //- may 22 commentted out menu from opening up 
   // setAnchorEl(customAnchorRef.current);
    //setOpen3(true)
    };




const openNewList = Boolean(anchorElNewList);


const handleCloseNewList = () => {
setAnchorElNewList(null);
//setAnchorEl(null);
};

   useEffect(()=>{
 
      dispatch(fetchAllPlaylistsForOneUser(user && user.id))
      
 
   },[])

    const handleClose2 = () => {
        setAnchorEl(null) 
        setOpen3(false) 
       console.log("OPEN NEW LIST IS NOW--->",open)
       console.log("HANDLE CLOSE IS NOW--->",handleClose)
       // setAnchorEl(null);
        };

        const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "tiff", "svg"];

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                PaperProps={{
                    sx: {
                      "&::-webkit-scrollbar": { display: "none" }, // For Chrome, Safari
                      msOverflowStyle: "none", // For Internet Explorer and Edge
                      scrollbarWidth: "none", // For Firefox
                    },
                  }}
            >
                <Box sx={{ m: 0, p: 2, mr: 6 }} id="customized-dialog-title">
                    <Typography sx={{ fontSize: "20px", fontFamily: "inter", fontWeight: "bold" }}>
                        Authentic 2018 R&B and Hip-Hop Releases
                    </Typography>

                    <Typography sx={{ fontFamily: "inter", fontSize: "12px" }}>
                        Deadline: November 7, 2024  8:00 PM PST | Expired: 0 day(s) ago
                    </Typography>
                </Box>
                
                <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
                >
                <CloseIcon />
                </IconButton>
                
                <Box p={2}>

                    <Box sx={{ background: "#49454F", display: "inline-block", borderRadius: "5px" }} p={1}>
                        <Typography sx={{ fontSize: "12px" }}>Create New Project</Typography>
                    </Box>

                    <p  ref={customAnchorRef} style={{position:"absolute",left:"27rem",top:"12rem",opacity:"0"}}>anchor</p>

                    <Box sx={{ display: "flex",alignItems:"center",justifyContent:"center" }} my={1}>

                        <Box flex={1.5} sx={{ /*background: "#CCCCCC", color: "#8D8A8A",*/cursor:"pointer",borderRadius:"8px",height:"2.2rem" }}   p={0.5}>
                           {/* <IoSearch style={{ marginBottom: "-4px", fontSize: "20px", marginRight: "4px", borderRadius: "5px" }} />*/}
                           {/* <input 
                               //ref={customAnchorRef}
                               onClick={(e)=>{handleClick(e)}}
                               readOnly={true}
                                placeholder="Select Playlist" 
                                style={{ background: "transparent", border: "none", outline: "none", fontFamily: "inter",cursor:"pointer" }} 
                                type="text"
                               
                            />*/}
                         {/* <Menu
                           id="basic-menu"
                           anchorEl={anchorElNewList}
                           open={openNewList}
                           onClose={handleCloseNewList}
                           MenuListProps={{
                           'aria-labelledby': 'basic-button',
                           }}
                           sx={{ borderRadius: "6px",
                           transform: 'translateX(-100px) translateY(180px)',
                           display:"flex",
                           justifyContent:"center",
                           alignItems:"center",
                           position:"relative",
                           top:"14rem",
                           
                           height:"720px"
                           }}
                           PaperProps={{
                           sx: {
                           borderRadius: "6px",
                           transform: ' translateY(120px)',
                           
                           display: "flex",
                           justifyContent: "center",
                           alignItems: "center",
                           background: "#252328", 
                           height: "700px",
                           width: "1220px", 
                           }
                           }}
                           >
                           
                           <Element name="scrollContainer" style={{overflowY:'auto',maxHeight:"350px",scrollbarWidth:'none',msOverflowStyle: 'auto',minWidth:"70rem"}}> 
                           <Box py={0.5} px={0}>
                           
                           {allPlaylists && allPlaylists.length > 0 && allPlaylists.map((item, index) => (
                           <MenuItem  onClick={()=>{handleCloseNewList()}} sx={{borderBottom:"0.2px solid #606060", width:"100%",paddingY:"20px",paddingX:"10px"}}>
                           <Typography >
                            {item.playlistName}
                           </Typography>
                           
                           </MenuItem>
                           ))
                           }
                           
                           </Box>
                           </Element>
                           </Menu> */}


                        
                        <Autocomplete
                           freeSolo
                           value={''}
                           onChange={(e, newValue) => {}}
                           options={
                             allPlaylists?.map((item) =>
                               item.playlistName && item.playlistName
                             ) || []
                           }
                           renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select or type playlist"
                              variant="outlined"
                              size="small"
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <IoSearch
                                      style={{
                                        marginBottom: "-4px",
                                        fontSize: "20px",
                                        marginRight: "4px",
                                        borderRadius: "5px",
                                        color: "#606060",
                                       
                                      }}
                                    />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                fontSize: "12px",
                                
                                color: "black",
                                width:"100%",
                                height:"100%",
                                backgroundColor: "#CCCCCC",
                                
                               
                                "& .MuiInputBase-input": {
                                  fontSize: "12px",
                                  padding: "10px",
                                  color: "black", // black input text
                                },
                              }}
                            />
                          )}
                           sx={{
                             backgroundColor: "white",
                             fontSize: "12px",
                             "& .MuiAutocomplete-popupIndicator": {
                               color: "#606060",
                               color:"black"
                             },
                           }}
                           ListboxProps={{
                             style: {
                               maxHeight: 250,
                               backgroundColor: "#CCCCCC",
                               color: "black",
                               fontSize: "12px",
                               border: "1px solid #606060",
                             },
                           }}
                         />
                       
                           



                      
                        </Box>

                        <Box flex={0.5} ml={1} sx={{ background: "#A01565", borderRadius: "5px", alignItems: "center", cursor: "pointer",height:"2.2rem",position:"relative",top:"0.25rem" }}>
                            <Typography
                                sx={{ fontFamily: "inter", fontSize: "12px", textAlign: "center", marginTop: '7px' }}
                            >Submit to this Brief</Typography>
                        </Box>
                        
                    </Box>

                    <Box mt={2.5}>
                        <Typography
                            sx={{ fontSize: "20", fontWeight: "bold", fontFamily: "inter", borderBottom: "1px solid grey" }}
                            pb={1}
                        >Creative Details</Typography>
                        
                        <Box my={1}>
                            <Typography 
                                sx={{ fontFamily: "inter", fontSize: "12px", textAlign: "justify" }} 
                                mt={1}
                            >
                                This is a quick turnaround so please only submit authentic 2018 releases if you have them. 
                                Make sure to enter recording details with release date and ISRC number for verification.
                            </Typography>
                            <Typography
                                sx={{ fontFamily: "inter", fontSize: "12px", textAlign: "justify" }} 
                                mt={1}
                            >
                                The show is set in 2018 Los Angeles so music released around that time and before is the ask.
                            </Typography>
                            <Typography
                                sx={{ fontFamily: "inter", fontSize: "12px", textAlign: "justify" }} 
                                mt={1}
                            >
                                RIYL: Lil Uzi Vert, Tyler The Creator, Drake, SZA, Daniel Caesar, Frank Ocean, Trippie Redd, 
                                Snoh Aalegra, Anderson .Paak etc.) but we're also looking for cool, 
                                electronic type stuff (i.e. BADBADNOTGOOD, Daft Punk, MGMT, Little Dragon, Khruangbin, SBTRKT etc.). 
                            </Typography>
                            <Typography
                                sx={{ fontFamily: "inter", fontSize: "12px", textAlign: "justify" }} 
                                mt={1}
                            >
                                Fee range: $5-10K/all-in
                            </Typography>
                            <Typography
                                sx={{ fontFamily: "inter", fontSize: "12px", textAlign: "justify" }} 
                                mt={1}
                            >
                                Right now they're also looking for specific alts for these songs below 
                                so anything with the same vibe that fits the year would be great to hear as well if you have it! 
                            </Typography>
                        </Box>

                        <Box 
                            sx={{ borderBottom: "1px solid grey", borderTop: "1px solid grey" }}
                            py={1.5} mb={1.5}
                        >
                            <Typography
                                sx={{ fontSize: "20", fontWeight: "bold", fontFamily: "inter" }}
                            >Other Details</Typography>

                            <Typography sx={{ fontSize: "12px", fontFamily: "inter" }}>NA</Typography>
                        </Box>

                        <Box>
                            <Typography>Reference Tracks:</Typography>
                            
                            <ul style={{ marginLeft: "18px", marginTop: "7px" }}>
                                <li style={{ fontFamily: "inter", fontSize: "12px", margin: "2px auto" }}>Grinding All My Life - Nipsey Hussle -- Motivational hip hop, cool, rhythmic </li>
                                <li style={{ fontFamily: "inter", fontSize: "12px", margin: "2px auto" }}>I Wish I Hated You - Ariana Grande -- Pop/R&B, female vocal, pain in a relationship, love, betrayal</li>
                                <li style={{ fontFamily: "inter", fontSize: "12px", margin: "2px auto" }}>XO Tour Lif3 - Lil Uzi Vert -- Hip Hop, moody, confident, cool </li>
                                <li style={{ fontFamily: "inter", fontSize: "12px", margin: "2px auto" }}>Plain Jane - A$AP Ferg -- Hip-Hop, male vocal, motivational, cool, rhythmic</li>
                                <li style={{ fontFamily: "inter", fontSize: "12px", margin: "2px auto" }}>Moonlight - XXXTentacion -- hip-hop, cool, confident </li>
                                <li style={{ fontFamily: "inter", fontSize: "12px", margin: "2px auto" }}>Make Me Feel - Janelle Monae -- fun, builds and changes, has some movement</li>
                            </ul>
                        </Box>
                    </Box>

                </Box>

            </BootstrapDialog>
        </>
    )
}

export default BriefDetailsModalComponent
