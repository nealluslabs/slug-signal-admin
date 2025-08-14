import React, { useEffect, useState } from 'react';

import { Box, Typography, Menu, MenuItem, TextField } from "@mui/material";

// Icon
import { MoreVert } from "@mui/icons-material";
import PlayableMusicComponent from './playable-music.component';
import NewMusicComponent from './new-music.component';
import { useDispatch, useSelector } from 'react-redux';
import { saveSongsAndPlaylist } from 'src/redux/actions/group.action';

import { saveCurrentCoverArt, saveCurrentSong, saveCurrentlyEditingPlaylistName, saveListOfNewSongsBeingCreated, saveNewPlaylistBeingCreated, savePlaylistCreatorActivePlaylist, savePlaylistName, saveSongCreatorActiveHeaderId, saveSongCreatorActiveSong } from 'src/redux/reducers/group.slice';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import { DialogModalComponent } from '../General';

const PlaylistHeaderComponent = ({ edit,playlistBeingMappedName=" ",playlist }) => {
    const dispatch =useDispatch()
    const {user} = useSelector((state) => state.auth);
    const {
       newlyUploadedFiles ,
      newlyUploadedPlaylist,
      playlistName,
      newPlaylistBeingCreated,
      playlistCreatorActivePlaylist,
      songCreatorActiveSong,
      songCreatorActiveHeaderId,
      listOfNewSongsBeingCreated
    } = useSelector((state) => state.group);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      dispatch(saveSongCreatorActiveHeaderId(null))
        setAnchorEl(null);
    };

    const handleExpand = () => {
      dispatch(saveSongCreatorActiveHeaderId(playlist.identifyingId))
        setAnchorEl(null);
    };



    const handleClear = () => {
      console.log("SONG HEADER SONG IS-->",playlist)
        dispatch(saveListOfNewSongsBeingCreated(listOfNewSongsBeingCreated.filter((item)=>(item.identifyingId !== playlist.identifyingId))))
        
    };

    const [openModal, setOpenModal] = useState(false);
     

    const handleClickOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
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
         /*{ title: "Playlist Settings", link: "" },*/
        /* { title: "Stats", link: "" },*/
        /* {title:"Manage Files",link:" "},*/
         /*{ title: "Rename", link: "" },*/
         /*{ title: "Create Album", link: "" },*/
        /* {title:"Remove Song",link:""},
         {title:"Expand Song",link:""},
         {title:"Close",link:""},*/
         {title:"Edit Song",link:" "},
         /*{title:"Manage Song",link:" "},*/
        
         {title:"Copy Track Info",link:""},
         {title:"Add To Playlist",link:""},
         {title:"Add To Album",link:""},
         
         {title:"Clear",link:""},
     ]



  

    const [files, setFiles] = useState(newlyUploadedFiles); // State to store selected files
    

    const [songsForThisPlaylist,setSongsForThisPlaylist] = useState(newlyUploadedPlaylist && newlyUploadedPlaylist.filter((item)=>(item.playlistId === playlist.playlistId)))


   useEffect(()=>{

    setSongsForThisPlaylist(
        newlyUploadedPlaylist && newlyUploadedPlaylist.filter((item)=>(
            item.playlistId === playlist.playlistId
             ||
            item.playlistIdsArray && item.playlistIdsArray.includes(playlist.playlistId)
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
    sx={{ display:"flex", justifyContent: "space-between", alignItems: "center", /*background: "#252328"*/ background:"#302c34",borderBottom:"0.5px solid #606060",height:"4.2rem" }}
       
      
      >
            <DialogModalComponent open={ openModal } handleClose={ handleCloseModal }  />
                <TextField
                  variant="standard"
                  placeholder="Type here..."
                  value={playlistBeingMappedName?playlistBeingMappedName:playlistName? playlistName: "Untitled Playlist"}
                  onClick={()=>{
                    dispatch(saveCurrentSong(playlist.song))
                    dispatch(saveCurrentCoverArt(playlist.song.coverArtUrl && playlist.song.coverArtUrl)) 
                     setTimeout(()=>{
                      handleClickOpenModal()
                   },300)
                  }
                  }

                  onChange={(e)=>{
                    if(e.target.value && e.target.value.length>26){
                    notifyErrorFxn("Playlist Name should not be more than 26 characters")
                    }
                    else{
                    dispatch(saveNewPlaylistBeingCreated(
                        newPlaylistBeingCreated.map((item)=>(
                            item.playlistId === playlist.playlistId?
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
                      paddingLeft:"3.7rem",
                      height:"4.4rem",
                      width:"22rem"
                    },
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      fontSize: '12px', // Adjust text size
                      fontFamily: "inter",
                      cursor:"pointer"
                    },
                  }}
                />

            <Box sx={{ display: "flex", alignItems: "center",justifyContent:"flex-start",gap:"0px",width:"max-content",paddingRight:"1rem"}}>
               { <Typography 
               
                 mr={0} sx={{ color: "#8D8A8A", fontSize: 10, fontFamily: "inter", cursor: "pointer" }}>
                    Draft                 
                </Typography>
                  }
              

                {
                    edit ? 
                    <>
                        <MoreVert 
                            sx={{ cursor: "pointer" ,position:"relative", left:"6px"}}
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
                                    
                                            }else if(item.title === "Edit Song"){
                                              dispatch(saveCurrentSong(playlist.song))
                                                    dispatch(saveCurrentCoverArt(playlist.song.coverArtUrl && playlist.song.coverArtUrl)) 
                                                     setTimeout(()=>{
                                                      handleClickOpenModal()
                                                   },1000)
                                            }
                                            else if(item.title ==="Manage Song"){
                                                  //  if(songCreatorActiveSong && songCreatorActiveSong.songId === playlist.songId){
                                                  //    dispatch(saveSongCreatorActiveSong({}))
                                                  //      }
                                                  //      else{
                                                  //        dispatch(saveSongCreatorActiveSong(playlist))
                                                  //      }


                                                  if(songCreatorActiveHeaderId ===playlist.identifyingId){
                                                    handleClose()
                                                  }
                                                  else{
                                                    handleExpand()
                                                  }
                                                  }
                                                else if(item.title === "Close"){
                                  
                                            handleClose()
                                                }
                                                else if(item.title === "Expand Song"){
                                  
                                                  handleExpand()
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

export default PlaylistHeaderComponent;
