import React, { useEffect, useState } from 'react';

import { Box, Typography, Menu, MenuItem, TextField } from "@mui/material";

// Icon
import { MoreVert } from "@mui/icons-material";
import PlayableMusicComponent from './playable-music.component';
import NewMusicComponent from './new-music.component';
import { useDispatch, useSelector } from 'react-redux';
import { saveSongsAndPlaylist } from 'src/redux/actions/group.action';

import { saveCurrentlyEditingPlaylistName, saveNewPlaylistBeingCreated, savePlaylistCreatorActivePlaylist, savePlaylistName } from 'src/redux/reducers/group.slice';
import { notifyErrorFxn } from 'src/utils/toast-fxn';

const UptempoComponent = ({ edit,playlistBeingMappedName=" ",playlist }) => {
    const dispatch =useDispatch()
    const {user} = useSelector((state) => state.auth);
    const { newlyUploadedFiles ,newlyUploadedPlaylist,playlistName,newPlaylistBeingCreated,playlistCreatorActivePlaylist} = useSelector((state) => state.group);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      
        setAnchorEl(null);
    };


    const handleClear = () => {
        dispatch(saveNewPlaylistBeingCreated(newPlaylistBeingCreated.filter((item)=>(item.playlistId !==  playlist &&  playlist.playlistId))))
        
    };


   
  //  const menuOptions = [
  //      { title: "Edit Playlist", link: "" },
  //      { title: "Playlist Settings", link: "" },
  //      { title: "Stats", link: "" },
  //      { title: "Rename", link: "" },
  //      { title: "Create Album", link: "" },
  //      {title:"Clear",link:" "}
  //  ]


    const menuOptions = [
        /* { title: "Cancel Update", link: "" },*/
         /*{ title: "Edit Playlist", link: "" },*/
         { title: "Playlist Settings", link: "" },
         { title: "Stats", link: "" },
         {title:"Manage Songs",link:" "},
         /*{ title: "Rename", link: "" },*/
         /*{ title: "Create Album", link: "" },*/
         {title:"Clear",link:""}
     ]

  

    const [files, setFiles] = useState(newlyUploadedFiles); // State to store selected files
    

    const [songsForThisPlaylist,setSongsForThisPlaylist] = useState(newlyUploadedPlaylist && newlyUploadedPlaylist.filter((item)=>(item && playlist &&  item.playlistId === playlist.playlistId)))


   useEffect(()=>{

    setSongsForThisPlaylist(
        newlyUploadedPlaylist && newlyUploadedPlaylist.filter((item)=>(
            playlist && item &&
            (
            item.playlistId === playlist.playlistId
             ||
            item.playlistIdsArray && item.playlistIdsArray.includes(playlist && playlist.playlistId)
            )
         ))

    )


    console.log("SONGS FOR THIS PLAYLIST ARE--->",songsForThisPlaylist)
   }
   ,[newlyUploadedPlaylist])

    const removeFile = (indexToRemove) => {
        setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
      };


      const handleExpandIndex = (indexToRemove) => {
        //logic for hiding other indexes when this one is clicked!
        //will do so shortly
      };
    

      useEffect(()=>{

        setFiles(newlyUploadedFiles)

      },[newlyUploadedFiles])




    return (
        <Box 
            p={1} my={0}
    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"/*,background:"inherit",borderBottom:"2px solid grey"*/ ,background: "#252328",position:"relative" }}
        >
           
                <TextField
                  variant="standard"
                  placeholder="Type here..."
                  value={playlistBeingMappedName?playlistBeingMappedName:playlistName? playlistName: "Untitled Playlist"}
                  onChange={(e)=>{
                    if(e.target.value && e.target.value.length>52){
                    notifyErrorFxn("Playlist Name should not be more than 52 characters")
                    }
                    else{
                    dispatch(saveNewPlaylistBeingCreated(
                        newPlaylistBeingCreated.map((item)=>(playlist &&
                            item.playlistId ===  playlist.playlistId?
                            {
                             ...item,
                             playlistName:e.target.value,
                            }
                            :
                            item
                        ))
                    ))
                    }
                }}
                  InputProps={{
                    disableUnderline: true, // Removes the underline
                    style: {
                      color: 'white', // Text color
                      background: 'transparent', // Transparent background
                      padding: 0, // No vertical padding
                      fontFamily: "inter",
                      fontSize: "12px",
                      position:"absolute",
                      width:"14.3rem",
                      top:"-0.8rem",
                     
                    },
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      //fontSize: '16px', // Adjust text size
                      fontFamily: "inter",
                      fontSize: "12px"
                    },
                  }}
                />

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography onClick={()=>{dispatch(saveSongsAndPlaylist(songsForThisPlaylist,playlist.playlistName,playlist,user.id,newPlaylistBeingCreated)) }} mr={1} sx={{ color: "#8D8A8A", fontSize: "12px", fontFamily: "inter", cursor: "pointer" }}>
                    Save                  
                </Typography>
                
                {
                    edit ? 
                    <>
                        <MoreVert 
                            sx={{ cursor: "pointer" }}
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={ handleClick }
                        />

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
                                    menuOptions.map( (item, i) => (
                                        <MenuItem sx={{fontSize: "12px", fontFamily: "inter", fontWeight: "500"}}
                                         onClick={()=>{
                                            if(item.title === "Cancel Update" || item.title === "Clear"){
                                           handleClear()
                                    
                                            }
                                            else if(item.title ==="Manage Songs"){
                                            if(playlistCreatorActivePlaylist && playlistCreatorActivePlaylist ===playlist && playlist.playlistId){
                                                  
                                                  dispatch(savePlaylistCreatorActivePlaylist(null))
                                                    setTimeout(()=>{ handleClose()},1000)
                                                    }
                                                    else{
                                                     
                                                      dispatch(savePlaylistCreatorActivePlaylist(playlist && playlist.playlistId))
                                                      setTimeout(()=>{ handleClose()},1000)
                                                    }
                                              
                                            
                                                }
                                                else{
                                  
                                            handleClose()
                                                }
                                            }
                                            }>
                                            { item.title }
                                        </MenuItem>
                                    ) )
                                }



                            </Box>
                        </Menu>
                    </>
                : 
                <MoreVert />
                }
            </Box>
        </Box>
    )
}

export default UptempoComponent;
