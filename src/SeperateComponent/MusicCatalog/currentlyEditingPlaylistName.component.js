import React, { useEffect, useState } from 'react';

import { Box, Typography, Menu, MenuItem, TextField } from "@mui/material";

// Icon
import { MoreVert } from "@mui/icons-material";
import PlayableMusicComponent from './playable-music.component';
import NewMusicComponent from './new-music.component';
import { useDispatch, useSelector } from 'react-redux';
import { saveSongsAndPlaylist, updateSongsAndPlaylist } from 'src/redux/actions/group.action';

import { saveAllSongsFromCurrentPlaylistToEdit,
     saveCurrentlyEditingPlaylistId,
      saveCurrentlyEditingPlaylistName,
       saveNewPlaylistBeingCreated,
       
       savePlaylistCreatorActivePlaylist,
       
        savePlaylistName, 
        savePlaylistCreatorPlaylists}
         from 'src/redux/reducers/group.slice';
import SongInPlaylistComponent from './song-in-playlist.component';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Element } from 'react-scroll';

const CurrentlyEditingPlaylistNameComponent = ({ edit,playlistBeingMappedName,playlist }) => {
    const dispatch =useDispatch()

    const {user} = useSelector((state) => state.auth);
    const { newlyUploadedFiles ,allSongsFromCurrentPlaylistToEdit,
        allSongsFromAllPlaylistsToEdit,
        currentlyEditingPlaylistName,
        currentlyEditingPlaylistId,
        playlistCreatorPlaylists,
       playlistCreatorActivePlaylist,
       
     } = useSelector((state) => state.group);


     const onDragEnd = (result) => {
        const { source, destination } = result;
        
        if (!destination) return;
        
        if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
        ) {
        return;
        }
        
  if( source.droppableId &&  source.droppableId.includes("AlreadySavedPlaylist") && destination.droppableId === "AlreadySavedPlaylist"){ 
     console.log("INDEXES ARE SEPARATE,LOOK HERE -->")
        const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        //dispatch(saveNewlyUploadedPlaylist(result))
        return result;
        };


        const reorderedFiles = reorder(songsForThisPlaylist,result.source.index, result.destination.index);
       setSongsForThisPlaylist(reorderedFiles)

    }
        
        }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCancelUpdate = () =>{
       // dispatch(saveAllSongsFromCurrentPlaylistToEdit([])) 
       // dispatch(saveCurrentlyEditingPlaylistName(null))
       // dispatch(saveNewPlaylistBeingCreated(false))
   dispatch(savePlaylistCreatorPlaylists(playlistCreatorPlaylists.filter((item)=>(item.playlistId !== playlist.playlistId))))

    }


    const [songsForThisPlaylist,setSongsForThisPlaylist] = useState(allSongsFromAllPlaylistsToEdit && allSongsFromAllPlaylistsToEdit.filter((item)=>(item.playlistId === playlist.playlistId ||  item.playlistIdsArray && item.playlistIdsArray.includes(playlist.playlistId) )))


   useEffect(()=>{

    setSongsForThisPlaylist(
        allSongsFromAllPlaylistsToEdit && allSongsFromAllPlaylistsToEdit.filter((item)=>(
            item.playlistId === playlist.playlistId
             ||
            item.playlistIdsArray && item.playlistIdsArray.includes(playlist.playlistId)
         ))

    )

    console.log("ALL SONGS FROM All PLAYLIST TO EDIT--->",allSongsFromAllPlaylistsToEdit)
    console.log("IN THE ALREADY ESTABLISHED SONGS, SONGS FOR THIS PLAYLIST ARE--->",songsForThisPlaylist)
   }
   ,[allSongsFromAllPlaylistsToEdit])

   
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
    <> 
        <Box 
            p={1} my={0}
    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", background:'inherit',/*,borderBottom:'2px solid grey'*/ background:"#252328" }}
        >
           
                <TextField
                  variant="standard"
                  placeholder="Type here..."
                  value={playlistBeingMappedName?playlistBeingMappedName: "-"}
                  onChange={(e)=>{dispatch(saveCurrentlyEditingPlaylistName(e.target.value))}}
                  InputProps={{
                    disableUnderline: true, // Removes the underline
                    style: {
                      color: 'white', // Text color
                      background: 'transparent', // Transparent background
                      padding: 0, // No vertical padding
                      fontFamily: "inter",
                      fontSize: "12px"
                    },
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      fontSize: '12px', // Adjust text size
                      fontFamily: "inter",
                    },
                  }}
                />

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography onClick={()=>{dispatch(updateSongsAndPlaylist(songsForThisPlaylist,playlist.playlistName,user.id,playlist.playlistId,playlistCreatorPlaylists))}} mr={1} sx={{ color: "#8D8A8A",fontSize: "12px", fontFamily: "inter", cursor: "pointer" }}>
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
                                           handleCancelUpdate()
                                    
                                            }
                                            else if(item.title ==="Manage Songs"){
                                            if(playlistCreatorActivePlaylist && playlistCreatorActivePlaylist === playlist.playlistId){
                                                  
                                                  dispatch(savePlaylistCreatorActivePlaylist(null))
                                                    setTimeout(()=>{ handleClose()},1000)
                                                    }
                                                    else{
                                                     
                                                      dispatch(savePlaylistCreatorActivePlaylist(playlist.playlistId))
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
    

        <div style={{ marginTop: "5px",marginBottom:"5px"}}>

        <DragDropContext onDragEnd={onDragEnd}>
           
        <Droppable droppableId={"AlreadySavedPlaylist"}>
                 {(provided) => (
                   <div
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                     
                    
                   >                       
                            
           <ul>
             {playlist.playlistId === playlistCreatorActivePlaylist &&
                  <Element name="scrollContainer" style={{ overflowY: 'auto', maxHeight: '600px', scrollbarWidth: 'none', /* For Firefox */
                  msOverflowStyle: 'auto' /* For IE/Edge */ }}>
            { songsForThisPlaylist && songsForThisPlaylist.length > 0 && songsForThisPlaylist.filter((file)=>(file && file.metadata)).filter((song)=>(/*song.playlistId!==null && */song.playlistIdsArray && song.playlistIdsArray.includes(playlist.playlistId))).map((file, index) => (
            
                 <Draggable key={index} index={index} draggableId={`AlreadySavedPlaylistSong-${file &&file.songId}`}>
                 {(provided,snapshot) => {
                 
                 if (snapshot.isDragging) {
                  const offset = { x: 70, y: 150 }          // your fixed container left/top position
                  const x = provided.draggableProps.style.left - offset.x;
                  const y = provided.draggableProps.style.top - offset.y;
                  provided.draggableProps.style.left = x;
                  provided.draggableProps.style.top = y;
               }
                 
                 return(
                   <div
                   ref={provided.innerRef}
                   {...provided.draggableProps}
                   {...provided.dragHandleProps}
                     
                    
                   >
              
             <SongInPlaylistComponent show={true} file={file &&  file.file} fileFullDetails={file && file} name={file &&  file.name} uploadStatus={"Audiovybez"/*file && file.type*/} handleExpandIndex={handleExpandIndex} indexToBeExpanded={index} editingBlock={true} playlistId={playlist.playlistId}/>
             
               

               
             </div>
               )}
               }
                </Draggable>
             ))
            }
            </Element>
             
             }
           </ul>

           </div>
               )}
               </Droppable>

          </DragDropContext>
        
        </div>


   

  </>
    )
}

export default CurrentlyEditingPlaylistNameComponent;
