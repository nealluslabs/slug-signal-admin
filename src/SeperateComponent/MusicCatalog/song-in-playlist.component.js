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
import PauseImg from "../../assets/images/pausepic.png";
import PlayImg from "../../assets/images/playpic.png";
import Sound from "../../assets/images/audiowaves.jpeg"

// Component
import { AvatarListComponent, DialogModalComponent } from "../General";
import { parseBlob } from 'music-metadata';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { saveAllSongsFromAllPlaylistsToEdit, saveCurrentSong, saveNewlyUploadedPlaylist,saveNewPlaylistBeingCreated } from 'src/redux/reducers/group.slice';
import { deleteCurrentSong, removeSongFromCurrentPlaylistToEdit, setSelectedAudio, setSelectedAudioId, setSelectedAudioState } from "src/redux/actions/group.action";
import { notifySuccessFxn } from "src/utils/toast-fxn";
import { useSelector } from "react-redux";
import CurrentlyEditingPlaylistNameComponent from "./currentlyEditingPlaylistName.component";

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




const SongInPlaylistComponent = ({ show,file,fileFullDetails,name,uploadStatus,handleExpandIndex,indexToBeExpanded,uploadId,editingBlock,playlistId }) => {

const location = useLocation()
const dispatch = useDispatch()

const {newlyUploadedPlaylist,
       selectedAudio,
       selectedAudioId,
       selectedAudioState,
       newPlaylistBeingCreated,
       currentlyEditingPlaylistName,
       allSongsFromAllPlaylistsToEdit,
       
      } = useSelector((state)=> state.group)


const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
//const handleClose = () => setOpen(false);

const [openModal, setOpenModal] = useState(false);

const [play,setPlay] = useState(false)
/*PLAYING AUDIO FROM INDIVIDUAL COMPONENT - START */
console.log("OUR SONG IN THE PLAYLIST ISS-->",fileFullDetails)
  
useEffect(()=>{
    
    if(fileFullDetails.uploadId !== selectedAudioId ){
      setPlay(false)
      //audioRef.current.pause()
    }

    if(fileFullDetails.uploadId === selectedAudioId ){
      dispatch(setSelectedAudio(fileFullDetails && fileFullDetails.mediaUrl))
      dispatch(setSelectedAudioState(true))
    }



   },[selectedAudioId])


   
   const playAudio = () => {
    
 

    setPlay(!play)

    if(fileFullDetails.uploadId === selectedAudioId ){dispatch(setSelectedAudioState(!selectedAudioState))}
  
    if(fileFullDetails.uploadId !== selectedAudioId ){  
    dispatch(setSelectedAudioId(fileFullDetails && fileFullDetails.individualId))
   dispatch(setSelectedAudio(fileFullDetails && fileFullDetails.mediaUrl))
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

const menuOptions = [
  { title: "Remove From Playlist", link: "", extra: false },
 
 
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
        <Box my={0.7} sx={{ display: "flex", alignItems: "center",background:'inherit',borderBottom:'0.2px solid #606060'  }}>
            {
                 <DragHandle sx={{fontSize:"12px"}} />
            }

            <Box 
            
                sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    //background: "#252328", 
                    background:"inherit",
                    width:"100%",
                    height:"3.3rem",
                   
                    padding: "4px 2px",
                    paddingRight:"1.5rem"
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
                        { 
                            menuOptions.map( (item, i) => (
                                <MenuItem onClick={handleClose}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography  
                                                 onClick={ ()=>{
                                                 
                                                  dispatch(saveAllSongsFromAllPlaylistsToEdit(
                                                    allSongsFromAllPlaylistsToEdit.map((item)=>(
                                                    item.songId !== fileFullDetails.songId ?
                                                    item :
                                                    {...item,
                                                      playlistIdsArray:item.playlistIdsArray.filter((singlePlaylistId)=>(singlePlaylistId !== playlistId))
                                                    }
                                                    ))
                                                  ))


                                                  dispatch(saveNewlyUploadedPlaylist(
                                                    newlyUploadedPlaylist.map((item)=>(
                                                    item.songId !== fileFullDetails.songId ?
                                                    item :
                                                    {...item,
                                                      playlistIdsArray:item.playlistIdsArray && item.playlistIdsArray.filter((singlePlaylistId)=>(singlePlaylistId !== playlistId))
                                                    }
                                                    ))
                                                  ))


                                                  notifySuccessFxn("Song Removed from Playlist!")
                                                   
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
                    {/*<Box component="img" src={ play?fileFullDetails.coverArtUrl && fileFullDetails.coverArtUrl:fileFullDetails.coverArtUrl? fileFullDetails.coverArtUrl:Sound } onClick={()=>{setPlay(!play)}} sx={{ width: 60, height: 50, marginRight: "14px" }} />*/}
                     

                    <Box onClick={(e)=>{e.stopPropagation();playAudio()}}
                     component="div"
                     sx={{
                       width: 50,
                       height: 40,
                      
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
                        <Typography sx={{ fontSize: "12px", fontFamily: "inter", fontWeight: "900"/*,minWidth:"14rem"*/,maxWidth:"100%" }}>
                            {name && name.length<25?name:name.substring(0,25)+'...'}
                        </Typography>
                        <Typography sx={{ fontSize: "12px", fontFamily: "inter" }}>
                            {uploadStatus}
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

export default SongInPlaylistComponent;
