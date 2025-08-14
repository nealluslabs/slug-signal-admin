import { Box, Typography, Avatar, Grid, TextField, Divider,FormControl, RadioGroup, FormControlLabel, Radio , Menu, MenuItem, Dialog} from "@mui/material";

//Modal
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';



// Icon
import { Close, DragHandle, MoreVert,Delete } from "@mui/icons-material";
import { FaPencil } from "react-icons/fa6";
import { BsSoundwave } from "react-icons/bs";
import { AiOutlinePicture } from "react-icons/ai";
import { IoDocumentOutline } from "react-icons/io5";
import { IoPlayOutline } from "react-icons/io5";

// Image
import Image from "../../assets/images/audiowaves.jpeg";
import Sound from "../../assets/images/audiowaves.jpeg"
import PauseImg from "../../assets/images/pausepic.png";
import PlayImg from "../../assets/images/playpic.png";
import PicImg from "../../assets/images/picpic.png";
import DocImg from "../../assets/images/docpic.png";

// Component
import { AvatarListComponent, DialogModalComponent } from "../General";
import { parseBlob } from 'music-metadata';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { saveCurrentSong,saveCurrentFileToEdit, saveNewlyUploadedPlaylist, saveSongInterimHolder,saveFileToDisplay,saveOtherMusicFileIdsToDisplay,saveLastDraggedFileType } from 'src/redux/reducers/group.slice';
import { notifySuccessFxn } from "src/utils/toast-fxn";
import { useSelector } from "react-redux";
import { deleteCurrentSong,deleteFileFromSong, deleteMediaFile, setSelectedAudio, setSelectedAudioId, setSelectedAudioState,updateFileName } from "src/redux/actions/group.action";
import DialogModalFileCreatorComponent from "../General/Modal/DialogModalFileCreator.component";

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




const FileViewerComponent = ({ show,file,fileFullDetails,name,uploadStatus,handleExpandIndex,indexToBeExpanded,uploadId,indexToBeRemoved,removeFile={},fileToDelete=null }) => {

const location = useLocation()
const dispatch = useDispatch()

const {user} = useSelector((state)=> state.auth)


const {newlyUploadedPlaylist,currentSong,
      newlyUploadedFiles,currentCoverArt,fileToDisplay,
      allPlaylists,selectedAudio,selectedAudioId,lastDraggedFileType,
      selectedAudioState,otherMusicFileIdsToDisplay,
    newlyUploadedFullSong} = useSelector((state)=> state.group)

const correctFileToDisplay =  !fileToDisplay.length?"mediaTemporaryUrl":fileToDisplay.includes("mediaTemporaryUrl")?"otherMusicFiles":"otherMusicFiles"

console.log("INSIDE FILE CREATOR COMPONENT,FILE.NAME--->",fileFullDetails.name)

const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
//const handleClose = () => setOpen(false);

const [openModal, setOpenModal] = useState(false);

const [play,setPlay] = useState(false)
const [maxChars, setMaxChars] = useState(24);
const [fileName,setFileName] = useState(name)
/*PLAYING AUDIO FROM INDIVIDUAL COMPONENT - START */



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

  console.log("FILE FULL DETAILS UPLOAD ID",fileFullDetails.uploadId,"SELECTED AUDIO ID",selectedAudioId)
   
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
    
 
    

    if(fileFullDetails.uploadId === selectedAudioId ){dispatch(setSelectedAudioState(!selectedAudioState))}
  
    if(fileFullDetails.uploadId !== selectedAudioId ){  
    dispatch(setSelectedAudioId(fileFullDetails && fileFullDetails.uploadId))
   dispatch(setSelectedAudio(fileFullDetails && fileFullDetails.mediaUrl?fileFullDetails.mediaUrl:fileFullDetails && fileFullDetails.mediaTemporaryUrl ))
   dispatch(setSelectedAudioState(true))
    }

    setPlay(!play) 
 
};

/*PLAYING AUDIO FROM INDIVIDUAL COMPONENT - END*/

