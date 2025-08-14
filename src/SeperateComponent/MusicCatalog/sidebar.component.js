import { Box, Typography } from "@mui/material";

// Component 
import UptempoComponent from "./uptemp.component";
import CreatorSubComponent from "./creator-sub.component";
import { TitleAddComponent } from "../General";
import PlayableMusicComponent from "./playable-music.component";
import NewMusicComponent from "./new-music.component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveSongsAndPlaylist } from "src/redux/actions/group.action";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import SongInPlaylistComponent from "./song-in-playlist.component";
import CurrentlyEditingPlaylistNameComponent from "./currentlyEditingPlaylistName.component";
import { Element } from "react-scroll";

const MusicCatalogSidebar = () => {

    const dispatch = useDispatch()

    const { newlyUploadedFiles,
            newPlaylistBeingCreated,
            newlyUploadedPlaylist,
            allSongsFromCurrentPlaylistToEdit,
            allSongsFromAllPlaylistsToEdit,
            currentlyEditingPlaylistName ,
            playlistsFromPlaylistCreator,
            playlistCreatorActivePlaylist,
            playlistCreatorPlaylists,
          } = useSelector((state) => state.group);

          console.log("PLAYLIST CREATOR ACTIVE PLAYLIST-->",playlistCreatorActivePlaylist)

          const [allSongsScrambled, setAllSongsScrambled] = useState(allSongsFromAllPlaylistsToEdit); // State to store selected files


    const [files, setFiles] = useState(newlyUploadedPlaylist); // State to store selected files
    
    const [filesToUpdate, setFilesToUpdate] = useState(allSongsFromCurrentPlaylistToEdit); // State to store selected files for a playlist we created before

    const removeFile = (indexToRemove) => {
        setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
      };


      const handleExpandIndex = (indexToRemove) => {
        //logic for hiding other indexes when this one is clicked!
        //will do so shortly
      };
    

      useEffect(()=>{

        setFiles(newlyUploadedPlaylist)
        console.log("ALL SONGS SCRAMBLED IS -->",allSongsScrambled)

      },[newlyUploadedPlaylist,allSongsFromAllPlaylistsToEdit])


      useEffect(()=>{

        setAllSongsScrambled(allSongsFromAllPlaylistsToEdit)
        setFilesToUpdate(allSongsFromCurrentPlaylistToEdit)
        console.log("ALL ROLES FROM CURRENT PLAYLIST TO UPDATE ARE NOW -->",allSongsFromCurrentPlaylistToEdit)

      },[allSongsFromCurrentPlaylistToEdit])

 
    return (
      


        <Box /*flex={1.8}*/ p={2} sx={{/*width:"100%",minWidth:"27rem",*//*width:"25.3rem",*/height:"28rem", background:"#302c34",borderRadius:"1rem",position:"relative",top:"1rem", display: { xs: "none", sm: "block",/* marginTop: 119*/ } }}>
        
        <Element  name="scrollContainer" style={{ overflowY: 'auto', maxHeight:"370px", scrollbarWidth: 'none', 
                msOverflowStyle: 'auto'}}>

          <Box mt={1.05}>
                <TitleAddComponent title="Playlist Creator" />
          </Box>  

    
          <Element name="scrollContainer" style={{marginTop:"-0.9rem", overflowY: 'auto', maxHeight: '70vh',zIndex:"-1", scrollbarWidth: 'none', /* For Firefox */
    msOverflowStyle: 'none' /* For IE/Edge */ }}>

          {/*!currentlyEditingPlaylistName &&*/
          
          
          <>
            <Box mt={2}>
                {/*<TitleAddComponent title="Playlist Creator" />*/}

      {newPlaylistBeingCreated && newPlaylistBeingCreated.length>0 && newPlaylistBeingCreated.map((pbc,index)=>( 
            
         
           <Droppable droppableId={pbc && pbc.playlistId}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                         
                        >
                <Box >
                    <UptempoComponent edit={ true } playlistBeingMappedName={pbc.playlistName} playlist={pbc} />
                   

                    <div style={{ marginTop: "5px",marginBottom:"5px"}}>

                        
                    
                         <ul>
                           {pbc && pbc.playlistId === playlistCreatorActivePlaylist &&
                           files && files.length > 0 && files.filter((file)=>(file && file.metadata)).filter((file)=>(file && file.playlistIdsArray && file.playlistIdsArray.includes(pbc && pbc.playlistId))).map((file, index) => (
                            <Draggable key={file.name} draggableId={file.name} index={index}>
                            {(provided,snapshot) => {
                            
                            if (snapshot.isDragging) {
                              const offset = { x: 70, y: 150 }          // your fixed container left/top position
                              const x = provided.draggableProps.style.left - offset.x;
                              const y = provided.draggableProps.style.top - offset.y;
                              provided.draggableProps.style.left = x;
                              provided.draggableProps.style.top = y;
                           }
                            
                            return (
                              <div
                              style={{cursor:"pointer"}}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                           {file && file.metadata &&


                           <SongInPlaylistComponent show={true} file={file &&  file.file} fileFullDetails={file && file} name={file &&  file.name} uploadStatus={"Audiovybez"/*file && file.type*/} handleExpandIndex={handleExpandIndex} indexToBeExpanded={index} playlistId={pbc && pbc.playlistId}/>
                           }
                            
                           </div>
                          )}
                          }
                        </Draggable>
                           
                           ))}
                         </ul>
                       
                   </div>

                 

                          
                </Box>

                    </div>
                  )}
                </Droppable>
             ))
          }
            </Box>


        </>
        

      }
        { /*currentlyEditingPlaylistName  && */

          <Box mt={0}>
          
       {/*<TitleAddComponent title="Playlist Creator" /> THIS IS JUST A PLAYLIST NAME AND ADD BUTTON, YOU DONT NEED IT FOR NOW*/}
       {playlistCreatorPlaylists && playlistCreatorPlaylists.map((playlist)=>(  


       
       
          <Box mt={0}>
          
              
                {/*<UptempoComponent edit={ true } playlistBeingMappedName={playlist.playlistName && playlist.playlistName} />*/}

            <Droppable droppableId="EditingCurrentList">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                         
                        >
                <Box>
                  
                    <CurrentlyEditingPlaylistNameComponent edit={ true } playlistBeingMappedName={playlist.playlistName && playlist.playlistName} playlist={playlist}  />
                    {/*<CreatorSubComponent />
                    <CreatorSubComponent />
                    <CreatorSubComponent />*/}

                   {/* <div style={{ marginTop: "0px",marginBottom:"5px"}}>

                        
                 
                         <ul>
                           {playlist.playlistId === playlistCreatorActivePlaylist &&
                           allSongsFromAllPlaylistsToEdit && allSongsFromAllPlaylistsToEdit.length > 0 && allSongsFromAllPlaylistsToEdit.filter((file)=>(file && file.metadata)).filter((song)=>(song.playlistIdsArray && song.playlistIdsArray.includes(playlist.playlistId))).map((file, index) => (
                          
                          
                           <SongInPlaylistComponent show={true} file={file &&  file.file} fileFullDetails={file && file} name={file &&  file.name} uploadStatus={file && file.type} handleExpandIndex={handleExpandIndex} indexToBeExpanded={index} editingBlock={true} playlistId={playlist.playlistId}/>
                         
                           ))}
                         </ul>
                       
                   </div>*/}


                   
                </Box>

                    </div>
                  )}
                </Droppable>
               
            </Box>
          
        ))}
          
         
          </Box>



        }

     </Element>


     </Element>
        </Box>
    )
}

export default MusicCatalogSidebar;
