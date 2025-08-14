import { Box, Typography, Avatar, Grid, TextField, Divider,FormControl, RadioGroup, FormControlLabel, Radio , Menu, MenuItem, Dialog} from "@mui/material";

//Modal
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';



// Icon
import { Close, DragHandle, MoreVert } from "@mui/icons-material";

// Image
import Image from "../../assets/images/audiowaves.jpeg";
import Sound from "../../assets/images/audiowaves.jpeg"
import PauseImg from "../../assets/images/pausepic.png";
import PlayImg from "../../assets/images/playpic.png";

// Component
import { AvatarListComponent, DialogModalComponent } from "../General";
import { parseBlob } from 'music-metadata';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { saveCurrentSong, saveNewlyUploadedPlaylist, saveSongInterimHolder,saveFileToDisplay,saveLastDraggedFileType, saveSongCreatorSongs, saveListOfNewSongsBeingComposed, saveSongCreatorActiveSongId, saveListOfNewSongsBeingCreated, saveSongCreatorActiveSong, saveSongEditorActive, saveSongCreatorActive } from 'src/redux/reducers/group.slice';
import { notifySuccessFxn } from "src/utils/toast-fxn";
import { useSelector } from "react-redux";
import { deleteCurrentSong,deleteFileFromSong, setSelectedAudio, setSelectedAudioId, setSelectedAudioState } from "src/redux/actions/group.action";
import uuidv4 from "src/utils/uuidv4";

const style = {
    position: 'absolute',
    top: '0%',
    left: '30%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
    color:"white"
  };

  const inputStyle = {
    background: 'white',
    marginRight: '30px',
    width: '15rem',
    borderRadius:"0.5rem",
    
  
  };

  const inputContainer = {
    display: 'flex',
    alignItems: 'center',
    width:'100%',
  
  };


  const inputContainerBig = {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    width:'100%',
   
  };




