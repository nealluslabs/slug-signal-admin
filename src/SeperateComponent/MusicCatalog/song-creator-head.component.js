import React, { useEffect, useState } from 'react';

import { Box, Typography, Menu, MenuItem } from "@mui/material";

// Icon
import { MoreVert, ArrowDropDown, AutoAwesome, ChevronRight } from "@mui/icons-material";

// Image
import Image from "../../assets/images/cryPrincess.jpeg";
import Sound from "../../assets/images/audiowaves.jpeg"
import placeholderPic  from  "../../assets/images/av.png"

// Component 
import { DialogModalComponent } from '../General';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveCurrentCoverArt, saveCurrentSong, saveSongCreatorActive } from 'src/redux/reducers/group.slice';
import { updateCurrentSong } from 'src/redux/actions/group.action';

const SongCreatorHeadComponent = ({ type,pos}) => {

    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const open = Boolean(anchorEl);

    const {currentSong,fileUploaderActive,songEditorActive,currentCoverArt,newlyUploadedFiles,newlyUploadedPlaylist} = useSelector((state)=> state.group)

    const {user} = useSelector((state)=> state.auth)


    console.log("SONG CREATOR HEAD COMPONENT, CURRENT SONG IS -->",currentSong)


    const handleClick = (event) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openModal, setOpenModal] = React.useState(false);

    const handleClickOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const [imageSrc, setImageSrc] = useState(null);

    const handleFileChange = () => {
      const file = currentCoverArt && currentCoverArt.file // Get the selected file
      if (file) {
        const reader = new FileReader();
  
        // When the file is read, set the image source
        reader.onload = (e) => {
            console.log("OUR E TARGET IS -->",e.target)
          setImageSrc(e.target.result); // Update the state with the file's data URL
        };
  
       //reader.readAsDataURL(currentCoverArt && currentCoverArt.file); // Read the file as a data URL
      }
    };

    useEffect(()=>{
        handleFileChange()
    },[currentCoverArt])

    const menuOptions = [
        { title: "Edit Song", link: "", extra: false },
        { title: "Add to Playlist", link: "", extra: false },
        { title: "Add to Album", link: "", extra: false },
        { title: "Manage Files", link: "", extra: false },
        { title: "Copy Track Info", link: "", extra: true },
        { title: "Clear", link: "", extra: false }
    ]


    const menuOptions2 = [
        { title: "Edit Song", link: "", extra: false },
        { title: "Clear", link: "", extra: false }
    ]



    return (
        <Box 
            p={1.1} my={0.8}
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#252328",marginTop:"-4px" }}
        >

            <Box sx={{ display: "flex" }}>
                <Box 
                    component="img" 
                    src={currentSong && currentSong.coverArtUrl?currentSong.coverArtUrl :pos=== "top"?placeholderPic :Sound}
                    //SORT THIS COVER ART URL LATER
                   //src={ currentSong.coverArtUrl ?pos=== "top"?placeholderPic :Sound/*currentSong.coverArtUrl*/:currentCoverArt ? imageSrc: type === "img" ? placeholderPic/*Image*/ : Sound } 
                    sx={{ width: 58, height: 58, marginRight: "6px",display:"none"/*THIS STYLE IS RESPONSIBLE FOR THE IMAGE */ }} 
                />

                <Box mt={1}>
                    <Typography sx={{ fontSize: 15, fontWeight: "400", fontFamily: "inter",minWidth:"12rem",maxWidth:"100%",position:"relative",top:"-5px"}}>
                        {fileUploaderActive ?
                        (currentSong && currentSong.name? currentSong.name.length > 11 ?currentSong.name.substring(0,11)+'..':currentSong.name  : "Untitled Song")
                        :
                         ("Edit Songs here").length > 11 ?("Edit Songs"):("Edit Songs here") 
                      }
                        </Typography>
                    <Box sx={{ display: "flex", cursor: "pointer",display:"none"/*THIS IS RESPONSIBLE FOR SELECT ARTIST AND THE DROPDOWN */ }}>
                        <Typography sx={{ fontSize: 12, fontFamily: "inter" }}>Select Artist</Typography>
                        <ArrowDropDown sx={{ marginTop: "-2px" }} />
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                   onClick={()=>{
                    if(currentSong && currentSong.name){
                    dispatch(updateCurrentSong(setLoadingSubmit,currentSong,newlyUploadedFiles,newlyUploadedPlaylist,currentCoverArt,currentSong,newlyUploadedFiles,handleCloseModal,user&& user.id))
                    }
                }}


                mr={0} sx={{ color:"white" /*"#8D8A8A"*/, fontSize: 13, fontFamily: "inter", cursor: "pointer",minWidth:"4rem",maxWidth:"4rem" }}>
                   { loadingSubmit?"Loading.":`Save`}
                </Typography>
                <Typography ml={0} mr={1} sx={{ color: "#8D8A8A", fontSize: 13, fontFamily: "inter", cursor: "pointer" }}>
                    Draft
                </Typography>
                
                <Box mr={0}
                    sx={{ 
                        cursor: "pointer", display: "flex",
                        background: 'linear-gradient(90deg, #ff6a00, #ee0979)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                   // onClick={ handleClickOpenModal }
                >
                    <Typography
                  
                     
                        sx={{ 
                            fontSize: 13, 
                            fontFamily: "inter", 
                            background: 'linear-gradient(90deg, #7A13AE, #5F6FF5)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold',
                        }}
                    >
                        Analyze
                    </Typography>
                    <AutoAwesome 
                        sx={{
                            width: 18,
                            height: 18,
                            color: 'linear-gradient(90deg, #7A13AE, #5F6FF5)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 'bold',
                        }}
                    />

                </Box>

                <DialogModalComponent open={ openModal } handleClose={ handleCloseModal }  />

                <MoreVert 
                    sx={{ cursor: "pointer" }}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={ handleClick }
                />

{ fileUploaderActive && 
               
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                    sx={{ borderRadius: "6px" }}
                >
                    <Box py={0.5} px={1}>
                       
                            { 
                             menuOptions2.map( (item, i) => (
                                <MenuItem onClick={handleClose}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between",width:"100%" }}
                                    
                                    onClick={ item.title === "Edit Song" ? handleClickOpenModal
                                    :
                                    item.title === "Clear"?
                                    ()=>{

                                    if(!currentSong.name){
                                       dispatch(saveSongCreatorActive(false))
                                       dispatch(saveCurrentSong({}))
                                       dispatch(saveCurrentCoverArt({}))
                                    }
                                    else{      
                                    dispatch(saveSongCreatorActive(false))
                                    dispatch(saveCurrentSong({}))
                                    dispatch(saveCurrentCoverArt({}))
                                    }
                                    }
                                    :
                                   console.log("nothing- menu item in song creator")
                                    } 
                                    
                                    
                                    >
                                        <Typography  sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "500" }}
                                        >{ item.title }</Typography>
                                        { 
                                            item.extra && 
                                            <ChevronRight 
                                                sx={{ color: "#8D8A8A", width: 18, marginLeft: "7px" }} 
                                            /> 
                                        }
                                    </Box>
                                </MenuItem>
                            ) )

                          /* :
                            menuOptions.map( (item, i) => (
                                <MenuItem onClick={handleClose}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between",width:"100%" }}
                                    
                                    onClick={ item.title === "Edit Song" ? handleClickOpenModal
                                    :
                                    item.title === "Clear"?
                                    ()=>{

                                    if(!currentSong.name){
                                       dispatch(saveSongCreatorActive(false))
                                       dispatch(saveCurrentSong({}))
                                       dispatch(saveCurrentCoverArt({}))
                                    }
                                    else{      
                                    dispatch(saveSongCreatorActive(false))
                                    dispatch(saveCurrentSong({}))
                                    dispatch(saveCurrentCoverArt({}))
                                    }
                                    }
                                    :
                                   console.log("nothing- menu item in song creator")
                                    } 
                                    
                                    
                                    >
                                        <Typography  sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "500" }}
                                        >{ item.title }</Typography>
                                        { 
                                            item.extra && 
                                            <ChevronRight 
                                                sx={{ color: "#8D8A8A", width: 18, marginLeft: "7px" }} 
                                            /> 
                                        }
                                    </Box>
                                </MenuItem>
                            ) )*/
                        }
                    </Box>
                </Menu>
}
            </Box>
        </Box>
    )
}

export default SongCreatorHeadComponent;
