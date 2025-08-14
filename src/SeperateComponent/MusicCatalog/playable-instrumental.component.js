import { Box, Typography, Avatar, Grid, TextField, Divider,FormControl, RadioGroup, FormControlLabel, Radio , Menu, MenuItem, Dialog} from "@mui/material";

//Modal
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';



// Icon
import { Close, DragHandle, MoreVert,Delete } from "@mui/icons-material";

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

import { saveCurrentSong, saveNewlyUploadedPlaylist, saveSongInterimHolder,saveFileToDisplay,saveLastDraggedFileType } from 'src/redux/reducers/group.slice';
import { notifySuccessFxn } from "src/utils/toast-fxn";
import { useSelector } from "react-redux";
import { deleteCurrentSong, deleteFileFromSong, setSelectedAudio, setSelectedAudioId, setSelectedAudioState } from "src/redux/actions/group.action";

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




const PlayableInstrumentalComponent = ({ show,file,fileFullDetails,name,uploadStatus,handleExpandIndex,indexToBeExpanded,uploadId,indexToBeRemoved,removeFile={},fileToDelete }) => {

const location = useLocation()
const dispatch = useDispatch()

const {user} = useSelector((state)=> state.auth)

const {newlyUploadedPlaylist,currentSong,newlyUploadedFullSong,
      newlyUploadedFiles,currentCoverArt,fileToDisplay,
      allPlaylists,selectedAudio,selectedAudioId,lastDraggedFileType,
      selectedAudioState,} = useSelector((state)=> state.group)

     
      


const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
//const handleClose = () => setOpen(false);



const [play,setPlay] = useState(false)
/*PLAYING AUDIO FROM INDIVIDUAL COMPONENT - START */
  
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



   const playAudio = () => {
    
 
    setPlay(!play)

    if(fileFullDetails.uploadId === selectedAudioId ){dispatch(setSelectedAudioState(!selectedAudioState))}
  
    if(fileFullDetails.uploadId !== selectedAudioId ){  
    dispatch(setSelectedAudioId(fileFullDetails && fileFullDetails.individualId))
   dispatch(setSelectedAudio(fileFullDetails && fileFullDetails.instrumentalUrl?fileFullDetails.instrumentalUrl:fileFullDetails && fileFullDetails.instrumentalTemporaryUrl ))
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

const [openModal, setOpenModal] = useState(false);

const handleCloseModal = () => {
    setOpenModal(false);
};
/*FOR DIALOG OPEN MODAL COMPONENT*/

/*LIKELY TO DELETE LATER */
const [candidateObj,setCandidateObj] = useState('');

const [companyWebsite, setCompanyWebsite] = useState('');
const [companySocMedia, setCompanySocMedia] = useState('');

const [feedBackScreen,setFeedBackScreen] = useState(false)
const [feedBackForm,setFeedBackForm] = useState(false)

const [rejectionReason,setRejectionReason] = useState('')


const [hiringDecision,setHiringDecision] = useState('')
const [jobRole,setJobRole] = useState('')
/*LIKELY TO DELETE LATER --- END */

const [anchorEl, setAnchorEl] = useState(null);
const [loadingSubmit,setLoadingSubmit] = useState(false) //this setLoadingSubmit is for me(Dagogo) to pass into deleteCurrentSOng below, and to show loading, in the uploadStatus variable , while the song gets deleted

const menuOptions = [
  { title: "Add To Playlist", link: "", extra: false },
  { title: "Edit Song", link: "", extra: false },
  { title: "Delete Song", link: "", extra: false },
 
]

const menuOptionsTemp = [
  { title: "Edit File", link: "", extra: false },
  { title: "Delete File", link: "", extra: false },
]


const deleteFileHandler=(fileUploadId)=>{
  setLoadingSubmit(true)
  setTimeout(() => {
    setLoadingSubmit(false)
  }, 4000);
  dispatch(deleteFileFromSong(newlyUploadedFullSong.songId,fileUploadId,fileToDelete,newlyUploadedFullSong.otherMusicFiles && newlyUploadedFullSong.otherMusicFiles))
}


//useEffect(()=>{
//
//  //AS SOON AS A FILE IS MOVED INTO THE SONG CREATOR and it is JUST A FILE, NOT A SONG, DELETE THE CORRESPONDING FILE FROM THE FILE UPLOADER
//     if(lastDraggedFileType && lastDraggedFileType === fileToDelete){
//      setLoadingSubmit(true)
//        setTimeout(() => {
//          setLoadingSubmit(false)
//        }, 4000);
//        dispatch(deleteFileFromSong(newlyUploadedFullSong.songId,fileFullDetails && fileFullDetails.uploadId,fileToDelete,newlyUploadedFullSong.otherMusicFiles && newlyUploadedFullSong.otherMusicFiles))
//     }
//
//
//
//  },[lastDraggedFileType])



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
        <Box my={0.7} sx={{ display: "flex", alignItems: "center" }}>
            

            <Box onClick={(e)=>{}} 
              onMouseDown={()=>{ dispatch(saveSongInterimHolder(fileFullDetails));dispatch(saveFileToDisplay([...fileToDisplay,fileToDelete]));dispatch(saveLastDraggedFileType(fileToDelete))  }}
                sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    background: "#252328", 
                    width:"100%",
                    height:"2.5rem",
                   
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
                                        <Typography  sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "500" }}
                                                 onClick={ ()=>{
                                                  if(item.title === "Add To Playlist"){
                                                  dispatch(saveNewlyUploadedPlaylist([...newlyUploadedPlaylist,fileFullDetails && fileFullDetails]))
                                                         notifySuccessFxn("Song Added to Playlist!")
                                                  }
                                                  else if(item.title ==="Edit Song"){
                                                  dispatch(saveCurrentSong(fileFullDetails))
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
                                  <Typography  sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "500" }}
                                           onClick={ ()=>{
                                            
                                             if(item.title ==="Edit File"){
                                            dispatch(saveCurrentSong(fileFullDetails))
                                            }
                                            else if(item.title ==="Delete File"){
                                              
                                              removeFile(indexToBeRemoved,fileFullDetails && fileFullDetails.uploadId)
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
                   

                   <Box onClick={()=>{playAudio()}}
                     component="div"
                     sx={{
                       opacity:0,
                       width: 25,
                       height: 25,
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
                         opacity:0,
                         zIndex: 100,
                       },
                     }}
                    />  




                    <Box>
                        <Typography sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "900" }}>
                        {name && name.length<6? `INSTRUMENTAL- ${name}`:`INSTRUMENTAL- ${name.substring(0,6)+'...'}`}
                        </Typography>
                        <Typography sx={{ fontSize: 10, fontFamily: "inter" }}>
                            {loadingSubmit?"Deleting...":uploadStatus}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center",opacity:"0",userSelect:"none" }}>
                    <Typography  sx={{ fontSize: 12, color: "#2DCF5B", fontFamily: "inter", marginRight: "8px" }}>
                        Approved
                    </Typography>
                    <AvatarListComponent />
                   
                </Box>
                <Delete onClick={(e)=>{deleteFileHandler(fileFullDetails && fileFullDetails.uploadId)}} />

            </Box>
        </Box>
    )

}

export default PlayableInstrumentalComponent;