const PlayableMusicComponent = ({ show,file,fileFullDetails,name,uploadStatus,handleExpandIndex,indexToBeExpanded,uploadId,indexToBeRemoved,removeFile={},fileToDelete="none" }) => {

const location = useLocation()
const dispatch = useDispatch()

const {user} = useSelector((state)=> state.auth)

const {newlyUploadedPlaylist,currentSong,
      newlyUploadedFiles,currentCoverArt,fileToDisplay,
      allPlaylists,selectedAudio,selectedAudioId,
      selectedAudioState,songCreatorSongs,listOfNewSongsBeingComposed,listOfNewSongsBeingCreated,
    newlyUploadedFullSong} = useSelector((state)=> state.group)


const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
//const handleClose = () => setOpen(false);

const [openModal, setOpenModal] = useState(false);

const [play,setPlay] = useState(false)
/*PLAYING AUDIO FROM INDIVIDUAL COMPONENT - START */

const deleteFileHandler=(fileUploadId)=>{
  setLoadingSubmit(true)
  setTimeout(() => {
    setLoadingSubmit(false)
  }, 4000);
  dispatch(deleteFileFromSong(newlyUploadedFullSong.songId,fileUploadId,fileToDelete,newlyUploadedFullSong.otherMusicFiles && newlyUploadedFullSong.otherMusicFiles))
}



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


  
useEffect(()=>{
    
    if(fileFullDetails.uploadId !== selectedAudioId ){
      setPlay(false)
      //audioRef.current.pause()
    }

    if(fileFullDetails.uploadId === selectedAudioId ){
 //     dispatch(setSelectedAudio(fileFullDetails && fileFullDetails.mediaUrl?fileFullDetails.mediaUrl:fileFullDetails && fileFullDetails.mediaTemporaryUrl ))
 //     dispatch(setSelectedAudioState(true))
      
 
            setPlay(selectedAudioState) //this is temporary logic to continue to show the play icon when we switch from one page to another
   
    }



   },[selectedAudioId])



   const playAudio = (e) => {
    
    e.stopPropagation()
 
    setPlay(!play)

    if(fileFullDetails.uploadId === selectedAudioId ){dispatch(setSelectedAudioState(!selectedAudioState))}
  
    if(fileFullDetails.uploadId !== selectedAudioId ){  
    dispatch(setSelectedAudioId(fileFullDetails && fileFullDetails.individualId))
   dispatch(setSelectedAudio(fileFullDetails && fileFullDetails.mediaUrl?fileFullDetails.mediaUrl:fileFullDetails && fileFullDetails.mediaTemporaryUrl ))
   dispatch(setSelectedAudioState(true))
    }

    
 
};

/*PLAYING AUDIO FROM INDIVIDUAL COMPONENT - END*/

/*FOR DIALOG OPEN MODAL COMPONENT */
const handleClickOpenModal = () => {
    setOpenModal(true);

    const targetObject = (({ file, ...rest }) => rest)(fileFullDetails);
    console.log("TARGET OBJECT LOOK HERE --->",targetObject)
    dispatch(saveCurrentSong(file/*targetObject*/))
};

const handleCloseModal = () => {
    setOpenModal(false);
};
/*FOR DIALOG OPEN MODAL COMPONENT*/



const [anchorEl, setAnchorEl] = useState(null);
const [loadingSubmit,setLoadingSubmit] = useState(false) //this setLoadingSubmit is for me(Dagogo) to pass into deleteCurrentSOng below, and to show loading, in the uploadStatus variable , while the song gets deleted

const menuOptions = [
  /*{ title: "Add To Playlist", link: "", extra: false },*/
  { title: "Edit Song", link: "", extra: false },
  { title: "Delete Song", link: "", extra: false },
 
]

const menuOptionsTemp = [
  { title: "Edit File", link: "", extra: false },
  { title: "Delete File", link: "", extra: false },
]


    const handleClick = (event) => {
      event.stopPropagation()
        setAnchorEl(event.currentTarget);
        
        setOpen(true);
        //dispatch(fetchSongsForOnePlaylist(fileFullDetails && fileFullDetails.playlistId))
    };

    const handleClose = (e) => {
      e.stopPropagation()
        setAnchorEl(null);
        setOpen(false);

    };



    return (
        <Box my={0.7} sx={{ display: "flex", alignItems: "center",backgroundColor:"inherit",borderBottom:"0.5px solid #606060" , borderTop:indexToBeExpanded===0?"0.1px solid #606060":"0px" }}>
            

            <Box onClick={(e)=>{ 
             if(true){

    
              const duplicate = [...listOfNewSongsBeingCreated]
              const songAlreadyBeingEdited = duplicate.filter((item)=>(item.song.songId === fileFullDetails.songId))
 
              if (songAlreadyBeingEdited.length === 0) {
                if(listOfNewSongsBeingCreated.length === 0 ){
                    dispatch(saveSongEditorActive(true))
                    dispatch(saveSongCreatorActive(true))
                  duplicate[0] = {identifyingId:uuidv4(),name:fileFullDetails.name,song:fileFullDetails};
                }else{
                  //.length of an array is always the final array element +1, so it is safe to use.length to indicate the next item of the array
                duplicate[listOfNewSongsBeingCreated.length] = {identifyingId:uuidv4(),name:fileFullDetails.name,song:fileFullDetails};
                }   
    
            console.log("OG DUPLICATE IS NOW---->",duplicate)

                dispatch(saveSongCreatorActiveSongId( duplicate[listOfNewSongsBeingCreated.length].identifyingId))
                dispatch(saveSongCreatorActiveSong( duplicate[listOfNewSongsBeingCreated.length]))
                  dispatch(saveListOfNewSongsBeingCreated(

                  duplicate
                  ))

              }


             }

                else{
                  //IMPLEMENTATION OF ADDING A SONG TO AN EMPTY
                    const duplicate = [...listOfNewSongsBeingCreated]

                    // Check for the first empty object and replace it
                  const emptyIndex = duplicate.findIndex(
                    (item) => Object.keys(item.song).length === 0
                  );

                 const songAlreadyBeingEdited = duplicate.filter((item)=>(item.song.songId === fileFullDetails.songId))
                  
                  if (emptyIndex !== -1 && songAlreadyBeingEdited.length === 0) {
                    duplicate[emptyIndex] = {...duplicate[emptyIndex],name:fileFullDetails.name,song:fileFullDetails};
                          
        
                console.log("DUPLICATE IS NOW---->",duplicate)

                    dispatch(saveSongCreatorActiveSongId( duplicate[emptyIndex].identifyingId))
                    dispatch(saveSongCreatorActiveSong( duplicate[emptyIndex]))
                      dispatch(saveListOfNewSongsBeingCreated(

                      duplicate
                      ))

                  }
              }
            }} 
              onMouseDown={()=>{ 
               
                dispatch(saveSongInterimHolder(fileFullDetails));dispatch(saveFileToDisplay([...fileToDisplay,fileToDelete]))  }}
                sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                   // background: "#252328", 
                     background: "inherit", 
                    width:"100%",
                    height:"3.3rem",
                   
                    padding: "4px 2px"
                }}
            >



    <DialogModalComponent open={ openModal } handleClose={ handleCloseModal }  />




