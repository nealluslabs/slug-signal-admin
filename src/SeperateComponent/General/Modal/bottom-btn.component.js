import { Box, Typography } from "@mui/material";

// Icon
import { AutoAwesome } from "@mui/icons-material";

import StarImage from "../../../assets/images/image-8.png";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentSong,updateCurrentSongWithoutChecks } from "src/redux/actions/group.action";
import { useState } from "react";
import { notifyErrorFxn, notifySuccessFxn } from "src/utils/toast-fxn";

const ModelBottomBtnComponent = ({handleClose}) => {
 
    const [loadingSubmit,setLoadingSubmit] = useState(false)
    const [loadingSubmit2,setLoadingSubmit2] = useState(false)

    const dispatch = useDispatch()
    const {currentSong,currentCoverArt,newlyUploadedFiles,newlyUploadedPlaylist} = useSelector((state)=> state.group);
    const {user} = useSelector((state)=> state.auth);
   
    console.log("IMAGINE WE ARE PASSING A CURRENT EMPTY COVER ART-->",currentCoverArt)
    console.log("CURRENT SONG WHAT DOES THAT LOOK LIKE --->",currentSong)
    console.log("BEFORE UPDATING CURRENT SONG, NEWLY UPLOADED PLAYLIST IS --->",newlyUploadedPlaylist)

    return (
        <Box sx={{ background: "#252328", justifySelf: "flex-end", borderTop: "1px solid grey" }}>
            <Box p={0.5} py={1} pb={2} sx={{ display: "flex", justifySelf: "flex-end" }}>

                <Box component="img" src={ StarImage } sx={{ marginRight: 1, cursor: "pointer" }} />
            
            
                <Box px={1} py={0.5} mr={1} sx={{ background: "white", borderRadius: "4px", cursor: "pointer", textAlign: "center" }}
                
                onClick={()=>{
                    if(currentSong.name && currentSong.name.length > 25){
                       notifyErrorFxn("The Song's name must be less than 25 characters, please shorten!")
                       return
                    }else{
                      
                  dispatch(updateCurrentSongWithoutChecks(setLoadingSubmit2,currentSong,newlyUploadedFiles,newlyUploadedPlaylist,currentCoverArt,currentSong,newlyUploadedFiles,handleClose,user&& user.id))
                    }
                   }}
                >
                    <Typography sx={{ color: "grey", fontFamily: "inter", fontSize: "12px" }}>{loadingSubmit2?"Loading...":"Save"}</Typography>
                </Box>
              

                <Box px={1} py={0.5} mr={1} sx={{ background: "white", borderRadius: "4px", cursor: "pointer", textAlign: "center" }}>
                    <Typography sx={{ color: "grey", fontFamily: "inter", fontSize: "12px" }}>Copy Info</Typography>
                </Box>

                <Box px={1} py={0.5} mr={3} onClick={()=>{
                         if(currentSong.name && currentSong.name.length > 25){
                            notifyErrorFxn("The Song's name must be less than 25 characters, please shorten!")
                            return
                         }else{
                            //notifySuccessFxn("Changes saved!")
                       dispatch(updateCurrentSong(setLoadingSubmit,currentSong,newlyUploadedFiles,newlyUploadedPlaylist,currentCoverArt,currentSong,newlyUploadedFiles,handleClose,user&& user.id))
                         }
                        }}
                     sx={{ background: "#A01565", borderRadius: "4px", cursor: "pointer", textAlign: "center" }}>
                    <Typography sx={{ color: "white", fontFamily: "inter", fontSize: "12px" }}>{loadingSubmit?"Loading...":"Validate"}</Typography>

                   
                </Box>

            </Box>
        </Box>
    )
}

export default ModelBottomBtnComponent