const allowedImageTypes = [
  "image/png",  // png
  "image/jpeg", // jpeg
  "image/jpg",  // jpg
  "image/webp", // webp
  "image/gif",  // gif
  "image/bmp",  // bmp
  "image/tiff", // tiff
  "image/svg+xml", // svg
  "image/svg", // Another common SVG MIME type
];

const allowedDocumentTypes = [
  "application/svg+xml", // Alternative SVG MIME type
  "application/pdf",  // PDF
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
  "application/msword",  // DOC (older format)
  "application/vnd.ms-excel",  // XLS (older Excel format, sometimes used for CSV)
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX (newer Excel format)
  "application/vnd.ms-excel.sheet.macroEnabled.12", // XLSM (Excel with macros)
  "application/vnd.ms-excel.template.macroEnabled.12", // XLTM (Excel macro-enabled template)
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template", // XLTX (Excel template)
  "application/vnd.oasis.opendocument.spreadsheet", // ODS (OpenDocument Spreadsheet)
  "text/csv", // Standard CSV format
  "application/csv" // Alternative CSV MIME type
];

const allowedAudioTypes = [
  "audio/mpeg", // mp3
  "audio/mp4",  // mp4
  "audio/ogg",  // ogg
  "audio/ape",  // ape
  "audio/amr",  // amr
  "audio/wav",  // wav
  "audio/x-flac", // flac
  "audio/aac",  // aac
  "audio/aif",  // aif
  "audio/aiff",  // aiff
  "audio/x-aiff", // x-aiff
  "video/mp4",  // mp4
  "video/ogg",  // ogg
  "video/webm", // webm
]


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


    const handleClick = (event) => {
      event.stopPropagation()
        setAnchorEl(event.currentTarget);
        
        setOpen(true);
        //dispatch(fetchSongsForOnePlaylist(fileFullDetails && fileFullDetails.playlistId))
    };


    const deleteFileHandler=(fileUploadId)=>{
      setLoadingSubmit(true)
      setTimeout(() => {
        setLoadingSubmit(false)
      }, 4000);
     // dispatch(deleteFileFromSong(newlyUploadedFullSong.songId,fileUploadId,fileToDelete,newlyUploadedFullSong.otherMusicFiles && newlyUploadedFullSong.otherMusicFiles))
      dispatch(deleteMediaFile(fileFullDetails,setLoadingSubmit,user && user.id))

      
    }


    const handleClose = (e) => {
      e.stopPropagation()
        setAnchorEl(null);
        setOpen(false);

    };

  //  useEffect(()=>{
//
  //  //AS SOON AS A FILE IS MOVED INTO THE SONG CREATOR and it is JUST A FILE, NOT A SONG, DELETE THE CORRESPONDING FILE FROM THE FILE UPLOADER
  //  if(lastDraggedFileType && lastDraggedFileType === fileToDelete){
  //      setLoadingSubmit(true)
  //      setTimeout(() => {
  //        setLoadingSubmit(false)
  //      }, 4000);
  //      dispatch(deleteFileFromSong(newlyUploadedFullSong.songId,fileFullDetails && fileFullDetails.uploadId,fileToDelete,newlyUploadedFullSong.otherMusicFiles && newlyUploadedFullSong.otherMusicFiles))
  //     }
//
//
//
  //  },[lastDraggedFileType])



    return (
        <Box my={0.7} sx={{ display: "flex", alignItems: "center" }}>
            

            <Box onClick={(e)=>{}} 
              onMouseDown={()=>{ console.log("OTHER MUSIC FILE IDS TO DISPLAY-->",otherMusicFileIdsToDisplay);dispatch(saveSongInterimHolder(fileFullDetails));dispatch(saveFileToDisplay([...fileToDisplay,correctFileToDisplay]));dispatch(saveOtherMusicFileIdsToDisplay([...otherMusicFileIdsToDisplay,fileFullDetails.individualId]));dispatch(saveLastDraggedFileType(fileToDelete)) }}
                sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    //background: "#252328",
                    background:"#322F37",
                    width:"100%",
                    height:"2.5rem",
                   
                    padding: "4px 2px"
                }}
            >



