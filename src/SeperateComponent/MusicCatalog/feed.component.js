import { Box, Menu, MenuItem, Typography } from "@mui/material";
import {useState,useEffect} from 'react';
// Component
import { DialogModalComponent, TitleAddComponent } from "../General";
import SongCreatorHeadComponent from "./song-creator-head.component";
import SongCreatorSongWithChildComponent from "./song-creator-song-with-child.component";
import ListingComponent from "./listing.component";
import { useSelector } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { saveCurrentCoverArt, saveCurrentSong, saveFileToDisplay, saveOtherMusicFileIdsToDisplay, saveSongCreatorActive } from 'src/redux/reducers/group.slice';
import { useDispatch } from "react-redux";
import { notifyErrorFxn, notifySuccessFxn } from "src/utils/toast-fxn";
import CreateNewSongComponent from "./createNewSong.component";
import SongInPlaylistComponent from "./song-in-playlist.component";
import UptempoComponent from "./uptemp.component";
import SongHeaderComponent from "./song-header.component";
import PlaylistHeaderComponent from "./playlist-header.component";
import { Element } from "react-scroll";

const MusicCatalogFeedComponent = () => {
     const dispatch = useDispatch()
     const {currentSong,songCreatorSongs,
          songCreatorActive,fileToDisplay,
          songEditorActive,fileUploaderActive,
          otherMusicFileIdsToDisplay,
        listOfNewSongsBeingCreated,
        listOfNewSongsBeingComposed,
      songCreatorActiveHeaderId} = useSelector((state)=> state.group)

     console.log('INSIDE LIST OF NEW SONGS BEING COMPOSED WE HAVE--->',listOfNewSongsBeingComposed)

     console.log('INSIDE LIST OF NEW SONGS BEING CREATED WE HAVE--->',listOfNewSongsBeingCreated)
     //NOTE THAT CURRENT SONG DOES NOT HAVE THE FILE DATA, LIKE THE ACTUAL SONG, ONLY INFO ABOUT IT
     
     // FROM THE RIGHT HAND MENU, INTO THIS COLUMN
     //, THAT INVOLVES , ADDING A MORE VERT ICON BESIDE EACH CLOSE ICON OF EACH SONG,
     // OR JUST ACTIVATING IT ON CLICK OF THE BAR

  
     console.log("CURRENT SONG OTHER MUSIC FILES",currentSong.otherMusicFiles)
     console.log("FILE TO DISPLAY",fileToDisplay)

     const menuOptions = [
      { title: "Main", link: "", extra: false },
      { title: "Instrumental", link: "", extra: false },
      { title: "Acapella", link: "", extra: false },
      { title: "Other", link: "", extra: false },
      
      ]

      const [maxChars, setMaxChars] = useState(24);


useEffect(() => {
  // Function to update maxChars based on window width
  const updateMaxChars = () => {
    const width = window.innerWidth;
    if (width < 400) {
      setMaxChars(10); // Very small screens
    } else if (width < 600) {
      setMaxChars(13); // Small screens
    } else if (width < 1300) {
      setMaxChars(16); // Medium screens
    } else {
      setMaxChars(24); // Default
    }
  };

  updateMaxChars(); // Initial check
  window.addEventListener("resize", updateMaxChars); // Listen for resizes

  return () => {
    window.removeEventListener("resize", updateMaxChars); // Cleanup
  };
}, []);

      
      //const [open,setOpen] = useState(false)
      const [anchorEl, setAnchorEl] = useState(null);
      const [anchorEl2, setAnchorEl2] = useState(null);
      const [anchorEl3, setAnchorEl3] = useState(null);
      const [anchorEl4, setAnchorEl4] = useState(null);

      const open = Boolean(anchorEl);
      const [open2,setOpen2] = useState(false)
      const [open3,setOpen3] = useState(false)
      const [open4,setOpen4] = useState(false)

     
      
      const handleClick = (event) => {
      
      setAnchorEl(event.currentTarget);
      //setOpen(true)
      };

      const handleClick2 = (event) => {
      
        setAnchorEl2(event.currentTarget);
        //setOpen2(true)
        };


        const handleClick3 = (event) => {
      
          setAnchorEl3(event.currentTarget);
          //setOpen3(true)
          };


          const handleClick4 = (event) => {
      
            setAnchorEl4(event.currentTarget);
            //setOpen4(true)
            };


      const handleClose = () => {
      setAnchorEl(null);
     
      };

      const handleClose2 = () => {
      
        setAnchorEl2(null);
       };


       const handleClose3 = () => {
      
        setAnchorEl3(null);
       };

      const handleClose4 = () => {
      
         setAnchorEl4(null);
        };
      
      const [openModal, setOpenModal] = useState(false);
     
      

      


    return (
        <Box /*flex={1.9}*/ p={{ xs: 0, md: 2, height: "28rem"}} sx={{/*maxWidth:"28rem",*/ background:"#302c34",borderRadius:"1rem",position:"relative",top:"1rem"/*,width:"29.35rem"*/}}>
                 <Element  name="scrollContainer" style={{ overflowY: 'auto', maxHeight:"370px", scrollbarWidth: 'none', 
                msOverflowStyle: 'auto'}}>
            <Box mt={1.25} >
                <TitleAddComponent title={songEditorActive?"Song Creator":fileUploaderActive && "File Creator"} />
      
       {songCreatorActive && 
       <div style={{marginTop:"0rem",height:"100%"}} >
       {fileUploaderActive? 
       
        
          
        listOfNewSongsBeingComposed && listOfNewSongsBeingComposed.length>0 && listOfNewSongsBeingComposed.map((nsc,index)=>( 
         
          <CreateNewSongComponent idForFileUploadAreaPerSong={nsc.identifyingId}  nsc={nsc}/>
          
        ))
       
        
        :
        
     
        songEditorActive &&

        listOfNewSongsBeingCreated && listOfNewSongsBeingCreated.length>0 && listOfNewSongsBeingCreated.map((nsc,index)=>( 
            
         
          <Droppable droppableId={`songHeader-${nsc.identifyingId}`}>
                     {(provided) => (
                       <div
                         {...provided.droppableProps}
                         ref={provided.innerRef}
                        
                       >
               <Box >
                   {nsc.name === "Untitled Song" &&
                   <PlaylistHeaderComponent edit={ true } playlistBeingMappedName={nsc.name} playlist={nsc} />
                   }
                   <div style={{ marginTop: "0px",marginBottom:"5px"}}>

                          {/*nsc.identifyingId === songCreatorActiveHeaderId &&*/
                         
                           <Draggable key={nsc.song.name} draggableId={`songCreator-${nsc.song.name}`} index={index}> 
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
                             style={{cursor:"pointer"}}
                               ref={provided.innerRef}
                               {...provided.draggableProps}
                               {...provided.dragHandleProps}
                             >
                          {nsc.song && nsc.song.metadata &&


                          <SongCreatorSongWithChildComponent currentSong={ nsc.song &&  nsc.song} identifyingId={ nsc.identifyingId &&  nsc.identifyingId}/>
                          }
                           
                          </div>
                         )}}
                       </Draggable>
                      } 
                  
                  </div>

                

                         
               </Box>

                   </div>
                 )}
               </Droppable>
            ))
         
      
       


       }
        </div>
        }
            </Box>

         </Element>

        </Box>
    )
}

export default MusicCatalogFeedComponent;

{/*I added songCreator prefix here so that we dont have two songs being dragged from playlist and song creator */}

   {/* OLD SONG EDITOR !
         <Droppable droppableId="EditingCurrentSongTwo" >
             {(provided) => (
               <div
                 
                 {...provided.droppableProps}
                 ref={provided.innerRef}
                
               >

                <SongCreatorHeadComponent type="img" pos={"top"} />
                
             {
                  songEditorActive &&
                    songCreatorSongs && songCreatorSongs.length >0  &&
                    songCreatorSongs.map((song,index)=>(
                      
                      <SongCreatorSongWithChildComponent currentSong={song}/>
                     
                      
                    ))
             }
 
                
                <SongCreatorHeadComponent type="sound" pos={"bottom"} />

         </div>
         )}
        </Droppable>

        */}