{   <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <Box sx={style}>
            

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
                        { show === true ?
                            menuOptions.map( (item, i) => (
                                <MenuItem onClick={handleClose}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography  sx={{ fontSize: "12px", fontFamily: "inter", fontWeight: "500" }}
                                                 onClick={ ()=>{
                                                  if(item.title === "Add To Playlist"){
                                                  dispatch(saveNewlyUploadedPlaylist([...newlyUploadedPlaylist,fileFullDetails && fileFullDetails]))
                                                         notifySuccessFxn("Song Added to Playlist!")
                                                  }
                                                  else if(item.title ==="Edit Song"){
                                                    dispatch(saveSongCreatorSongs([...songCreatorSongs,fileFullDetails]))
                                                  }
                                                  else if(item.title ==="Delete Song"){
                                                    console.log("DELETE LOGIC GOES HERE")
                                                    if(show === true){
                                                    dispatch(deleteCurrentSong(setLoadingSubmit,fileFullDetails,newlyUploadedFiles,newlyUploadedPlaylist,currentCoverArt,fileFullDetails,newlyUploadedFiles,handleClose,user.id))
                                                    }
                                                    else{

                                                    }
                                                  }
                                                  

                                                  
                                                  
                                                    }} >
                                          { item.title }
                                                           
                                      </Typography>
                                      
                                    </Box>
                                </MenuItem>
                            ) )
                        
                        :

                        menuOptionsTemp.map( (item, i) => (
                          <MenuItem onClick={handleClose}>
                              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                  <Typography  sx={{ fontSize: "12px", fontFamily: "inter", fontWeight: "500" }}
                                           onClick={ ()=>{
                                            
                                             if(item.title ==="Edit File"){
                                            dispatch(saveCurrentSong(fileFullDetails))
                                            }
                                            else if(item.title ==="Delete File"){
                                              deleteFileHandler(fileFullDetails && fileFullDetails.uploadId)
                                              //removeFile(indexToBeRemoved,fileFullDetails && fileFullDetails.uploadId)
                                            }
                                            

                                            
                                            
                                              }} >
                                    { item.title }
                                                     
                                </Typography>
                                
                              </Box>
                          </MenuItem>
                      ) )


                        
                          }
                    </Box>
                </Menu>    
          
            

                 </Box>
                  </Dialog>
               }



                
                <Box sx={{ display: "flex", alignItems: "center" }}>
                   {/* <Box component="img" src={ play?fileFullDetails.coverArtUrl && fileFullDetails.coverArtUrl:fileFullDetails.coverArtUrl? fileFullDetails.coverArtUrl:Sound } onClick={()=>{setPlay(!play)}} sx={{ width: 60, height: 50, marginRight: "14px" }} /> */}
                   

                   <Box onClick={(e)=>{playAudio(e)}}
                     component="div"
                     sx={{
                       width: 50,
                       height: 40,
                       borderRadius:"0.5rem",
                       marginRight: "14px",
                       position: "relative",
                       backgroundImage: `url(${PlayImg})`,
                       backgroundSize: "cover",
                       backgroundPosition: "center",
                       
                      
                       "&::after": {
                         content: '""',
                         position: "absolute",
                         top: 0,
                         left: 0,
                         right: 0,
                         bottom: 0,
                         backgroundImage: `url(${fileFullDetails.coverArtUrl ?fileFullDetails.coverArtUrl:fileFullDetails.coverArtUrl? fileFullDetails.coverArtUrl:Sound})`,
                         backgroundSize: "cover",
                         backgroundRepeat: "no-repeat",
                         backgroundPosition: "center",
                         opacity:play && fileFullDetails.uploadId === selectedAudioId? 0.5:1, // Adjust transparency of the background image
                         zIndex: 100,
                       },
                     }}
                    />  




                    <Box>
                        <Typography sx={{ fontSize: "11px", fontFamily: "inter", fontWeight: "500" }}>
                        {name && name.length<maxChars?name:name.substring(0,maxChars)+'...'}
                        </Typography>
                        <Typography sx={{ fontSize: "11px", fontFamily: "inter" }}>
                            {loadingSubmit?"Deleting...":uploadStatus}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center",opacity:"1",userSelect:"none" }}>
                    <Typography  sx={{ fontSize: "12px", color: "#2DCF5B", fontFamily: "inter", marginRight: "8px" }}>
                        Approved
                    </Typography>
                    {/*<AvatarListComponent />*/}

                    {<MoreVert onClick={(e)=>{handleClick(e);handleExpandIndex(indexToBeExpanded)}} />}

                </Box>

               
            </Box>
        </Box>
    )

}

export default PlayableMusicComponent;
