import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveCurrentSong,saveCurrentCoverArt } from "src/redux/reducers/group.slice";
import { fetchAllSongs,fetchAllPlaylists ,uploadMediaFileTemporary, fetchAllSongsForOneUser, fetchAllCollaborators,fetchAllFilesForOneUser, uploadAllMediaFilesTemporaryForOneSong } from "src/redux/actions/group.action";

import {  Button, Dialog, DialogTitle, DialogContent, DialogActions, Menu,MenuItem,Popper,ClickAwayListener,Paper,Popover } from "@mui/material";
import { useEffect,useState } from "react";
import { Element } from "react-scroll";


const SmartContractComponent = () => {

    const dispatch= useDispatch()
    const { currentSong} = useSelector((state) => state.group);

    useEffect(()=>{
        dispatch(fetchAllCollaborators())
        },[])

        const handleClose2 = () => {
            setAnchorEl(null) 
            setOpen3(false) 
           
          
           // setAnchorEl(null);
            };


        const { allCollaborators } = useSelector((state) => state.group);
const { user } = useSelector((state) => state.auth);
console.log("ALL COLLABORATORS ARE-->",allCollaborators)

const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // setAnchorEl(customAnchorRef.current);
    setOpen3(true)
    };



const [anchorEl,setAnchorEl] = useState(null);

const [open3,setOpen3] = useState(false)

    const formData = [
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.writersSplitContract?currentSong.metadata.writersSplitContract : " ",  label: "Writer's Split Contract", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.writersSplitContract?currentSong.metadata.writersSplitContract : "Select", type: "text" },
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.producerContract?currentSong.metadata.producerContract : " ",  label: "Producer Contract", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.producerContract?currentSong.metadata.producerContract : "Select", type: "text" },
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.workForHire?currentSong.metadata.workForHire : "Select",  label: "Work for Hire", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.workForHire?currentSong.metadata.workForHire : "Select", type: "text" },
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.featArtistContact?currentSong.metadata.featArtistContact : " ",  label: "Feat. Artist Contact", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.featArtistContact?currentSong.metadata.featArtistContact : "Select", type: "text" },
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.smartContractOther?currentSong.metadata.smartContractOther : " ",  label: "Other", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.smartContractOther?currentSong.metadata.smartContractOther : "Select", type: "text" },
        { value:currentSong && currentSong.metadata &&  currentSong.metadata.sampleClearance?currentSong.metadata.sampleClearance : " ",  label: "Sample Clearance", placeholder:currentSong && currentSong.metadata &&  currentSong.metadata.sampleClearance?currentSong.metadata.sampleClearance : "Select", type: "text" }
    ];

    return (
        <Box style={{width:"50rem"}}>


            <Popover
            open={open3}
            anchorEl={anchorEl}
            onClose={handleClose2}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
            PaperProps={{
            sx: { borderRadius: 2, p: 1, minWidth: 200, backgroundColor:"#49454", },
            }}
            >
            <Paper elevation={0} sx={{ backgroundColor:"#49454 !important",py:"0.8rem"}}>
            <Element name="scrollContainer" style={{ overflowY: 'auto', maxHeight: '250px', scrollbarWidth: 'none', 
            msOverflowStyle: 'auto' }}>
            {allCollaborators && allCollaborators.length > 0 ? (
            allCollaborators.map((item, i) => (
            <Box
            key={i}
            onClick={() => handleClose2()}
            sx={{
            px: 1,
            py: 0.5,
            backgroundColor:"#49454",
            borderBottom:"0.5px solid #606060",
            "&:hover": { backgroundColor: "#606060" },
            cursor: "pointer",
            }}
            >
            <Typography sx={{ fontSize: 14, fontFamily: "inter", fontWeight: 500 }}>
            {item.playlistName}
            </Typography>
            </Box>
            ))
            ) : (
            <Typography sx={{ px: 1, py: 0.5 }}>No Collaborators</Typography>
            )}
            </Element>
            </Paper>
            </Popover>

            {
                formData.map( (item, key) => (
                    <Box my={1} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography
                     
                         flex={1} mr={1} sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "bold" }}>
                            { item.label }:
                        </Typography>
                        <input 
                         
                           value={item.value}
                            placeholder={ item.placeholder }
                            style={{ 
                                padding: "2px 6px", fontSize: "13px", fontFamily: "inter", outline: "none", color:"black",
                                width: "64%" 
                            }}
                            flex={2}
                            type={ item.type }

                            onChange={(e)=>{
                           
                                let newSongDetails = {...currentSong}
                                let metadata2 =currentSong.metadata?{...currentSong.metadata}:{}
   
                              item.label === "Writer's Split Contract"?  metadata2["writersSplitContract"] = e.target.value
                              :
                              item.label === "Producer Contract"?  metadata2["producerContract"] = e.target.value
                              :
                              item.label === "Work for Hire"?  metadata2["workForHire"] = e.target.value
                              :
                              item.label === "Feat. Artist Contact"?  metadata2["featArtistContact"] = e.target.value
                              :
                              item.label === "Other"?  metadata2["smartContractOther"] = e.target.value
                              :
                              metadata2["sampleClearance"] = e.target.value
   
                               dispatch(saveCurrentSong(
                                   {...newSongDetails,
                                    metadata:metadata2
                                     
                                 }))
   
                             }}
                        />
                    </Box>
                ) )
            }

        </Box>
    )
}

export default SmartContractComponent;