{/*<DialogModalFileCreatorComponent open={ openModal } handleClose={ handleCloseModal }  />*/}




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
                   

                   <Box onClick={()=>{allowedAudioTypes.includes(fileFullDetails.type)  && playAudio()}}
                     component="div"
                     sx={{
                      opacity:1,
                       width: 25,
                       height: 25,
                       marginRight: "14px",
                       position: "relative",
                       //backgroundImage:allowedAudioTypes.includes(fileFullDetails.type)?  `url(${PlayImg})`: allowedImageTypes.includes(fileFullDetails.type)?`url(${PicImg})`:`url(${DocImg})`  ,
                       backgroundColor:play?"#A01565":"#C4C4C4",
                       backgroundSize: "cover",
                       backgroundPosition: "center",
                       display:"flex",
                       justifyContent:"center",
                       alignItems:"center",
                       borderRadius:"10%",
                       
                      
                       "&::after": {
                         content: '""',
                         position: "absolute",
                         top: 0,
                         left: 0,
                         right: 0,
                         bottom: 0,
                        // backgroundImage: `url(${fileFullDetails.coverArtUrl ?fileFullDetails.coverArtUrl:fileFullDetails.coverArtUrl? fileFullDetails.coverArtUrl:Sound})`,
                         backgroundSize: "cover",
                         backgroundRepeat: "no-repeat",
                         backgroundPosition: "center",
                         opacity:play && fileFullDetails.uploadId === selectedAudioId? 0.5:1, // Adjust transparency of the background image
                         opacity:0,
                         zIndex: 100,
                       },
                     }}
                    >
                   {allowedAudioTypes.includes(fileFullDetails.type)?  (play?<IoPlayOutline />:<BsSoundwave/>): allowedImageTypes.includes(fileFullDetails.type)? <AiOutlinePicture/>: <IoDocumentOutline/>  }
                    </Box>  
   



                    <Box sx={{position:"relative"}}>
                       {/* <Typography sx={{ fontSize: 14, fontFamily: "inter", fontWeight: "900" }}>
                        {name && name.length<maxChars?name:name && name.substring(0,maxChars)+'...'}
                        </Typography> */}

                      {/*EDITABLE NAME */}

                              <TextField
                          variant="standard"
                          placeholder="Type here..."
                          value={fileName? fileName: ""}
                          
                          onChange={(e)=>{
                            setFileName(e.target.value)
                            dispatch(updateFileName(e.target.value,fileFullDetails.songId,user.id))
                          
                          }}
                          InputProps={{
                            disableUnderline: true, // Removes the underline
                            style: {
                              color: 'white', // Text color
                              background: 'transparent', // Transparent background
                              padding: 0, // No vertical padding
                              fontFamily: "inter",
                            },
                          }}
                          sx={{
                            '& .MuiInputBase-root': {
                              fontSize: '14px', // Adjust text size
                              fontFamily: "inter",
                               fontWeight: "900",
                               width:"18rem",
                               backgroundColor:"white",
                               position:"absolute"
                            },
                          }}
                        />

                      {/*EDIABLE NAME END */}

                        <Typography sx={{ fontSize: 10, fontFamily: "inter" }}>
                            {loadingSubmit?"Deleting...":uploadStatus}
                        </Typography>
                    </Box>



                    
                </Box>

                <Box sx={{ display: "flex", alignItems: "center"/*,opacity:"0",userSelect:"none"*/,gap:"0.7rem" }}>
                   {/* <Typography  sx={{ fontSize: 12, color: "#2DCF5B", fontFamily: "inter", marginRight: "8px" }}>
                        Approved
                    </Typography>
                    <AvatarListComponent />*/}

                    <FaPencil onClick={(e)=>{ dispatch(saveCurrentFileToEdit(fileFullDetails && fileFullDetails));setTimeout(()=>{setOpenModal(true)},1000 )  }} />
                <Delete onClick={(e)=>{deleteFileHandler(fileFullDetails && fileFullDetails.uploadId)}} />
                   
                </Box>

              

            </Box>
        </Box>
    )

}

export default FileViewerComponent;
